import React, { useContext, useState } from 'react'
import classes from "./index.module.css"
import cx from "classnames";
import { FaArrowRight, FaRegCircle, FaSlash } from 'react-icons/fa';
import {  LuRectangleHorizontal } from 'react-icons/lu';
import { TOOL_ITEMS } from '../../constants';
import boardContext from '../../store/board-context';
const Toolbox = () => {
  // const [activeToolItem, setActiveToolItem] = useState("LINE");
  const {activeToolItem, changeToolHandler} = useContext(boardContext);
  return (
    // icon 1
    <div className= {classes.container}>
      <div
       className={ cx( classes.toolItem,{[classes.active]:activeToolItem===TOOL_ITEMS.LINE})}
       onClick={()=> changeToolHandler(TOOL_ITEMS.LINE)}
       >
        <FaSlash></FaSlash>
        </div>
{/* // icon 2 */}

        <div
         className={cx( classes.toolItem,{[classes.active]:activeToolItem===TOOL_ITEMS.RECTANGLE})}
         onClick={()=> changeToolHandler(TOOL_ITEMS.RECTANGLE)}
         >
          <LuRectangleHorizontal></LuRectangleHorizontal>
          </div>

          {/* //icon 3  */}
           <div
         className={cx( classes.toolItem,{[classes.active]:activeToolItem===TOOL_ITEMS.CIRCLE})}
         onClick={()=> changeToolHandler(TOOL_ITEMS.CIRCLE)}
         >
          <FaRegCircle></FaRegCircle>
          </div>

            {/* //icon 4  */}
           <div
         className={cx( classes.toolItem,{[classes.active]:activeToolItem===TOOL_ITEMS.ARROW})}
         onClick={()=> changeToolHandler(TOOL_ITEMS.ARROW)}
         >
        <FaArrowRight></FaArrowRight>
          </div>
    </div>
  )
}

export default Toolbox
