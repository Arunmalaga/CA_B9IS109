import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Badge } from '@mui/material';
import { Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../cart/CartSlice';
import { selectUserInfo } from '../../user/UserSlice';
import { Home } from '@mui/icons-material';

const pages = [];

const settings=[
{name:"Home",link:'/'},
{name:'Profile',link:'/profile'},
{name:'My Orders',link:'/orders'},
{name:"Logout",link:"/logout"}
]


export const Navbar=()=> {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const cartItems=useSelector(selectCartItems)
  const user=useSelector(selectUserInfo)
  console.log(user)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
    
    {
      user && 
    

    <AppBar position="sticky" sx={{bgcolor:'white'}}>
      <Container>
        <Toolbar disableGutters sx={{display:"flex",justifyContent:"space-between"}}>

          <Box component={'a'} href='/'>
            <IconButton>
              <Home/>
            </IconButton>
          </Box>


          <Box sx={{ flexGrow: 0 ,flexDirection:"row",display:"flex",justifyContent:"center"}}>
            <Tooltip title="Open settings" sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" />
              </IconButton>
            </Tooltip>
              
              {
                user?.role!=='admin'?(
                cartItems.length && <Badge badgeContent={cartItems.length} color='primary' sx={{ml:3,cursor:"pointer",transition:".2s",'&:hover':{opacity:'.9'}}}>
                <IconButton component={Link} to={"/cart"}>
                  <ShoppingCartOutlinedIcon sx={{color:"black",textDecoration:'none'}}/>

                </IconButton>
              </Badge>
                ):(null)

              }
              
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography component={Link} sx={{textDecoration:"none",color:"text.primary"}} to={`${setting.link}`} textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
            {
            user.role==='admin'?(
              <>
              <Button  component={Link} to={"/admin"} variant='contained' sx={{ my: 2, color: 'white', display: 'block' ,ml:2}}>Admin</Button>
              </>
            ):('')
            }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    }
    </>
  );
};
