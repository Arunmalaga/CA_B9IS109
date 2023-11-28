import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import GradeTwoToneIcon from '@mui/icons-material/GradeTwoTone';

export const ProductCard = ({product}) => {


  const theme=useTheme()
  const is900=useMediaQuery(theme.breakpoints.down("900"))

  return (
    <Stack m={is900?0:2} p={is900?1:2} border={'1px solid rgba(0,0,0,0.2)'} justifyContent={'space-between'} width={280}  height={400} position={'relative'}  component={Link} to={`/product-details/${product._id}`} sx={{color:"black",textDecoration:'none'}}>

        

        {/* image section */}
        <Box flex={0.8}>
          <img style={{width:"100%",height:"100%",objectFit: 'contain'}} src={product?.thumbnail} alt=""/>
        </Box>

        {/* details section */}
        <Stack width={"100%"} bottom={0} left={0} justifyContent={'space-between'} flexDirection={'row'} mb={2}>
          <Stack>
            <Typography variant='h6' fontWeight={500} gutterBottom>{product?.title}</Typography>

            <Stack flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'}>
                <GradeTwoToneIcon/>
                <Typography variant='body1' color='text.secondary'>{product?.rating}</Typography>

            </Stack>
          </Stack>
          <Stack justifyContent={'space-around'}>
            <Typography  color={'text.secondary'} variant='body1'>{Math.round(product?.price*(1-product?.discountPercentage/100))} $</Typography>
            <Typography sx={{textDecoration:"line-through"}} variant='body1'>{product?.price} $</Typography>
          </Stack>
        </Stack>


    </Stack>
  );
};
