import { useRef, useEffect, useState } from "react";
import rough from "roughjs/bundled/rough.esm.js";
import io from "socket.io-client"

const socket = io('http://localhost:3000');

const Canvas = ({ selectedTool, color, mainCanvasRef  }) => {
    const previewCanvasRef = useRef(null); 
    const [isDrawing, setIsDrawing] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });

    const strokeSize = 7;
  
    useEffect(() => {
      const setupCanvas = (canvas) => {
        const context = canvas.getContext("2d");
        const scale = window.devicePixelRatio || 1;
        canvas.width = canvas.offsetWidth * scale;
        canvas.height = canvas.offsetHeight * scale;
        context.scale(scale, scale);
      };
  
      setupCanvas(mainCanvasRef.current);
      setupCanvas(previewCanvasRef.current);

    socket.on("draw", (data) => {
      const roughCanvas = rough.canvas(mainCanvasRef.current);
      const context = mainCanvasRef.current.getContext("2d");

      switch (data.type) {
        case "line":
          roughCanvas.line(data.start.x, data.start.y, data.end.x, data.end.y, {
            stroke: data.color,
          });
          break;
        case "rectangle":
          roughCanvas.rectangle(
            data.start.x,
            data.start.y,
            data.width,
            data.height,
            { stroke: data.color }
          );
          break;
        case "ellipse":
          roughCanvas.ellipse(
            data.start.x,
            data.start.y,
            data.width,
            data.height,
            { stroke: data.color }
          );
          break;
        case "pencil":
          context.strokeStyle = data.color;
          context.lineWidth = 7;
          context.lineCap = "round";
          context.beginPath();
          context.moveTo(data.start.x, data.start.y);
          context.lineTo(data.end.x, data.end.y);
          context.stroke();
          break;
          case "eraser":
            context.clearRect(data.start.x - 15, data.start.y - 15, 30, 30);
            break;
      }
    });

    }, []);
  
    const getCanvasCoordinates = (e) => {
      const canvas = mainCanvasRef.current;
      const rect = canvas.getBoundingClientRect();
      return {
        x: (e.clientX - rect.left) * (canvas.width / rect.width),
        y: (e.clientY - rect.top) * (canvas.height / rect.height),
      };
    };
  
    const handleMouseDown = (e) => {
      setIsDrawing(true);
      const { x, y } = getCanvasCoordinates(e);
      setStartPos({ x, y });
  
      if (selectedTool === "pencil") {
        const mainContext = mainCanvasRef.current.getContext("2d");
        mainContext.beginPath();
        mainContext.moveTo(x, y);
      }
    };
  
    const handleMouseUp = (e) => {
      if (!isDrawing) return;
      setIsDrawing(false);
  
      const { x, y } = getCanvasCoordinates(e);
      const roughCanvas = rough.canvas(mainCanvasRef.current);
  
      if (selectedTool === "line") {
        roughCanvas.line(startPos.x, startPos.y, x, y, { stroke: color });

        socket.emit("draw", {
          type: "line",
          start: {x: startPos.x, y: startPos.y},
          end: {x, y},
          color
        })
      } else if (selectedTool === "rectangle") {
        roughCanvas.rectangle(
          startPos.x,
          startPos.y,
          x - startPos.x,
          y - startPos.y,
          { stroke: color }
        );

        socket.emit("draw", {
          type: "rectangle",
          start: {x: startPos.x, y: startPos.y},
          width: x- startPos.x,
          height: y- startPos.y,
          color
        })
      } else if (selectedTool === "ellipse") {
        roughCanvas.ellipse(
          startPos.x,
          startPos.y,
          Math.abs(x - startPos.x),
          Math.abs(y - startPos.y),
          { stroke: color }
        );

        socket.emit("draw", {
          type: "ellipse",
          start: {x: startPos.x, y:startPos.y},
          width: Math.abs(x- startPos.x),
          height: Math.abs(y- startPos.y),
          color
        })
      }
  
      // Clear the preview canvas
      const previewContext = previewCanvasRef.current.getContext("2d");
      previewContext.clearRect(0, 0, previewCanvasRef.current.width, previewCanvasRef.current.height);
    };
  
    const handleMouseMove = (e) => {
      if (!isDrawing) return;
  
      const { x, y } = getCanvasCoordinates(e);
  
      if (selectedTool === "pencil") {
        const mainContext = mainCanvasRef.current.getContext("2d");
        mainContext.strokeStyle = color;
        mainContext.lineWidth = strokeSize;
        mainContext.lineCap = "round";
        mainContext.lineTo(x, y);
        mainContext.stroke();

        socket.emit("draw", {
            type: "pencil",
            start: startPos,
            end: {x, y},
            color,
        })
        setStartPos({x, y});

      } else if (
        selectedTool === "rectangle" ||
        selectedTool === "ellipse" ||
        selectedTool === "line") {
        // Clear the preview canvas
        const previewContext = previewCanvasRef.current.getContext("2d");
        previewContext.clearRect(0, 0, previewCanvasRef.current.width, previewCanvasRef.current.height);
  
        // Draw a preview shape
        const roughCanvas = rough.canvas(previewCanvasRef.current);
        if (selectedTool === "rectangle") {
          roughCanvas.rectangle(startPos.x, startPos.y, x - startPos.x, y - startPos.y, { stroke: color });
        } else if (selectedTool === "ellipse") {
          roughCanvas.ellipse(
            startPos.x,
            startPos.y,
            Math.abs(x - startPos.x),
            Math.abs(y - startPos.y),
            { stroke: color }
          );
        } else if (selectedTool === "line") {
          roughCanvas.line(startPos.x, startPos.y, x, y, { stroke: color });
        }
      }
  
      if (selectedTool === "eraser") {
        const mainContext = mainCanvasRef.current.getContext("2d");
        mainContext.clearRect(x - 15, y - 15, 30, 30); //for size
        
        socket.emit("draw", {
            type: "eraser",
            start: {x, y}
        })
      }
    };
  
    return (
      <div className="relative w-screen h-screen">
        <canvas
          ref={mainCanvasRef}
          className="absolute top-0 left-0 w-full h-full"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        />
        <canvas
          ref={previewCanvasRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        />
      </div>
    );
  };
  
  export default Canvas;
