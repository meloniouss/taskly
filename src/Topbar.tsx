import * as React from 'react';
import {useState, useRef} from 'react';
import {MenuProps, useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import {Menu, MenuItem} from '@mui/material'
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import ArrowDropUp from '@mui/icons-material/ArrowDropUp';
import { borders, textAlign, textTransform, width } from '@mui/system';
import { styled, alpha } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Navigate, redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';


const LoginButton = ({ onLogin, onLogout}: {onLogin: () => void; onLogout: () => void;}) => {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <div>
      {Cookies.get('sessionToken') ? (
        <Button color="inherit" size="large" onClick={onLogout} sx={{ textTransform: 'none' }}>
          Log out
        </Button>
      ) : (
        <Button color="inherit" size="large" onClick={onLogin} sx={{ textTransform: 'none' }}>
          Log in
        </Button>
      )}
    </div>
  );
};

const handleLogout = async () => {
  try {
    await fetch('https://studyplanner-production.up.railway.app/logout', {
      method: 'POST', 
      credentials: 'include', 
      redirect: 'manual' // DO NOT REMOVE THIS REDIRECT, IT WILL NOT WORK WITHOUT THE REDIRECT
    });

    //Cookies.remove('sessionToken');
    //window.location.reload(); 

  } catch (error) {
    console.error('ERROR INITIATING LOGOUT', error);
  }
};



const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 0,
    color: 'rgb(55, 65, 81)',
    '& .MuiMenu-list': {
      padding: '0.0px 0',
      width: '180px'
    },
    '& .MuiMenuItem-root': {
      display: 'flex',  // Ensure the item is a flex container
      justifyContent: 'center', // Center the content horizontally
      textAlign: 'center', // Center text
      width: '100%', // Ensure the item takes full width
      '& .MuiSvgIcon-root': {
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
      '&:hover': { backgroundColor: '#3da58a' },
    },
    ...theme.applyStyles('dark', {
      color: theme.palette.grey[300],
    }),
  },
}));


