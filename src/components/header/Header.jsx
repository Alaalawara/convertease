import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import DarkModeToggle from "../darkmode/Darkmode";
import { ThemeContext } from "../theme/ThemeContext";

const Header = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      {/* AppBar for the header */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: isDarkMode ? "white" : "black",
          color: isDarkMode ? "black" : "white",
          boxShadow: "none",
          borderBottom: "1px solid black",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              component={Link}
              to="/"
              sx={{ padding: 0 }}
            >
              <img
                src="/src/assets/logo.png"
                alt="convertease"
                style={{ height: 40, marginRight: 10 }}
              />
            </IconButton>
          </Box>

          {/* Navigation Links for Desktop */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" }, // Hide on small screens
              gap: 2,
            }}
          >
            <Button
              color="inherit"
              sx={{ color: isDarkMode ? "black" : "white" }}
              component={Link}
              to="/arena"
            >
              Arena
            </Button>
            <Button
              color="inherit"
              sx={{ color: isDarkMode ? "black" : "white" }}
              component={Link}
              to="/about"
            >
              About Us
            </Button>
            {/* Dark Mode Toggle */}
            <Box>
              <DarkModeToggle />
            </Box>
          </Box>

          {/* Mobile Menu Icon */}
          <IconButton
            sx={{
              display: { xs: "block", md: "none" }, // Show only on small screens
              color: isDarkMode ? "black" : "white",
              justifyContent: "space-between"
            }}
            aria-label="menu"
            onClick={toggleDrawer(true)} // Opens the drawer
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile Navigation */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)} // Closes the drawer
      >
        <Box
          sx={{
            width: 250,
            backgroundColor: isDarkMode ? "white" : "black",
            height: "100%",
          }}
          role="presentation"
          onClick={toggleDrawer(false)} // Close drawer when clicking on items
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {/* Arena Link */}
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/arena">
                <ListItemText
                  primary="Arena"
                  sx={{ color: isDarkMode ? "black" : "white" }}
                />
              </ListItemButton>
            </ListItem>

            {/* About Us Link */}
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/about">
                <ListItemText
                  primary="About Us"
                  sx={{ color: isDarkMode ? "black" : "white" }}
                />
              </ListItemButton>
            </ListItem>

            {/* Dark Mode Toggle */}
            <ListItem disablePadding>
              <ListItemButton>
                <DarkModeToggle />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
