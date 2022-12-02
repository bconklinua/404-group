import * as React from 'react';
import {NavLink, useNavigate} from 'react-router-dom'
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
import AdbIcon from '@mui/icons-material/Adb';
import { getCurrentUser } from '../../api/User';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import SearchIcon from '@mui/icons-material/Search';

const ImprovedNavbar = () => {
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [image, setImage] = React.useState(<Avatar src={null} />);
    const [profile, setProfile] = React.useState(null);
    const [icon, setIcon] = React.useState(<Diversity3Icon sx={{ color: "white", display: { xs: 'none', md: 'flex' }, mr: 1 }} />);
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
    const handleProfile = () => {
      setAnchorElUser(null);
      console.log(profile)
      navigate('/profile', {state: profile})
    };
    const handleHome = () => {
      setAnchorElNav(null);
      setIcon(<Diversity3Icon sx={{ color: "grey", display: { xs: 'none', md: 'flex' }, mr: 1 }} />)
      navigate('/home')
    };
    const handlePost = () => {
      setAnchorElNav(null);
      navigate('/post')
    };
    const handleInbox = () => {
      setAnchorElNav(null);
      navigate('/inbox')
    };
    const handleSearch = () => {
      
      setAnchorElNav(null);
      navigate('/search')
    };
    React.useEffect(()=>{
      setImage(<Avatar src={null} />)
      getCurrentUser().then((response)=>{
        setProfile(response.data)

          console.log('setimage')
          setImage(<Avatar src={response.data.profile_image}/>)


        
        console.log("current user")
        console.log(response)
      })
    }, [])
    const handleSignOut =()=>{
      setAnchorElUser(null);
      localStorage.clear();
      window.location.href ="/login"
    }


    return (
      <AppBar position="static" style={{ background: '#1F1B24' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {icon}
            <NavLink to='/home' className="homeLink">
            <Typography
              variant="h6"
              noWrap
              component="a"

              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              True Friends
            </Typography>
            
            </NavLink>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
            </IconButton>
            <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
                display: { xs: 'block', md: 'none' },
            }}
            >
                {/* {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))} */}
                <MenuItem key='home' onClick={handleHome}>
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
                <MenuItem key='post' onClick={handlePost}>
                  <Typography textAlign="center">Post</Typography>
                </MenuItem>
                <MenuItem key='inbox' onClick={handleInbox}>
                  <Typography textAlign="center">Inbox</Typography>
                </MenuItem>
                <MenuItem key='search' onClick={handleSearch}>
                  <Typography textAlign="center">Explore</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Diversity3Icon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"

              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              True Friends
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <NavLink to='/post' className="link">
                    <Button key="post" onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>Post</Button>
                </NavLink>
                <NavLink to='/inbox' className="link">
                    <Button key="inbox" onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>Inbox</Button>
                </NavLink>
                <NavLink to='/Search' className="link">
                    <Button key="search" onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>Explore</Button>
                </NavLink>


              {/* {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))} */}
            </Box>
  
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {image}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
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

                  <MenuItem key='profile' onClick={handleProfile}>
                    <Typography textAlign="center">profile</Typography>
                  </MenuItem>
                  <MenuItem key='sign out' onClick={handleSignOut}>
                    <Typography color="red" textAlign="center">Sign Out</Typography>
                  </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
export default ImprovedNavbar;