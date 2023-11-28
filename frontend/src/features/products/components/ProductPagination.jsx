import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Typography } from '@mui/material';
import { ITEMS_PER_PAGE } from '../../../constants';
import { useEffect } from 'react';

export const ProductPagination=({page,handlePagination,totalItems})=>{

  const paginationCount=Array.from({length:Math.ceil(totalItems/ITEMS_PER_PAGE)}).length

  return (

    <Stack spacing={2}>
      <Pagination page={page} onChange={(e,page)=>{handlePagination(page)}} count={paginationCount} renderItem={(item) => (<PaginationItem slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}{...item}/>)}/>

      <Typography>Showing from {(page-1)*ITEMS_PER_PAGE+1} to {page*ITEMS_PER_PAGE > totalItems ? totalItems: page * ITEMS_PER_PAGE} of {totalItems} results</Typography>
    </Stack>
  );
}