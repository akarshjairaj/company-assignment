import React, { useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';

export default function VizMenu({ data, fieldKey, setData }) {
  const [valuesSelected, setValuesSelected] = useState([]);
  // console.log(valuesSelected);

  const handleChange = (e, valuesSelected) => {
    setValuesSelected(valuesSelected)
  }

  const handleApply = () => {
    if (valuesSelected.length === 0) {
      setData(data)
    } else {
      setData(valuesSelected)
    }
    
  }
  return (
    <div className='filter-holder'>
      <Autocomplete
        multiple
        options={data}
        getOptionLabel={(option) => option[fieldKey]}
        // defaultValue={[[]]}
        onChange={handleChange}
        className='filter-input'
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Choose to filter..."
            placeholder="Brands"
          />
        )}
      />
      <Button variant="contained" onClick={handleApply}>Apply</Button>
    </div>
  );
}
