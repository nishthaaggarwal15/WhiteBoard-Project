import { useContext, useEffect, useLayoutEffect, useRef,useCallback } from 'react';
import rough from 'roughjs';
import boardContext from '../../store/board-context';
import { TOOL_ACTION_TYPES, TOOL_ITEMS } from '../../constants';
import toolboxContext from '../../store/toolbox-context';

import classes from "./index.module.css";
function Board () {
  const textAreaRef= useRef();
  const canvasRef = useRef();
  // useRef is used to get direct access to the canvas DOM element

  const 
  {elements,
    boardMouseDownHandler,
   boardMouseMoveHandler, 
   toolActionType,
   boardMouseUpHandler,
   textAreaBlurHandler,
   undo,
   redo,

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

useEffect(() => {
    function handleKeyDown(event) {
      if (event.ctrlKey && event.key === "z") {
        undo();
      } else if (event.ctrlKey && event.key === "y") {
        redo();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [undo, redo]);
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
  switch(element.type){
    case TOOL_ITEMS.LINE:
      case TOOL_ITEMS.RECTANGLE:
        case TOOL_ITEMS.CIRCLE:
        case TOOL_ITEMS.ARROW:
            roughCanvas.draw(element.roughEle);
            break;
            case TOOL_ITEMS.BRUSH :
              context.fillStyle= element.stroke;
              context.fill(element.path);
              context.restore();
              break;
              case TOOL_ITEMS.TEXT:
                context.textBaseline = "top";
          context.font = `${element.size}px Caveat`;
          context.fillStyle = element.stroke;
          context.fillText(element.text, element.x1, element.y1);
          context.restore();
          break;
              default: 
              throw new Error ("Type Not Recognized");
  }


  // draw each stored element on canvas
});

// cleanup function runs before next draw
return ()=>{
context.clearRect(0,0,canvas.width, canvas.height);
// clear canvas before redrawing to avoid overlapping drawings
}
  },[elements])
  // this effect runs every time elements array changes

useEffect(()=>{
const textarea= textAreaRef.current;
if(toolActionType===TOOL_ACTION_TYPES.WRITING){
  setTimeout(()=>{
textarea.focus();
  },0);
  
}
},[toolActionType]);
// get the points of where we click 
const handleMouseDown = (event)=> {
boardMouseDownHandler(event, toolboxState);
// start drawing when mouse is pressed
  }

const handleMouseMove= (event)=>{

boardMouseMoveHandler(event);
// update drawing only when mouse is pressed

}

const handleMouseUp= ()=>{
boardMouseUpHandler();
// stop drawing when mouse is released
  

}

  return (
    <div className="Board" >
{ toolActionType === TOOL_ACTION_TYPES.WRITING &&
  elements.length > 0 && (
    <textarea
    type ="text"
    ref= {textAreaRef}
      className={classes.textElementBox}
      style={{
        top: elements[elements.length - 1].y1,
        left: elements[elements.length - 1].x1,
        fontSize: `${elements[elements.length - 1]?.size}px`,
        color: elements[elements.length - 1]?.stroke,
      }}
      onBlur={(event)=>textAreaBlurHandler(event.target.value)}
    />
)}

      <canvas  ref = {canvasRef} 
      id="canvas"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      />
      {/* <h1>White board app </h1> */}
    </div>
  );
}

export default Board;
