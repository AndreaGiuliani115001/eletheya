import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar({ toggleSidebar }) {
    return (
        <AppBar
            position="fixed" // Fissa la navbar nella parte superiore
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1, // Garantisce che la navbar sia sopra la sidebar
            }}
        >
            <Toolbar>
                {/* Bottone per aprire la sidebar */}
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleSidebar}
                    sx={{ marginRight: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    Gestionale
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
