import React from "react";
import classes from "./index.module.css";
import { COLORS } from "../../constants";
import toolboxContext from "../../store/toolbox-context";
import boardContext from "../../store/board-context";
import { useContext } from "react";
import cx from "classnames";


const Toolbox = () => {
     const { activeToolItem } = useContext(boardContext);
  const { toolboxState } = useContext(toolboxContext);
      const strokeColor = toolboxState[activeToolItem]?.stroke;
  const fillColor = toolboxState[activeToolItem]?.fill;
  const size = toolboxState[activeToolItem]?.size;

  return (
    <div className={classes.container}>
      <div className={classes.selectOptionContainer}>
        <div className={classes.toolBoxLabel}>Stroke Color</div>

        <div className={classes.colorsContainer}>
          {Object.keys(COLORS).map((k) => (
            <div
              key={k}
                className={cx(classes.colorBox, {
                    [classes.activeColorBox]: strokeColor === COLORS[k],
                  })}
              style={{ backgroundColor: COLORS[k] }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Toolbox;
