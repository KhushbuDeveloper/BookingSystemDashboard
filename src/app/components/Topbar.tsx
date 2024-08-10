import React from 'react';
import { Box, IconButton, MenuItem, Typography, Menu } from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
const settings = ['Profile', 'Logout'];
const Topbar = () => {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <Box display="flex" justifyContent="end" p={2}>

            {/* ICONS */}
            <Box display="flex">
                <IconButton onClick={handleOpenUserMenu}>
                    <PersonOutlinedIcon />
                </IconButton>
                <Menu
                    sx={{ mt: '35px' }}
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
                            <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        </Box>
    );
};

export default Topbar;