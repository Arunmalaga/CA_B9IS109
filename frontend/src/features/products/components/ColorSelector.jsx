import React, { useState } from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const ColorSelector = ({ availableColors, selectedColor, onColorChange }) => {
  const handleColorChange = (event) => {
    onColorChange(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup
        row
        aria-label="color"
        name="color"
        value={selectedColor}
        onChange={handleColorChange}
      >
        {availableColors.map((color) => (
          <FormControlLabel
            key={color}
            value={color}
            control={<Radio style={{ color }} size='large'  />}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default ColorSelector;
