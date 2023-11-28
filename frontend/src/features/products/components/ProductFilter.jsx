import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import {Add} from '@mui/icons-material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getProductsByFiltersAsync } from '../ProductSlice';


export const ProductFilter=({title,value,handleFilter})=> {

  const handleOnChange=(e,section)=>{
    if(e.target.checked){
      handleFilter(e,section,e.target.value)
    }
  }

  return (
    <>
      <Accordion sx={{width:"100%",border:"none",boxShadow:"none",padding:".7rem 0rem"}}>

        <AccordionSummary sx={{paddingLeft:0,boxShadow:"none",border:"none"}} expandIcon={<Add sx={{color:"text.secondary"}}/>} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>{title}</Typography>
        </AccordionSummary>
        
        <AccordionDetails sx={{boxShadow:'none',border:'none'}}>
            {
              value.map((val)=>
              {
                return <FormControlLabel key={val.label} value={val.value} control={<Checkbox onChange={(e)=>{handleOnChange(e,val.section)}} />} label={val.label}/>
              })
            } 
        </AccordionDetails>

      </Accordion>
    </>
  );
}