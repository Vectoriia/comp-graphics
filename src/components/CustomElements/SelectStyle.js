import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectStyle() {
  const [style, setStyle] = React.useState('');

  const handleChange = (event) => {
    setStyle(event.target.value);
  };

  return (
    <div>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">Style</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={style}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>--------------</MenuItem>
          <MenuItem value={2}>— — — —</MenuItem>
          <MenuItem value={3}>_________</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}