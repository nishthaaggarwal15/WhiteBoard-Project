// taking the states from provider annd givving it to component 
import { createContext } from "react";
 const toolboxContext = createContext({
  toolboxState: {},
  changeStroke:()=>{},
  changeFill:()=>{},
  changeSize:()=>{},
 });
 export default toolboxContext;