import React, { useContext } from "react";
import BasicWorldMap from "react-basic-world-map";
import { ThemeContext } from "../../components/theme/ThemeContext";
import { Box, Typography } from "@mui/material";

const About = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            padding: { xs: "20px", md: "50px" }, // Adjust padding for small and large screens
            backgroundColor: isDarkMode ? "white" : "black",
          }}
        >
          {/* Title */}
          <Typography
            variant="h4"
            sx={{
              marginTop: "35px",
              marginBottom: "20px",
              color: isDarkMode ? "black" : "white",
              textAlign: { xs: "center", md: "left" }, // Center on small screens
              fontWeight:"700"
            }}
          >
            About Us
          </Typography>

          {/* Mission Statement */}
          <Typography
            variant="body1"
            sx={{
              marginBottom: "20px",
              color: isDarkMode ? "black" : "white",
              textAlign: "justify", // Ensure proper readability
              fontSize: { xs: "0.9rem", md: "1.2rem" }, // Responsive font size
            }}
          >
            ⬤ At convertease, our mission is to empower users by providing a fast, easy, and reliable solution for converting images to PDF files. In an increasingly digital world, managing and sharing documents efficiently is essential for both personal and professional success. We strive to simplify this process, making it accessible to everyone, regardless of their technical expertise.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              marginBottom: "20px",
              color: isDarkMode ? "black" : "white",
              textAlign: "justify", // Ensure proper readability
              fontSize: { xs: "0.9rem", md: "1.2rem" }, // Responsive font size
            }}
          >
            ⬤ We believe that everyone should have access to powerful tools for document management. Our platform is designed to be accessible on multiple devices, including desktops, tablets, and smartphones, enabling users to convert images to PDF anytime, anywhere.
          </Typography>

          {/* Map Section */}
          <Box
            sx={{
              borderRadius: "8px",
              backgroundColor: isDarkMode ? "black" : "#c9eefc",
              padding: { xs: "20px", md: "50px" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <BasicWorldMap
              primaryColor={isDarkMode ? "darkblue" : "white"}
              secondaryColor={isDarkMode ? "white" : "red"}
              style={{
                width: "100%", // Ensure map scales properly
                maxWidth: "600px", // Limit the size of the map
              }}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default About;
