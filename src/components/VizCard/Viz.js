import React from "react";
import VizTable from "./VizTable";
import VizChart from './VizChart'

export default function Viz({
  data,
  setData,
  orderBy,
  order,
  setOrder,
  setOrderBy,
  fieldKey,
  valueKey,
  chartType,
  vizType,
}) {
  return (
    <div className="viz-container">
      {vizType === "table" ? (
        <VizTable
          data={data}
          setData={setData}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          order={order}
          setOrder={setOrder}
          fieldKey={fieldKey}
          valueKey={valueKey}
        />
      ) : (
        <VizChart
          data={data}
          chartType={chartType}
          valueKey={valueKey} 
          fieldKey={fieldKey}
        />
      )}
    </div>
  );
}
