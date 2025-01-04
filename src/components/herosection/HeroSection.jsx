import React, { useContext } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import { TypeAnimation } from 'react-type-animation';
import { ThemeContext } from "../theme/ThemeContext";

const HeroSection = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        Color: isDarkMode ? "white" : "black",
        overflow: 'hidden', // Fallback background color
      }}
    >
      <img
        src="src/assets/space1.jpg"
        alt="Background"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100%',
          height: '100%',
          // objectFit: 'cover',
          transform: 'translate(-50%, -50%)',
          zIndex: -1, // Ensure the image stays behind the text
        }}
      />
      {/* Text and Buttons */}
      <Box
        variant="contained"
        sx={{
          position: 'relative', // Position the content on top of the video
          zIndex: 1,
          color: isDarkMode ? "white" : "black",
          textAlign: 'center',
        }}
      >
        <TypeAnimation
          sx={{ color: isDarkMode ? "white" : "black" }}
          sequence={[
            // Same substring at the start will only be typed once, initially
            'Convertease, We handle your Pdfs',
            1000,
            'Convertease, We handle your Images',
            1000,
            'Convertease, We handle your Merges',
            1000,
            'Convertease, We handle your Split',
            1000,
          ]}
          speed={50}
          style={{ fontSize: '2em' }}
          repeat={Infinity}
        />
        <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
          Convert, Create, Repeat
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, marginTop: 3, justifyContent: 'center' }}>
          <Button variant="contained" sx={{ backgroundColor: 'red' }} component={Link} to="/arena">
            Begin
          </Button>
          {/* <Button variant="outlined" sx={{ color: 'white', borderColor: 'white' }}>
            See Demo
          </Button> */}
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;
