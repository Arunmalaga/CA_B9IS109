import React, { useEffect } from 'react'
import {Stack,Button,Typography, useTheme, useMediaQuery} from '@mui/material'
import {Rating} from '@mui/lab'
// import { SizeSelector } from '../../../components/SizeSelector';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
// import { ColorSelection } from '../../../components/ColorSelection';
import { Navbar } from '../../navbar';
import ColorSelector from './ColorSelector';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductByIdAsync } from '../ProductSlice';
import { addToCartAsync } from '../../cart/CartSlice';
import { selectLoggedInUser } from '../../auth/authSlice';


export const ProductDetails = () => {

    const theme=useTheme()
    const is900=useMediaQuery(theme.breakpoints.down('900'))

    const params=useParams()
    const {id}=params;

    const dispatch=useDispatch()

    const product=useSelector((state)=>state.ProductSlice.selectedProduct)
    const loggedInUser=useSelector(selectLoggedInUser)


    console.log(product)

    const handleCart=(e)=>{
        const newItem={product:product._id,quantity:1,user:loggedInUser._id}
        dispatch(addToCartAsync(newItem))
        console.log(newItem)
    }

    useEffect(()=>{
        dispatch(getProductByIdAsync(id))
    },[])

    const [value, setValue] = React.useState(2);
  return (
    <>

    <Navbar/>
    {/* full screen stack */}
    <Stack bgcolor={'white'} width={'100vw'} flexWrap={"wrap"} justifyContent={'center'} alignItems={'center'} >

        {/*main parent stack */}
        <Stack width={'80%'} p={2} mt={5}>

            {/* image display of the product */}
            <Stack flexWrap={"wrap"}>
                {/* image container parent stack */}
                <Stack flexWrap={"wrap"} flexDirection={is900?"column":'row'} spacing={is900?0:2} justifyContent={'center'} alignItems={"center"}>
                        {/* first */}
                        <Stack flex={1}>
                            <img style={{width:"100%",height:"100%",objectFit:"contain"}} src={product?.images[0]} alt="" />
                        </Stack>
                        
                        {/* second */}
                        {
                            is900?(""):(

                        <Stack flex={1}  spacing={2} flexWrap={'wrap'}>

                                <Stack height={'250px'}>
                                    <img  style={{width:"100%",height:"100%",objectFit:"contain"}} src={product?.images[1]} alt="" />
                                </Stack>

                                <Stack height={'250px'} >
                                    <img  style={{width:"100%",height:"100%",objectFit:"contain"}} src={product?.images[2]} alt="" />
                                </Stack>


                        </Stack>
                            )
                        }

                        {/* third */}
                        <Stack  flex={1} height={'500px'} overflow={"hidden"}>

                        <img style={{width:"100%",height:"100%",objectFit:"contain"}} src={product?.images[3]} alt="" />
                            
                        </Stack>
                </Stack>




            </Stack>

            {/* production desc */}
            <Stack mt={5} bgcolor={'white'} flexDirection={'row'} flexWrap={"wrap"}>
                
                {/* left section */}
                <Stack spacing={4} flex={'.7'}>
                
                    {/* title and desc */}
                    <Stack spacing={2}>
                        <Typography variant='h4' fontWeight={'600'}>{product?.title}</Typography>
                        <Typography variant='body2' color={'text.secondary'} fontWeight={'600'}>{product?.brand}</Typography>
                        <Typography>
                                    {product?.description}
                        </Typography>
                    </Stack>

                    {/* highlights section */}
                    <Stack>

                        <Typography >Highlights</Typography>
                        <Typography component={'li'} mt={2} sx={{color:"text.secondary"}}>Hand cut and sewn locally</Typography>
                        <Typography component={'li'} sx={{color:"text.secondary"}}>Dyed with our proprietary colors</Typography>
                        <Typography component={'li'} sx={{color:"text.secondary"}}>Pre-washed & pre-shrunk</Typography>
                        <Typography component={'li'} sx={{color:"text.secondary"}}>Ultra-soft 100% cotton</Typography>

                    </Stack>

                    {/* details section */}
                    <Stack>

                        <Typography>Details</Typography>
                        <Typography mt={2}>
                                The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.
                        </Typography>
                    </Stack>
                
                </Stack>


                {/* right section */}
                <Stack p={2} spacing={4} flex={'.3'}>

                    <Typography variant='h5'>${product?.price}</Typography>

                    {/* rating stack */}
                    <Stack flexDirection={'row'}>
                        <Rating name="simple-controlled" value={value}onChange={(event, newValue) => {setValue(newValue);}}/>
                        <Typography>117 reviews</Typography>
                    </Stack>
                    
                    <Stack>
                        <Typography>Color</Typography>
                        <ColorSelector availableColors={['RED','ORANGE','GREEN']} selectedColor={['RED']} onColorChange={()=>{}} />
                    </Stack>
                    
                    <Stack justifySelf={'flex-start'} alignSelf={'flex-start'} width={'100%'}>
                        <Typography gutterBottom>Size</Typography>
                        {/* <SizeSelector/>  */}
                    </Stack>

                    <Button fullWidth onClick={handleCart} variant='contained'>Add to Cart</Button>



                        

                </Stack>



            </Stack>

        </Stack>

        

    </Stack>
    
    </>
  )
} 
