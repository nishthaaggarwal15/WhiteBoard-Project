import React from "react";
import classes from "./index.module.css";
import { COLORS, FILL_TOOL_TYPES, STROKE_TOOL_TYPES, SIZE_TOOL_TYPES,TOOL_ITEMS } from "../../constants";
import toolboxContext from "../../store/toolbox-context";
import boardContext from "../../store/board-context";
import { useContext } from "react";
import cx from "classnames";

const Toolbox = () => {
  const { activeToolItem } = useContext(boardContext); // extracting the current tool item
  const { toolboxState, changeStroke, changeFill,changeSize } = useContext(toolboxContext);
  // using toolbox context functions

  const strokeColor = toolboxState[activeToolItem]?.stroke; // stroke color of current tool
  const fillColor = toolboxState[activeToolItem]?.fill;
  const size = toolboxState[activeToolItem]?.size;

  return (
    <div className={classes.container}>

      {/* Stroke Color Section */}
      {STROKE_TOOL_TYPES.includes(activeToolItem)&& <div className={classes.selectOptionContainer}>
        <div className={classes.toolBoxLabel}>Stroke Color</div>

        <div className={classes.colorsContainer}>
          <div>
              <input
                className={classes.colorPicker}
                type="color"
                value={strokeColor}
                onChange={(e) => changeStroke(activeToolItem, e.target.value)}
              ></input>
            </div>
          {Object.keys(COLORS).map((k) => (
            <div
              key={k}
              className={cx(classes.colorBox, {
                [classes.activeColorBox]: strokeColor === COLORS[k],
              })}
              style={{ backgroundColor: COLORS[k] }}
              onClick={() => changeStroke(activeToolItem, COLORS[k])}
            />
          ))}
        </div>
      </div>}

      {/* Fill Color Section */}
     {  FILL_TOOL_TYPES.includes(activeToolItem) && <div className={classes.selectOptionContainer}>
        <div className={classes.toolBoxLabel}>Fill Color</div>

        <div className={classes.colorsContainer}>
           {fillColor === null ? (
              <div
                className={cx(classes.colorPicker, classes.noFillColorBox)}
                onClick={() => changeFill(activeToolItem, COLORS.BLACK)}
              ></div>
            ) : (
              <div>
                <input
                  className={classes.colorPicker}
                  type="color"
                  value={strokeColor}
                  onChange={(e) => changeFill(activeToolItem, e.target.value)}
                ></input>
              </div>
            )}
            <div
              className={cx(classes.colorBox, classes.noFillColorBox, {
                [classes.activeColorBox]: fillColor === null,
              })}
              onClick={() => changeFill(activeToolItem, null)}
            ></div>
          {Object.keys(COLORS).map((k) => (
            <div
              key={k}
              className={cx(classes.colorBox, {
                [classes.activeColorBox]: fillColor === COLORS[k],
              })}
              style={{ backgroundColor: COLORS[k] }}
              onClick={() => changeFill(activeToolItem, COLORS[k])}
            />
          ))}
        </div>
      </div>
}
{/* SIZE TOOL ITEMS */}
{SIZE_TOOL_TYPES.includes(activeToolItem) && (
        <div className={classes.selectOptionContainer}>
          <div className={classes.toolBoxLabel}>
            {activeToolItem === TOOL_ITEMS.TEXT ? "Font Size" : "Brush Size"}
          </div>
          <input
            type="range"
            min={activeToolItem === TOOL_ITEMS.TEXT ? 12 : 1}
            max={activeToolItem === TOOL_ITEMS.TEXT ? 64 : 10}
            step={1}
            value={size}
            onChange={(event) => changeSize(activeToolItem, event.target.value)}
          ></input>
        </div>
      )}
    </div>
  );
};

export default Toolbox;
