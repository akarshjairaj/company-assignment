import React, { useState } from "react";
import VizMenu from "./VizCard/VizMenu";
import VizSwitch from "./VizCard/VizSwitch";
import Viz from "./VizCard/Viz";
import Paper from "@material-ui/core/Paper";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

export default function VizCard({
  title,
  chartType,
  originalData,
  fieldKey,
  valueKey,
}) {
  const [data, setData] = useState(originalData);
  const [vizType, setVizType] = useState("chart");
  const [orderBy, setOrderBy] = useState(valueKey);
  const [order, setOrder] = useState("asc");
  const [open, setOpen] = useState(true);

  // console.log(vizType);
  return (
    <Paper className={`viz-card ${open ? "expanded" : "collapsed"}`}>
      <div
        className={`viz-title-container ${open ? "expanded" : "collapsed"}`}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <span></span>
        <h4 className={`viz-title ${open ? "expanded" : "collapsed"}`}>
          {title}
        </h4>
        <span
          className="expand-collapse-container"
          title={`${open ? "Close" : "Open"}`}
        >
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </span>
      </div>
      {open && (
        <>
          {data.length > 0 ? (
            <>
              <Viz
                data={data}
                setData={setData}
                orderBy={orderBy}
                setOrderBy={setOrderBy}
                order={order}
                setOrder={setOrder}
                valueKey={valueKey}
                fieldKey={fieldKey}
                chartType={chartType}
                vizType={vizType}
              />
              <div className="viz-menu-container">
                <VizMenu
                  data={originalData}
                  fieldKey={fieldKey}
                  setData={setData}
                />
                <VizSwitch vizType={vizType} setVizType={setVizType} />
              </div>
            </>
          ) : (
            <p className="error">No data for selected dates</p>
          )}
        </>
      )}
    </Paper>
  );
}
