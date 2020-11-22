import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default function VizSwitch({ vizType, setVizType }) {
  const handleChange = (event) => {
    setVizType(event.target.value);
  };

  return (
    <div>
      <RadioGroup
        aria-label="viz-type"
        name="viz-type"
        value={vizType}
        onChange={handleChange}
        className="radio-button-container"
      >
        <FormControlLabel
          value="table"
          control={<Radio color="primary" />}
          label="Table"
        />
        <FormControlLabel
          value="chart"
          control={<Radio color="primary" />}
          label="Chart"
        />
      </RadioGroup>
    </div>
  );
}
