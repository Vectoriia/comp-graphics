import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectStyle(props) {
  return (
    <div>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">Style</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          onChange={props.changeHandler}
        >
          <MenuItem value={[]}>
            <em>none</em>
          </MenuItem>
          <MenuItem value={[10,10]}>small</MenuItem>
          <MenuItem value={[20,5]}>big</MenuItem>
          <MenuItem value={[15, 3, 3, 3]}>line/dot</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}