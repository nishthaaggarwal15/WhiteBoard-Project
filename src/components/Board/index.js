
import { useContext, useEffect, useLayoutEffect, useRef } from 'react';
import rough from 'roughjs';
import boardContext from '../../store/board-context';
import { TOOL_ACTION_TYPES } from '../../constants';

function Board () {
  const canvasRef = useRef();
  const 
  {elements,
    boardMouseDownHandler,
   boardMouseMoveHandler, 
   toolActionType,
   boardMouseUpHandler,
  }= useContext(boardContext);
  // to select the canvas 
  useEffect(()=>{
const canvas = canvasRef.current; // to select the canvas 
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

},[])

// to draw the rough canvas 
  useLayoutEffect(()=>{
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.save();
const roughCanvas = rough.canvas(canvas);

const generator = roughCanvas.generator;


elements.forEach(element=>{
  roughCanvas.draw(element.roughEle);
});
return ()=>{
context.clearRect(0,0,canvas.width, canvas.height);
}
  },[elements])

// get the points of where we click 
const handleMouseDown = (event)=> {
boardMouseDownHandler(event);
  }
const handleMouseMove= (event)=>{
  if(toolActionType===TOOL_ACTION_TYPES.DRAWING){
boardMouseMoveHandler(event);
  }

}
const handleMouseUp= ()=>{
boardMouseUpHandler();
  

}

  return (
    <div className="Board" >
      <canvas  ref = {canvasRef} onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      />
      {/* <h1>White board app </h1> */}
    </div>
  );
}

export default Board;
