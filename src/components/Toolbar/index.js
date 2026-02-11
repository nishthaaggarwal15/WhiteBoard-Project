import React, { useContext } from 'react'
import classes from "./index.module.css"
import cx from "classnames";
import { FaArrowRight, FaRegCircle, FaSlash, FaPaintBrush, FaEraser, FaFont, FaUndoAlt, FaRedoAlt, FaDownload} from 'react-icons/fa';
import {  LuRectangleHorizontal } from 'react-icons/lu';
import { TOOL_ITEMS } from '../../constants';
import boardContext from '../../store/board-context';
const Toolbar = () => {
  // const [activeToolItem, setActiveToolItem] = useState("LINE");
  const {activeToolItem, changeToolHandler,undo, redo} = useContext(boardContext);
  
  const handleDownloadClick = () => {
    const canvas = document.getElementById("canvas");
    const data = canvas.toDataURL("image/png");
    const anchor = document.createElement("a");
    anchor.href = data;
    anchor.download = "board.png";
    anchor.click();
  };
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

           {/* //icon 5  */}
           <div
         className={cx( classes.toolItem,{[classes.active]:activeToolItem===TOOL_ITEMS.BRUSH})}
         onClick={()=> changeToolHandler(TOOL_ITEMS.BRUSH)}
         >
         <FaPaintBrush></FaPaintBrush>
          </div>

          {/* //icon 6  */}
           <div
         className={cx( classes.toolItem,{[classes.active]:activeToolItem===TOOL_ITEMS.ERASER})}
         onClick={()=> changeToolHandler(TOOL_ITEMS.ERASER)}
         >
         <FaEraser></FaEraser>
          </div>

          {/* //icon 7  */}
           <div
         className={cx( classes.toolItem,{[classes.active]:activeToolItem===TOOL_ITEMS.TEXT})}
         onClick={()=> changeToolHandler(TOOL_ITEMS.TEXT)}
         >
         <FaFont></FaFont>
          </div>
          
           {/* //icon 8  */}
           <div
         className={ classes.toolItem}
         onClick={undo}
         >
         <FaUndoAlt></FaUndoAlt>
          </div>
           {/* //icon 9  */}
           <div
         className={classes.toolItem}
         onClick={redo}
         >
         <FaRedoAlt/>
          </div>

           {/* //icon 10  */}
           <div
         className={classes.toolItem}
         onClick={handleDownloadClick}
         >
        <FaDownload></FaDownload>
          </div>

    </div>
  )
}

export default Toolbar
