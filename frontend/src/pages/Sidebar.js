import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240; // Larghezza della Sidebar

function Sidebar({ isOpen, toggleSidebar }) {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
        toggleSidebar();
    };

    return (
        <Drawer
            anchor="left"
            open={isOpen}
            onClose={toggleSidebar}
            variant="persistent" // Rende la sidebar persistente (opzionale)
            sx={{
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: '#1976d2', // Cambia colore di sfondo
                    color: '#fff',
                },
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    <ListItem button onClick={() => handleNavigation('/')}>
                        <ListItemIcon>
                            <HomeIcon style={{ color: '#fff' }} />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button onClick={() => handleNavigation('/add-product')}>
                        <ListItemIcon>
                            <AddBoxIcon style={{ color: '#fff' }} />
                        </ListItemIcon>
                        <ListItemText primary="Aggiungi Prodotto" />
                    </ListItem>
                    <ListItem button onClick={() => handleNavigation('/logout')}>
                        <ListItemIcon>
                            <ExitToAppIcon style={{ color: '#fff' }} />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
}

export default Sidebar;
