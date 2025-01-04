import React, { useContext } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ThemeContext } from "../theme/ThemeContext";

const Footer = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        backgroundColor: isDarkMode ? "white" : "black",
        color: isDarkMode ? "black" : "white",
        width: "100%",
        padding: 0, // Vertical padding
        borderTop: "1px solid black",
        textAlign: "center", // Center content for smaller screens
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          maxWidth: "1200px",
          margin: "0 auto",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: { xs: "column", md: "row" }, // Stack content on small screens
        }}
      >
        {/* Logo and Tagline */}
        <Grid item xs={12} md={6} sx={{ marginBottom: { xs: 2, md: 0 } }}>
          <Typography
            variant="h6"
            sx={{
              marginBottom: "5px",
              color: isDarkMode ? "black" : "red",
            }}
          >
            Convertease
          </Typography>
          <Typography variant="body2">Since 2024</Typography>
        </Grid>

        {/* Mission Link */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="body2"
            component={Link}
            to="/about"
            sx={{
              color: isDarkMode ? "black" : "white",
              textDecoration: "none", // Remove underline
            }}
          >
            Learn more about our mission and values
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
