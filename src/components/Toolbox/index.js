import React, { useContext, useState } from 'react'
import classes from "./index.module.css"
import cx from "classnames";
import { FaSlash } from 'react-icons/fa';
import { LuRectangleHorizontal } from 'react-icons/lu';
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
    </div>
  )
}

export default Toolbox
