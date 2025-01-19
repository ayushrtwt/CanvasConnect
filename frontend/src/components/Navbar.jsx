import { GoPencil } from "react-icons/go";
import { LuEraser, LuRectangleHorizontal } from "react-icons/lu";
import { MdOutlineHorizontalRule } from "react-icons/md";
import { TbOvalVertical } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";


const Navbar= ({selectedTool, setSelectedTool, setColor, clearCanvas})=> {

    const handleClick = (tool) => {
        setSelectedTool(tool);
    }

    return (
        <nav className="flex items-center justify-center p-4 bg-white">
            <div className="border border-gray-300 rounded-xl p-2">
                <div className="flex items-center gap-4">
                    <input 
                    type="color"
                    className="cursor-pointer w-6 h-6 border-none" 
                    title="Select Color"
                    onChange={(e)=> setColor(e.target.value)}
                    />

                    <button
                    onClick={()=> handleClick("pencil")} 
                    className={`flex items-center justify-center border-none p-2 text-gray-800 text-lg hover:text-blue-500 ${selectedTool === "pencil" ? "bg-blue-100 rounded-md" : ""}`}  
                    title="Pencil">
                        <GoPencil />
                    </button>

                    <button 
                    onClick={()=> handleClick("line")} 
                    className={`flex items-center justify-center border-none p-2 text-gray-800 text-lg hover:text-blue-500 ${selectedTool === "line" ? "bg-blue-100 rounded-md" : ""}`}  
                    title="Line">
                        <MdOutlineHorizontalRule />
                    </button>

                    <button 
                    onClick={()=> handleClick("rectangle")} 
                    className={`flex items-center justify-center border-none p-2 text-gray-800 text-lg hover:text-blue-500 ${selectedTool === "rectangle" ? "bg-blue-100 rounded-md" : ""}`}  
                    title="Rectangle">
                        <LuRectangleHorizontal />
                    </button>

                    <button
                    onClick={()=> handleClick("ellipse")}  
                    className={`flex items-center justify-center border-none p-2 text-gray-800 text-lg hover:text-blue-500 ${selectedTool === "ellipse" ? "bg-blue-100 rounded-md" : ""}`}  
                    title="Ellipse">
                        <TbOvalVertical />
                    </button>

                    <button 
                    onClick={()=> handleClick("eraser")} 
                    className={`flex items-center justify-center border-none p-2 text-gray-800 text-lg hover:text-blue-500 ${selectedTool === "eraser" ? "bg-blue-100 rounded-md" : ""}`}  
                    title="Eraser">
                        <LuEraser />
                    </button>

                    <button 
                    onClick={clearCanvas}
                    className="flex items-center justify-center border-none p-2 text-gray-800 text-lg hover:text-blue-500" 
                    title="Clear Canvas">
                        <RxCross2 />
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;