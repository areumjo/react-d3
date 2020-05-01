import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import { select, line, curveCardinal, axisBottom, axisRight, scaleLinear } from "d3";
import BarChart from "./BarChart.js";

function App() {
  const [data, setData] = useState([75, 30, 45, 60, 20, 56, 33, 1, 30]);
  const svgRef = useRef(); 
  
  // will be called initially and on every `[data]` change
  useEffect(() => {
    const svg = select(svgRef.current); // generate svg element

    const xScale = scaleLinear()
      .domain([0, data.length - 1]) // input value
      .range([0, 300]) // in svg width

    const yScale = scaleLinear()
      .domain([0, 150])
      .range([150, 0]) // height

    const xAxis = axisBottom(xScale)
      .ticks(data.length)
      .tickFormat(index => index + 1);
    const yAxis = axisRight(yScale);

    svg
      .select(".x-axis")
      .style("transform", "translateY(150px")
      .call(xAxis);

    svg
      .select(".y-axis")
      .style("transform", "translateX(300px")
      .call(yAxis);

    const myLine = line() // generate "d" attribute of a path element
      .x((value, index) => xScale(index))
      .y(yScale)
      .curve(curveCardinal)

    // render path element, and attaches
    svg
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("class", "line")
      .attr("d", myLine)
      .attr("fill", "none")
      .attr("stroke", "blue");
  }, [data]) 

  return (
    <div className="App">
      <header className="App-header">
        <p>Let's see where to live <span>🏡</span></p>
      </header>
      <div>
        <h2>From using React <code>hooks</code> with D3</h2>
        <svg ref={svgRef}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
        {/* {data.map(v => (
            <circle r={v}></circle>
          ))} */}
        {/* </svg> */}
        <br />
        <br />
        <br />
        <button onClick={() => setData(data.map(value => value + 5))}>
          Update data
        </button>
        <button onClick={() => setData(data.filter(value => value < 35))}>
          Filter data
        </button>
        <br />
           
      </div>
      <BarChart />
    </div>
  );
}

export default App;
