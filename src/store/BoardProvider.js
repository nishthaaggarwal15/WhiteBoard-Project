import React, { useReducer } from 'react'
import boardContext from './board-context'
import { BOARD_ACTIONS, TOOL_ACTION_TYPES, TOOL_ITEMS } from '../constants';
import { useState } from 'react';
import rough from "roughjs/bundled/rough.esm";
import { createRoughElement } from '../utils/element';

const gen = rough.generator();

const boardReducer= (state,action) =>{
 switch (action.type) {
    // if we change the tool
    case BOARD_ACTIONS.CHANGE_TOOL:
        return{
            ...state,
            activeToolItem: action.payload.tool,
        }

        // on draw down
    case BOARD_ACTIONS.DRAW_DOWN: {
  const { clientX, clientY } = action.payload;// extract the x,y axis 
const newElement = createRoughElement(
state.elements.length,
clientX,
clientY, 
clientX,
clientY,
{type: state.activeToolItem}
  );
    return {
    ...state,
    toolActionType: TOOL_ACTION_TYPES.DRAWING,
    elements: [...state.elements, newElement],
  };
}
//on moving the mouse 
case BOARD_ACTIONS.DRAW_MOVE:{
    if (state.elements.length === 0) return state;
    const { clientX, clientY } = action.payload;
    const newElements = [...state.elements];
   const index = newElements.length - 1;
   const {x1,y1}= newElements[index];
    const newElement = createRoughElement(index,x1,y1,clientX,clientY,{
     type:state.activeToolItem,
    });
    newElements[index]= newElement;
    return {
        ...state,
        elements: newElements,
    };
}
// on stopping the mouse 
case  BOARD_ACTIONS.DRAW_UP:{
return{
    ...state,
    toolActionType: TOOL_ACTION_TYPES.NONE,
}
}
    default:
        return state;
 }
}

//inital state of board
const initialBoardState= {
    activeToolItem: TOOL_ITEMS.LINE,
    toolActionType: TOOL_ACTION_TYPES.NONE,
    elements:[],
}

// use reducer 
const BoardProvider = ({children}) => {
    const [boardState, dispatchBoardAction]= useReducer(boardReducer, initialBoardState);
//   const [activeToolItem, setActiveToolItem] = useState(TOOL_ITEMS.LINE);  

 
// dispatch functions for every action
const changeToolHandler = (tool) =>{
   dispatchBoardAction({
      type : BOARD_ACTIONS.CHANGE_TOOL, 
      payload:{
        tool,
      }
   });
  };

  const boardMouseDownHandler= (event)=>{
    const {clientX, clientY}= event;
    dispatchBoardAction({
        type:BOARD_ACTIONS.DRAW_DOWN,
        payload:{
clientX,
clientY
        }
    })
  }

  const boardMouseMoveHandler= (event)=>{
 const {clientX, clientY}= event;
  
    dispatchBoardAction({
        type: BOARD_ACTIONS.DRAW_MOVE,
        payload:{
clientX,
clientY
        }
    })
  }

   const boardMouseUpHandler= ()=>{
  
    dispatchBoardAction({
        type:BOARD_ACTIONS.DRAW_UP,
    })
  }

  //context value to pass down to other files
  const boardContextValue = {
    activeToolItem: boardState.activeToolItem,
    elements : boardState.elements,
 toolActionType: boardState.toolActionType,
    changeToolHandler,
    boardMouseDownHandler,
    boardMouseMoveHandler,
    boardMouseUpHandler,
  };


 
 // return the provider 
  return (
   <boardContext.Provider
   value =
    {boardContextValue}>
    {children}

   </boardContext.Provider>
  );
};

export default BoardProvider
