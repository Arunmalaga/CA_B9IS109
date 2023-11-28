import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { ITEMS_PER_PAGE } from '../../constants'
import {ArrowBack,ArrowForward} from '@mui/icons-material'
import { PaginationItem, Typography } from '@mui/material';


export const PaginationComponent = ({page,setPage,handlePage,totalItems}) => {

    const totalPages=Math.ceil(totalItems/ITEMS_PER_PAGE)

  return (
    <Stack spacing={2}>
    <Pagination page={page} onChange={(e,page)=>{handlePage(page)}} count={totalPages} renderItem={(item) => (<PaginationItem slots={{ previous: ArrowBack, next: ArrowForward }}{...item}/>)}/>

    <Typography>Showing from {(page-1)*ITEMS_PER_PAGE+1} to {page*ITEMS_PER_PAGE > totalItems ? totalItems: page * ITEMS_PER_PAGE} of {totalItems} results</Typography>
  </Stack>
  )
}
