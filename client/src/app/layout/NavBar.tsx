import { Group, Menu as MenuIcon } from "@mui/icons-material";
import { AppBar, Toolbar, Typography, Container, IconButton, Drawer, Box, List, ListItem, ListItemButton, ListItemText, Divider, Avatar, CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import { NavLink, useNavigate } from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink";
import { useStore } from "../../lib/hooks/useStore";
import { Observer } from "mobx-react-lite";
import { useAccount } from "../../lib/hooks/useAccount";
import UserMenu from "./UserMenu";
import { useState } from "react";

export default function NavBar() {
    const { uiStore } = useStore();
    const { currentUser, logoutUser } = useAccount();
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = () => {
        navigate('/login');
        setMobileOpen(false); // Close Drawer after logout
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box>
                <Typography variant="h6" sx={{ my: 2 }}>
                    Reactivities
                </Typography>

                {currentUser && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                        <Avatar
                            src={currentUser.imageUrl || undefined}
                            alt={currentUser.displayName}
                            sx={{ width: 56, height: 56, mb: 1 }}
                        />
                        <Typography variant="subtitle1" fontWeight="bold">
                            {currentUser.displayName}
                        </Typography>
                    </Box>
                )}

                <Divider sx={{ my: 2 }} />

                <List>
                    <ListItem disablePadding>
                        <ListItemButton component={NavLink} to="/activities">
                            <ListItemText primary="Activities" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={NavLink} to="/counter">
                            <ListItemText primary="Counter" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={NavLink} to="/errors">
                            <ListItemText primary="Errors" />
                        </ListItemButton>
                    </ListItem>

                    {currentUser ? (
                        <>
                            <Divider sx={{ my: 2 }} />
                            <ListItem disablePadding>
                                <ListItemButton component={NavLink} to={`/profiles/${currentUser?.id}`}>
                                    <ListItemText primary="Profile" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton component={NavLink} to='/createActivity'>
                                    <ListItemText primary="Create Activity" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => {
                                    logoutUser.mutateAsync();
                                    handleLogout();
                                }}>
                                    <ListItemText primary="Logout" />
                                </ListItemButton>
                            </ListItem>
                        </>
                    ) : (
                        <>
                            <Divider sx={{ my: 2 }} />
                            <ListItem disablePadding>
                                <ListItemButton component={NavLink} to="/login">
                                    <ListItemText primary="Login" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton component={NavLink} to="/register">
                                    <ListItemText primary="Register" />
                                </ListItemButton>
                            </ListItem>
                        </>
                    )}
                </List>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed"
                sx={{
                    backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)'
                }}>
                <Container maxWidth="xl">
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        {/* Hamburger + Logo */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{ mr: 2, display: { md: 'none' } }}
                            >
                                <MenuIcon />
                            </IconButton>

                            <MenuItemLink to="/">
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Group fontSize="large" />
                                    <Typography
                                        variant="h5"
                                        fontWeight="bold"
                                        sx={{
                                            display: { xs: 'none', md: 'block' },
                                            position: 'relative'
                                        }}
                                    >
                                        Reactivities
                                        <Observer>
                                            {() => uiStore.isLoading ? (
                                                <CircularProgress
                                                    size={20}
                                                    thickness={7}
                                                    sx={{
                                                        color: 'white',
                                                        position: 'absolute',
                                                        top: '30%',
                                                        left: '110%'
                                                    }}
                                                />
                                            ) : null}
                                        </Observer>
                                    </Typography>
                                </Box>
                            </MenuItemLink>
                            {isMobile && !mobileOpen && (
                                <Typography variant="h6" fontWeight="bold">
                                    Reactivities
                                </Typography>
                            )}

                        </Box>

                        {/* Desktop Menu */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <MenuItemLink to="/activities">Activities</MenuItemLink>
                            <MenuItemLink to="/counter">Counter</MenuItemLink>
                            <MenuItemLink to="/errors">Errors</MenuItemLink>
                        </Box>

                        {/* Desktop User */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                            {currentUser ? (
                                <UserMenu />
                            ) : (
                                <>
                                    <MenuItemLink to="/login">Login</MenuItemLink>
                                    <MenuItemLink to="/register">Register</MenuItemLink>
                                </>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Mobile Drawer */}
            <Box component="nav">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}
