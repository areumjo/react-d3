import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import { select, axisBottom, axisRight, scaleLinear, scaleBand } from "d3";

function App() {
  const [data, setData] = useState([75, 30, 45, 60, 20, 56, 33, 1, 30]);
  const svgRef = useRef(); 
  
  // will be called initially and on every `[data]` change
  useEffect(() => {
    const svg = select(svgRef.current); // generate svg element


    // `scaleLinear()` : linear value vs `scaleBand()` non-linear (categorical)
    const xScale = scaleBand()
    //   .domain([0, 1, 2, 3, 4, 5, 6]) // input value
        .domain(data.map((value, index) => index))
        .range([0, 300]) // in svg width
        .padding(0.5);
        
    const yScale = scaleLinear()
        .domain([0, 150])
        .range([150, 0]) // height

    const colorScale = scaleLinear()
        .domain([50, 100, 150])
        .range(["red", "yellow", "green"])
        .clamp(true); // it will get the minimum just "red" (maximum == "green")

    const xAxis = axisBottom(xScale)
        .ticks(data.length);
        
    const yAxis = axisRight(yScale);

    svg
        .select(".x-axis")
        .style("transform", "translateY(150px")
        .call(xAxis);

    svg
        .select(".y-axis")
        .style("transform", "translateX(300px")
        .call(yAxis);

    svg.selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .style("transform", "scale(1, -1)")
        .attr("x", (value, index) => xScale(index))
        .attr("y", -150)
        .attr("width", xScale.bandwidth())
        .transition() // for animation
        .attr("height", value => 150 - yScale(value))
        .attr("fill", colorScale); // putting this after transition() willl give `animated` color change
    }, [data]) 

    return (
        <div>
            <h4>From using React <code>hooks</code> with D3</h4>
            <svg ref={svgRef}>
                <g className="x-axis" />
                <g className="y-axis" />
            </svg>
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
    );
}

export default App;
