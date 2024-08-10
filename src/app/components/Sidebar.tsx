// components/Sidebar.tsx
import { useState } from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import TableRestaurantOutlinedIcon from '@mui/icons-material/TableRestaurantOutlined';
import { tokens } from '@/theme'; // Import your tokens function if defined


// Define the props interface for the Sidebar component

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
interface DrawerHeaderProps {
  open: boolean;
}
const DrawerHeader = styled('div')<DrawerHeaderProps>(({ theme,open }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: open?'space-between':'right',
  paddingLeft: theme.spacing(3.5),
  paddingRight:theme.spacing(1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => {
    const colors = tokens(theme.palette.mode);
    return {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      backgroundColor: colors.primary[400],
      color: '#868dfb',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': {
          ...openedMixin(theme),
          backgroundColor: colors.primary[400],
        },
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': {
          ...closedMixin(theme),
          backgroundColor: colors.primary[400],
        },
      }),
    };
  },
);

const Sidebar = () => {
  const colors = tokens('dark');
  const [open, setOpen] = useState(true);
  const handleDrawerClose = () => {
    setOpen(!open);
  };

  return (
    <>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader open={open}>
          <Typography variant="h4"
            color={colors.grey[100]}
            fontWeight="bold" noWrap>
            SmartBooking
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {open ? <MenuOutlinedIcon /> : <MenuOpenOutlinedIcon />}
          </IconButton>
        </DrawerHeader>
        <List>
          {['Home', 'Capacity Control', 'Guest Book'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 3.5,
                  color: colors.grey[100],
                  '&:hover': {
                    color: '#868dfb', // Text color on hover
                    '& .MuiListItemIcon-root': {
                      color: '#868dfb', // Icon color on hover
                    },
                  },
                  '&.Mui-selected': {
                    color: '#6870fa', // Text color when selected
                    '& .MuiListItemIcon-root': {
                      color: '#6870fa', // Icon color when selected
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 1 : 'auto',
                    justifyContent: 'center',
                    color: colors.grey[100],
                  }}
                >
                  {text === 'Home' && <HomeOutlinedIcon />}
                  {text === 'Capacity Control' && <TableRestaurantOutlinedIcon />}
                  {text === 'Guest Book' && <ContactPageOutlinedIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};


export default Sidebar;
