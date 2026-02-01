import React, { useState } from 'react'
import classes from "./index.module.css"
import cx from "classnames";
import { FaSlash } from 'react-icons/fa';
import { LuRectangleHorizontal } from 'react-icons/lu';
const Toolbox = () => {
  const [activeToolItem, setActiveToolItem] = useState("LINE");
  return (
    // icon 1
    <div className= {classes.container}>
      <div
       className={ cx( classes.toolItem,{[classes.active]:activeToolItem==="LINE"})}
       onClick={()=> setActiveToolItem("LINE")}
       >
        <FaSlash></FaSlash>
        </div>
{/* // icon 2 */}

        <div
         className={cx( classes.toolItem,{[classes.active]:activeToolItem==="RECTANGLE"})}
         onClick={()=> setActiveToolItem("RECTANGLE")}
         >
          <LuRectangleHorizontal></LuRectangleHorizontal>
          </div>
    </div>
  )
}

export default Toolbox
