import { createContext } from "react";
// taking all the state schanges or action changes from boardprovider and providing it index file of the component
const boardContext = createContext({
activeToolItem :" ",
  toolActionType: "",
elements: [],
boardMouseDownHandler:()=>{},
changeToolHandler : ()=>{},
boardMouseMoveHandler:()=>{},
boardMouseUpHandler:()=>{},
});
export default boardContext;