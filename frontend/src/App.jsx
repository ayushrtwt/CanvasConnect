import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import { useRef, useState } from "react"
import Canvas from "./components/Canvas";


function App() {
  const [selectedTool, setSelectedTool] = useState("pencil");
  const [color, setColor]= useState("#000000");
  const mainCanvasRef = useRef(null);

  const clearCanvas = ()=> {
    const canvas = mainCanvasRef.current;
    if(canvas){
      const context = canvas.getContext("2d");
      context.clearRect(0,0, canvas.width, canvas.height);
    }
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
          <Navbar selectedTool={selectedTool} setSelectedTool={setSelectedTool} setColor={setColor} clearCanvas={clearCanvas}/>
          <Canvas selectedTool={selectedTool} color={color} mainCanvasRef={mainCanvasRef} />
        </>
        } />
      </Routes>
    </Router>
  )
}

export default App
