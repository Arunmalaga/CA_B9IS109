import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';


export const SortDropdown=({handleSort})=>{
    const dispatch=useDispatch()
    const [sortOption, setSortOption] = useState('');

    const sortOptions=[
        {name:"Best Rating",sort:"rating",order:"desc",current:false},
        {name:"Low Rating",sort:"rating",order:"asc",current:false},
        {name:"Price: Low to High",sort:"price",order:"asc",current:false},
        {name:"Price: High to Low",sort:"price",order:"desc",current:false}
    ]
    
  return (
    <FormControl sx={{width:"12rem"}}>
      <InputLabel  id="sort-label">Sort</InputLabel>
      <Select labelId="sort-label" id="sort-select" value={sortOption} onChange={(e)=>setSortOption(e.target.value)}>
        {
          sortOptions.map((option)=>(
            <MenuItem key={option.name} onClick={(e)=>handleSort(option)} value={option.name}>{option.name}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
}
