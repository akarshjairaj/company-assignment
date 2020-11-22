import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import * as d3 from "d3";

export default function VizBar({ data, valueKey, fieldKey }) {

  const chartIdContainer = useRef(uuidv4());
  // console.log(chartIdContainer)

  const makeBar = (divWidth) => {
    // var metricFormat = metricDictFormat["leadingDeathsMetric"];
    let divHeight = data.length*35;

    if (d3.select(`#barChartHolder${chartIdContainer.current}SVG`)) {
      d3.select(`#barChartHolder${chartIdContainer.current}SVG`).remove();
    }
    // set the dimensions and margins of the graph
    var margin = { top: 5, right: 70, bottom: 5, left: 10 },
      width = divWidth - margin.left - margin.right,
      height = divHeight - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select(`#barChartHolder${chartIdContainer.current}`)
      .append("svg")
      .attr("id", `barChartHolder${chartIdContainer.current}SVG`)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    // Add X axis
    var x = d3
      .scaleLinear()
      .domain([0, d3.max(data.map((d) => d[valueKey]))])
      .range([0, width]);

    // Y axis
    var y = d3
      .scaleBand()
      .range([0, height])
      .domain(data.map((d) => d[fieldKey]))
      .padding(0.3);

    // Y axis
    var yValue = d3
      .scaleBand()
      .range([0, height])
      //   .domain(data.map((d) => d3.format(metricFormat)(d[metricSelected])))
      .domain(data.map((d) => d[valueKey]))
      .padding(0.3);

    //Bars
    svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .selectAll("myRect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", x(0))
      .attr("y", function (d) {
        return y(d[fieldKey]);
      })
      .attr("width", function (d) {
        return x(d[valueKey]);
      })
      .attr("height", y.bandwidth())
      .attr("fill", "#7E868A")
      .attr("rx", 5)
      .attr("opacity", 0.5)
      .on("mouseover", function (d) {
        d3.select(this).style("cursor", "pointer");
        d3.select(this).style("opacity", 1.0);
      })
      .on("mouseout", function (d) {
        d3.select(this).style("opacity", 0.5);
      });

    svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(d3.axisRight(y).tickSize(0))
      .call((g) => g.select(".domain").remove())
      .call((g) => g.select(".path").remove())
      .selectAll("text")
      .attr("fill", "black");

    // .attr("transform", "translate(-10,0)rotate(-45)")
    // .style("text-anchor", "end");

    svg
      .append("g")
      .attr("transform", `translate(${width + margin.left + 5}, ${margin.top})`)
      .call(d3.axisRight(yValue).tickSize(0))
      .call((g) => g.select(".domain").remove())
      .call((g) => g.select(".path").remove())
      .selectAll("text")
      .text(d => d3.format(",d")(parseInt(d)))
  };

  useEffect(() => {
    let divWidth = document.getElementById(
      `barChartHolder${chartIdContainer.current}`
    ).offsetWidth;
    makeBar(divWidth);
  }, [data]);

  return (
    <div className="bar-container">
      {data.length > 0 ? (
        <div id={`barChartHolder${chartIdContainer.current}`}></div>
      ) : (
        <h1>No data</h1>
      )}
    </div>
  );
}
