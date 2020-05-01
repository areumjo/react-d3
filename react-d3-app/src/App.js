import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import { select } from "d3";

function App() {
  const [data, setData] = useState([25, 30, 45, 60, 20]);

  // use `useRef` to allow D3 to use and manipulate <svg> defined down in return
  const svgRef = useRef(); // create reference object
  console.log(svgRef); // {current: undefined} it will be empty unless useEffect takes place
  
  useEffect(() => {
    // console.log(svgRef); // {current: svg}
    const svg = select(svgRef.current); // svg

    // console.log(svg.selectAll("circle").data(data))
    // at this point you can use any d3 method to manipulate dom or render circles
    svg
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("r", value => value)
      .attr("cx", value => value * 2)
      .attr("cy", value => value * 2)
      .attr("stroke", "red");
  }, [data]) // a way to access <svg> dom element

  return (
    <div className="App">
      <header className="App-header">
        <p>Let's see where to live <span>🏡</span></p>
      </header>
      <div>
        <h2>From using React <code>hooks</code> with D3</h2>
        <svg ref={svgRef}>
        </svg>
        {/* {data.map(v => (
            <circle r={v}></circle>
          ))} */}
        {/* </svg> */}
        <br />
        <button onClick={() => setData(data.map(value => value + 5))}>
          Update data
        </button>
        <button onClick={() => setData(data.filter(value => value < 35))}>
          Filter data
        </button>
        <br />
        
          
      </div>
    </div>
  );
}

export default App;
