import React, { useReducer } from 'react'
import boardContext from './board-context'
import { BOARD_ACTIONS, TOOL_ACTION_TYPES, TOOL_ITEMS } from '../constants';
import { useState } from 'react';
import { getSvgPathFromStroke,isPointNearElement,} from "../utils/element";
import getStroke from "perfect-freehand";
import rough from "roughjs/bundled/rough.esm";
import { createRoughElement } from '../utils/element';

// rough generator is used to create sketch-like shapes (it does not draw directly)
const gen = rough.generator();

const boardReducer= (state,action) =>{
 switch (action.type) {

  // if we change the tool
    case BOARD_ACTIONS.CHANGE_TOOL:
        return{
            ...state,
            activeToolItem: action.payload.tool,// keep rest the state same and return the tool we clicked on throught action 
            // only tool changes, drawings and other state remain the same
        }

  // on draw down
    case BOARD_ACTIONS.DRAW_DOWN: {
  const { clientX, clientY,stroke,fill,size } = action.payload;// extract the x,y axis we click on 
// create rough element of this index , with these axis and type of tool
const newElement = createRoughElement(
state.elements.length,
clientX,
clientY, 
clientX,
clientY,
{type: state.activeToolItem,stroke,fill,size}
  );
    return {
    ...state,
    toolActionType: TOOL_ACTION_TYPES.DRAWING, // return action type to drwaing
    elements: [...state.elements, newElement],// and add this new element to existing states 
    // drawing starts here and a new element is added
  };
}

//on moving the mouse 
case BOARD_ACTIONS.DRAW_MOVE: {
      const { clientX, clientY } = action.payload;
      const newElements = [...state.elements];
      const index = state.elements.length - 1;
      const { type } = newElements[index];
      switch (type) {
        case TOOL_ITEMS.LINE:
        case TOOL_ITEMS.RECTANGLE:
        case TOOL_ITEMS.CIRCLE:
        case TOOL_ITEMS.ARROW:
          const { x1, y1, stroke, fill, size } = newElements[index];
          const newElement = createRoughElement(index, x1, y1, clientX, clientY, {
            type: state.activeToolItem,
            stroke,
            fill,
            size,
          });
          newElements[index] = newElement;
          return {
            ...state,
            elements: newElements,
          };
        case TOOL_ITEMS.BRUSH:
          newElements[index].points = [
            ...newElements[index].points,
            { x: clientX, y: clientY },
          ];
          newElements[index].path = new Path2D(
            getSvgPathFromStroke(getStroke(newElements[index].points))
          );
          return {
            ...state,
            elements: newElements,
          };
        default:
          throw new Error("Type not recognized");
      }
    }

// on stopping the mouse 
case  BOARD_ACTIONS.DRAW_UP:{
return{
    ...state,
    toolActionType: TOOL_ACTION_TYPES.NONE,
    // drawing stops when mouse is released
}
}

    default:
        return state;
 }
}

//inital state of board
const initialBoardState= {
    activeToolItem: TOOL_ITEMS.LINE,
    // default tool when board loads

    toolActionType: TOOL_ACTION_TYPES.NONE,
    // no action happening initially

    elements:[],
    // stores all drawn elements
}

// use reducer 
const BoardProvider = ({children}) => {
    const [boardState, dispatchBoardAction]= useReducer(boardReducer, initialBoardState);
//   const [activeToolItem, setActiveToolItem] = useState(TOOL_ITEMS.LINE);  
// useReducer is used instead of useState for complex logic

 
// dispatch functions for every action
const changeToolHandler = (tool) =>{
   dispatchBoardAction({
      type : BOARD_ACTIONS.CHANGE_TOOL, 
      payload:{
        tool,
      }
      // sends selected tool to reducer
   });
  };

  const boardMouseDownHandler= (event, toolboxState)=>{
    const {clientX, clientY}= event;
    // mouse position when pressed

    dispatchBoardAction({
        type:BOARD_ACTIONS.DRAW_DOWN,
        payload:{
 clientX,
clientY,
stroke: toolboxState[boardState.activeToolItem]?.stroke,
fill : toolboxState[boardState.activeToolItem]?.fill,
size:toolboxState[boardState.activeToolItem]?.size,
        }
        // starts drawing at this point
    })
  }

  const boardMouseMoveHandler= (event)=>{
 const {clientX, clientY}= event;
  // mouse position while moving
  
    dispatchBoardAction({
        type: BOARD_ACTIONS.DRAW_MOVE,
        payload:{
clientX,
clientY
        }
        // updates current shape while dragging
    })
  }

   const boardMouseUpHandler= ()=>{
  
    dispatchBoardAction({
        type:BOARD_ACTIONS.DRAW_UP,
        // stops drawing when mouse is released
    })
  }

  //context value to pass down to other files
  const boardContextValue = {
    activeToolItem: boardState.activeToolItem,
    // currently selected tool

    elements : boardState.elements,
    // all drawn elements

    toolActionType: boardState.toolActionType,
    // tells whether drawing is happening or not

    changeToolHandler,
    boardMouseDownHandler,
    boardMouseMoveHandler,
    boardMouseUpHandler,
    // functions used by board and toolbox components
  };


 
 // return the provider 
  return (
   <boardContext.Provider
   value =
    {boardContextValue}>
    {children}
    {/* all child components can access board state */}

   </boardContext.Provider>
  );
};

export default BoardProvider
