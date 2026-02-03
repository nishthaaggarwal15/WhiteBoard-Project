import React, { Children, useReducer } from 'react'
import toolboxContext from './toolbox-context'
import { TOOL_ITEMS,COLORS } from '../constants';
function toolboxReducer(state, action){
    // switch (key) {
    //     case value:
            
    //         break;
    
    //     default:
    //         break;
    // }
}
const initalToolboxState={
     [TOOL_ITEMS.LINE]: {
    stroke: COLORS.BLACK,
    size: 1,
  },
  [TOOL_ITEMS.RECTANGLE]: {
    stroke: COLORS.BLACK,
    fill: null,
    size: 1,
  },
  [TOOL_ITEMS.CIRCLE]: {
    stroke: COLORS.BLACK,
    fill: null,
    size: 1,
  },
  [TOOL_ITEMS.ARROW]: {
    stroke: COLORS.BLACK,
    size: 1,
  },
}


const ToolboxProvider = ({children}) => {
    const [toolboxState, dispatchToolboxAction]= useReducer(toolboxReducer,initalToolboxState);
const toolboxContextValue = {
toolboxState
};
  return (
    <toolboxContext.Provider value = {toolboxContextValue}>
{children}
    </toolboxContext.Provider>
  )
}

export default ToolboxProvider
