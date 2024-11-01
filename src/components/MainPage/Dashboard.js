import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import {
  Box,
  Toolbar,
  CssBaseline,
  Typography,
  IconButton,
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import { Brightness4, Brightness7, Menu } from '@mui/icons-material';
import { useEffect, useMemo, useState } from 'react';
import SideList from './SideList';
import logo from './logo.png'
import '../../CSS/main.css';

const drawerWidth = 280;

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

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);

  const darkTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: dark ? 'light' : 'dark',
        },
      }),
    [dark]
  );

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme')
    if(currentTheme !== '' && typeof currentTheme !== 'undefined'){
       currentTheme === 'dark' ? setDark(false) : setDark(true)
    }
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <Menu />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
            <img src= {logo} className='system_logo' alt=""/>
            <span className='company_title'>BestPurchases</span>
            </Typography>
            <IconButton onClick={() =>{
               setDark(!dark)
               localStorage.removeItem('theme')
               dark === true ? localStorage.setItem('theme', 'dark') : localStorage.setItem('theme', 'light')
               }
               }>
              {dark ? <Brightness4 /> : <Brightness7 />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <SideList {...{ open, setOpen }} />
      </Box>
    </ThemeProvider>
  );
}