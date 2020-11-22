import React from "react";
import VizBar from "./VizBar";
import VizPie from "./VizPie";

export default function VizChart({ data, chartType, valueKey, fieldKey }) {
  return (
    <div className="viz-chart">
      {chartType === "bar" ? (
        <VizBar data={data} valueKey={valueKey} fieldKey={fieldKey} />
      ) : chartType === "pie" ? (
        <VizPie data={data} valueKey={valueKey} fieldKey={fieldKey} />
      ) : null}
    </div>
  );
}
