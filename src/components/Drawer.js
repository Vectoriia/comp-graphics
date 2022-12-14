import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/MenuRounded';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '../img/homeIcon.svg';
import FractalIcon from '../img/fractalIcon.svg';
import MainIcon from '../img/mainIcon.svg';
import ColorIcon from '../img/colorIcon.svg';
import AffineIcon from '../img/affineIcon.svg';
import InfoIcon from '../img/infoIcon.svg';
import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../index.css';
const drawerWidth = 270;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const themeItem = createTheme({
  overrides: {
    MuiListItem: {
      root: {
        "&$selected": {
          backgroundColor: "red",
          "&:hover": {
            backgroundColor: "orange",
          },
        },
      },
      button: {
        "&:hover": {
          backgroundColor: "yellow",
        },
      },
    },
  },
});

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [whichPage, setWhichPage] = useState([false, false, false, false, true]);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const changePage = (index) => {
    const arr = [];
    for(let i=0;i<5;i++){
      if(i===index){
        arr.push(true)
      }else{
        arr.push(false)
      }
    } 
    setWhichPage([arr]);
};
const selecteditemstyle = {
  backgroundColor: '#2BD5A5'
 }
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx = {{backgroundColor: '#1F1F1F'}}>
        <Toolbar sx={{justifyContent: 'space-between'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              width: 50,
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon sx={{ fontSize: "45px" }} />
          </IconButton>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Typography variant="h6" noWrap component="div" sx={{marginRight: '20px'}}>
              ????????'???????????? ??????????????
            </Typography>
            <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {<img src = {MainIcon} style={{width: "80%"}} draggable = {false}/> }
                </ListItemIcon>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer 
        variant="permanent"  
        open={open}   
        PaperProps={{
          sx: {
            color: 'white',
            backgroundColor: 'black',
            justifyContent: 'space-between'
          }
      }}>
        <div>
        <DrawerHeader sx = {{backgroundColor: 'black'}}>
          <IconButton onClick={handleDrawerClose} sx = {{color: 'white'}}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <List>
        <ListItem  key={'????????????????'} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  borderRadius: '33px',
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }} 
                draggable = {false}
                component={Link} to = '/fractals'
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {<img src = {FractalIcon} draggable = {false}/> }
                </ListItemIcon>
                <ListItemText primary={'????????????????'} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem  key={'?????????????? ??????????'} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  borderRadius: '33px',
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }} 
                draggable = {false}
                component={Link} to = '/colorings'
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {<img src = {ColorIcon} draggable = {false}/>}
                </ListItemIcon>
                <ListItemText primary={'?????????????? ??????????'} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem  key={'???????????? ????????????????????'} disablePadding 
              sx={{ 
                display: 'block', 
                }}
                selecteditemstyle={selecteditemstyle}>
              <ListItemButton
                sx={{
                  borderRadius: '33px',
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                draggable = {false} 
                component={Link} to = '/affinity'
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {<img src = {AffineIcon} draggable = {false}/> }
                </ListItemIcon>
                <ListItemText primary={'???????????? ????????????????????'} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem  key={'????????????????????'} disablePadding sx={{ display: 'block' }} >
              <ListItemButton
                sx={{
                  borderRadius: '33px',
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }} component={Link} to = '/info'
                draggable = {false}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {<img src = {InfoIcon} draggable = {false}/> }
                </ListItemIcon>
                <ListItemText primary={'????????????????????'} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
        </List>
        </div>
        <List >
            <ListItem  key={'??????????????'} disablePadding sx={{ display: 'block', }}  selected className="MenuItem">
              <ListItemButton
                sx={{
                  borderRadius: '33px',
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }} component={Link} to = '/home'
                draggable = {false}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {<img src = {HomeIcon} draggable = {false}/>}
                </ListItemIcon>
                <ListItemText primary={'??????????????'} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
        </List>
      </Drawer>
      
    </Box>
  );
}