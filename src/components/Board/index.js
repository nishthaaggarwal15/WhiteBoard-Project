import { useContext, useEffect, useLayoutEffect, useRef } from 'react';
import rough from 'roughjs';
import boardContext from '../../store/board-context';
import { TOOL_ACTION_TYPES } from '../../constants';
import toolboxContext from '../../store/toolbox-context';

function Board () {
  const canvasRef = useRef();
  // useRef is used to get direct access to the canvas DOM element

  const 
  {elements,
    boardMouseDownHandler,
   boardMouseMoveHandler, 
   toolActionType,
   boardMouseUpHandler,
  }= useContext(boardContext);
  // taking required state and functions from board context
  const {toolboxState}= useContext(toolboxContext);

  // to select the canvas 
  useEffect(()=>{
const canvas = canvasRef.current; // to select the canvas 
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// canvas size is set once when component mounts

},[])

// to draw the rough canvas 
  useLayoutEffect(()=>{
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    // get 2d drawing context from canvas

    context.save();
    // save current canvas state before drawing

const roughCanvas = rough.canvas(canvas);
// roughjs wrapper over normal canvas

const generator = roughCanvas.generator;
// generator is not used here, but roughCanvas uses it internally

elements.forEach(element=>{
  roughCanvas.draw(element.roughEle);
  // draw each stored element on canvas
});

// cleanup function runs before next draw
return ()=>{
context.clearRect(0,0,canvas.width, canvas.height);
// clear canvas before redrawing to avoid overlapping drawings
}
  },[elements])
  // this effect runs every time elements array changes

// get the points of where we click 
const handleMouseDown = (event)=> {
boardMouseDownHandler(event, toolboxState);
// start drawing when mouse is pressed
  }

const handleMouseMove= (event)=>{
  if(toolActionType===TOOL_ACTION_TYPES.DRAWING){
boardMouseMoveHandler(event);
// update drawing only when mouse is pressed
  }

}

const handleMouseUp= ()=>{
boardMouseUpHandler();
// stop drawing when mouse is released
  

}

  return (
    <div className="Board" >
      <canvas  ref = {canvasRef} 
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      />
      {/* <h1>White board app </h1> */}
    </div>
  );
}

export default Board;
