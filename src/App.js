import './App.css';
import { useEffect, useRef } from 'react';
import rough from 'roughjs';

function App() {
  const canvasRef = useRef();
  useEffect(()=>{
const canvas = canvasRef.current; // to select the canvas 
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext("2d");

const roughCanvas = rough.canvas(canvas);

const generator = roughCanvas.generator;
// ...........................x axis, y axis, size 
let rect1 = generator.rectangle(10, 10, 100, 100);
let rect2 = generator.rectangle(10, 120, 100, 100, {
  fill: "red", 
  stroke: "blue"});
roughCanvas.draw(rect1);
roughCanvas.draw(rect2);

context.fillRect(0, 0, 150, 75);
  },[])
  return (
    <div className="App" >
      <canvas  ref = {canvasRef}/>
      {/* <h1>White board app </h1> */}
    </div>
  );
}

export default App;
