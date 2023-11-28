import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton, MenuItem, Select, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersAsync, selectOrders, selectTotalOrders, updateOrderByIdAsync } from '../../order/OrderSlice';
import { ITEMS_PER_PAGE } from '../../../constants';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { PaginationComponent } from '../../common/Pagination';
import {ArrowUpward,ArrowDownward} from '@mui/icons-material'


export const AdminOrders=()=> {

  const [page,setPage]=useState(1)
  const [editableOrderId,setEditableOrderId]=useState(-1)

  const [sort,setSort]=useState({})
  const orders=useSelector(selectOrders)
  console.log(orders)
  const totalOrder=useSelector(selectTotalOrders)


  const dispatch=useDispatch()

  useEffect(()=>{
    const pagination={_page:page,_limit:ITEMS_PER_PAGE}
    dispatch(getAllOrdersAsync({sort,pagination}))
  },[dispatch,page,sort])

  const handleShow=()=>{
  }
  
  const handleEdit=(itemId)=>{
    setEditableOrderId(itemId)
  }


  const handleStatusUpdate=(order,newStatus)=>{
    const updatedOrder={...order,status:newStatus}

    dispatch(updateOrderByIdAsync(updatedOrder))
    setEditableOrderId(-1)
  }

  const handleSort=(sortOption)=>{
    const newSort={_sort:sortOption.sort,_order:sortOption.order}
    setSort(newSort)
  }

  return (
    <>

    { orders && totalOrder && <>
    <Stack sx={{width:"80rem",marginLeft:"auto",marginRight:"auto",mt:6}} component={Paper} elevation={4}>

    {/* table */}
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{cursor:"pointer"}} onClick={()=>handleSort({sort:"id",order:sort._order==='asc'?"desc":"asc"})} align='center'>Orders# {sort._order=='asc'?<ArrowDownward/>:<ArrowUpward/>}</TableCell>
            <TableCell align="center">Items</TableCell>
            <TableCell align="center">Total Amount</TableCell>
            <TableCell align="center">Shipping Address</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            > 
              {/* order id */}
              <TableCell align='center' component="th" scope="row">
                {order.id}
              </TableCell>

              {/* items */}
              <TableCell align="right">{
                order.item.map((item)=>(
                  <Stack justifyContent={"center"} alignItems={"center"} flexDirection={'row'} columnGap={1}>
                    <img style={{height:'50px',width:"50px",borderRadius:"50%"}} src={item.thumbnail} alt="" />
                    <Typography>{item.title} -#{item.quantity} #{item.price}</Typography>
                  </Stack>
                ))
              }</TableCell>


              <TableCell align="center">${order.totalAmount}</TableCell>
              <TableCell align="center">
                <Stack>
                  <Typography>{order.selectedAddress.name}</Typography>
                  <Typography>{order.selectedAddress.street}</Typography>
                  <Typography>{order.selectedAddress.state}</Typography>
                  <Typography>{order.selectedAddress.city}</Typography>
                  <Typography>{order.selectedAddress.postalCode}</Typography>
                  <Typography>{order.selectedAddress.phone}</Typography>
                </Stack>
              </TableCell>



                  <TableCell align="center">
                    {
                        editableOrderId===order.id?(
                           <Select value={order.status} fullWidth onChange={(e)=>handleStatusUpdate(order,e.target.value)}>
                    <MenuItem value={"pending"}>Pending</MenuItem>
                    <MenuItem value={"dispatched"}>Dispatched</MenuItem>
                    <MenuItem value={"delivered"}>Delivered</MenuItem>
                    <MenuItem value={"cancelled"}>Cancelled</MenuItem>
                  </Select>
                        ):(
                          <Typography>{order.status}</Typography>
                        )
                    }
                  </TableCell>
              

              <TableCell align="center">
                <Stack flexDirection={'row'} justifyContent={'center'} alignItems={'center'} columnGap={1}>

                  <IconButton onClick={handleShow}>
                    <VisibilityIcon sx={{color:'text.secondary',cursor:"pointer"}}/>
                  </IconButton>

                  <IconButton onClick={()=>handleEdit(order.id)}>
                    <CreateOutlinedIcon sx={{color:'text.secondary',cursor:"pointer"}}/>
                  </IconButton>

                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    
    
    </Stack>
    <PaginationComponent page={page} handlePage={(page)=>setPage(page)} totalItems={totalOrder}/>
    </>

                  }
    
    </>
  );
}