export default function Topbar() {
  const [anchorElProduct, setAnchorElProduct] = useState<null | HTMLElement>(null);
  const [anchorElTeams, setAnchorElTeams] = useState<null | HTMLElement>(null);
  const [anchorElIndividuals, setAnchorElIndividuals] = useState<null | HTMLElement>(null);
  const [isLoggedIn, setLogInStatus] = useState(false);
  const [isHoveredProduct, setIsHoveredProduct] = useState(false);
  const [isHoveredTeams, setIsHoveredTeams] = useState(false);
  const [isHoveredIndividuals, setIsHoveredIndividuals] = useState(false);

  const handleProductMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorElProduct(event.currentTarget);
    setIsHoveredProduct(true);
  };

  const handleProductMouseLeave = () => {
    setAnchorElProduct(null);
    setIsHoveredProduct(false);
  };

  const handleTeamsMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorElTeams(event.currentTarget);
    setIsHoveredTeams(true);
  };

  const handleTeamsMouseLeave = () => {
    setAnchorElTeams(null);
    setIsHoveredTeams(false);
  };

  const handleIndividualsMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorElIndividuals(event.currentTarget);
    setIsHoveredIndividuals(true);
  };

  const handleIndividualsMouseLeave = () => {
    setAnchorElIndividuals(null);
    setIsHoveredIndividuals(false);
  };

  const handleOAuthLogIn = async () => {
    try { 
      window.location.href = 'https://studyplanner-production.up.railway.app/auth/oauth';
    } catch (error) {
        console.error('ERROR INITIATING LOG-IN', error);
    }
};

  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <EventAvailableIcon fontSize='large' sx={{ marginRight: 1 }} />
        <Typography variant="h2" color='secondary' fontWeight='bold' component="div" sx={{ flexGrow: 0.02 }}>
          Taskly
        </Typography>

        {/* Product Button */}
        <div onMouseEnter={handleProductMouseEnter} onMouseLeave={handleProductMouseLeave}>
          <Button
            sx={{
              fontSize: '1rem',
              height: '100%',
              paddingTop: '12px',
              textTransform: 'none',
              color: 'white',
              width: '180px',
              borderRadius: '0px',
            }}
            endIcon={isHoveredProduct ? <ArrowDropUp /> : <ArrowDropDown />}
          >
            Product
          </Button>

          <StyledMenu
            autoFocus={false}
            anchorEl={anchorElProduct}
            open={Boolean(anchorElProduct)}
            onClose={handleProductMouseLeave}
          >
            <MenuItem sx={{ backgroundColor: '#253248', '&:hover': { backgroundColor: '#3da58a' } }}>Calendar</MenuItem>
            <MenuItem sx={{ backgroundColor: '#253248', '&:hover': { backgroundColor: '#3da58a' } }}>Assignments</MenuItem>
            <MenuItem sx={{ backgroundColor: '#253248', '&:hover': { backgroundColor: '#3da58a' } }}>Kanban Board</MenuItem>
          </StyledMenu>
        </div>

        {/* Teams Button */}
        <div onMouseEnter={handleTeamsMouseEnter} onMouseLeave={handleTeamsMouseLeave}>
          <Button
            sx={{
              fontSize: '1rem',
              height: '100%',
              paddingTop: '12px',
              textTransform: 'none',
              color: 'white',
              width: '180px',
              borderRadius: '0px',
            }}
            endIcon={isHoveredTeams ? <ArrowDropUp /> : <ArrowDropDown />}
          >
            Teams
          </Button>
          <StyledMenu
            autoFocus={false}
            anchorEl={anchorElTeams}
            open={Boolean(anchorElTeams)}
            onClose={handleTeamsMouseLeave}
          >
            <MenuItem sx={{ backgroundColor: '#253248', '&:hover': { backgroundColor: '#3da58a' } }}>Product</MenuItem>
            <MenuItem sx={{ backgroundColor: '#253248', '&:hover': { backgroundColor: '#3da58a' } }}>Design</MenuItem>
            <MenuItem sx={{ backgroundColor: '#253248', '&:hover': { backgroundColor: '#3da58a' } }}>Startups</MenuItem>
            <MenuItem sx={{ backgroundColor: '#253248', '&:hover': { backgroundColor: '#3da58a' } }}>Marketing</MenuItem>
            <MenuItem sx={{ backgroundColor: '#253248', '&:hover': { backgroundColor: '#3da58a' } }}>IT</MenuItem>
          </StyledMenu>
        </div>

        {/* Individuals Button */}
        <div onMouseEnter={handleIndividualsMouseEnter} onMouseLeave={handleIndividualsMouseLeave}>
          <Button
            sx={{
              fontSize: '1rem',
              height: '100%',
              paddingTop: '12px',
              textTransform: 'none',
              color: 'white',
              width: '180px',
              borderRadius: '0px',
            }}
            endIcon={isHoveredIndividuals ? <ArrowDropUp /> : <ArrowDropDown />}
          >
            Individuals
          </Button>
          <StyledMenu
            autoFocus={false}
            anchorEl={anchorElIndividuals}
            open={Boolean(anchorElIndividuals)}
            onClose={handleIndividualsMouseLeave}
          >
            <MenuItem sx={{ backgroundColor: '#253248', '&:hover': { backgroundColor: '#3da58a' } }}>Personal</MenuItem>
            <MenuItem sx={{ backgroundColor: '#253248', '&:hover': { backgroundColor: '#3da58a' } }}>Students</MenuItem>
            <MenuItem sx={{ backgroundColor: '#253248', '&:hover': { backgroundColor: '#3da58a' } }}>Teachers</MenuItem>
            <MenuItem sx={{ backgroundColor: '#253248', '&:hover': { backgroundColor: '#3da58a' } }}>Creators</MenuItem>
          </StyledMenu>
        </div>

        <Box sx={{ flexGrow: 1 }} />
        <LoginButton 
          onLogin={() => handleOAuthLogIn()}
          onLogout={() => handleLogout()}
        />
        <Typography variant='h4' sx={{ flexGrow: 0.005 }}>|</Typography>
        <Button
          color='primary'
          size='medium'
          sx={{
            textTransform: 'none',
            backgroundColor: (theme) => theme.palette.secondary.main,
            '&:hover': { backgroundColor: '#3da58a' }
          }}
          href="https://studyplanner-production.up.railway.app:9000/auth/oauth"
        >
          Sign up for free
        </Button>
      </Toolbar>
    </AppBar>
  </Box>
);

}
