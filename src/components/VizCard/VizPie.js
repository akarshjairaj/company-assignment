import React, { useEffect, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { v4 as uuidv4 } from "uuid";
import { descending } from "d3";

export default function VizPie({ data, valueKey, fieldKey }) {
  const chartIdContainer = useRef(uuidv4());
  // console.log(valueKey);
  // console.log(fieldKey);

  const makePie = () => {
    let chart = am4core.create(
      `pieChartHolder${chartIdContainer.current}`,
      am4charts.PieChart
    );

    //sort data desc
    data = data.slice().sort((a, b) => descending(a[valueKey], b[valueKey]));
    let topFour = data.slice(0, 4);
    let remaining = {
      [fieldKey]: "Others",
      [valueKey]: data
        .slice(4)
        .map((d) => d[valueKey])
        .reduce((a, b) => a + b, 0),
    };
    let updatedData;
    if (data.slice(4).length > 0) {
      updatedData = [...topFour, remaining];
    } else {
      updatedData = [...topFour];
    }
    chart.data = updatedData;
    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = valueKey;
    pieSeries.dataFields.category = fieldKey;
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;
  };

  useEffect(() => {
    makePie();
  });

  return (
    <div className="pie-container">
      {data.length > 0 ? (
        <div id={`pieChartHolder${chartIdContainer.current}`}></div>
      ) : (
        <h1>No data</h1>
      )}
    </div>
  );
}
