import React, { useContext } from "react";
import styled from "@mui/system/styled";
import Grid from "@mui/material/Grid"; // Adjust the import to use MUI's Grid component
import Box from "@mui/material/Box"; // Adjust the import to use MUI's Box component
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../components/theme/ThemeContext";

const Item = styled("div")(({ theme, isDarkMode }) => ({
  backgroundColor: isDarkMode ? "white" : "black",
  color: isDarkMode ? "black" : "white",
  border: "1px solid",
  borderColor: isDarkMode ? "black" : "#ced7e0",
  padding: theme.spacing(4),
  borderRadius: "8px",
  textAlign: "center",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  },
}));

export default function Arena() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div style={{ position: 'relative',
      height: '100vh',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      Color: isDarkMode ? "white" : "black",
      overflow: 'hidden', }}>
      <div>
        <img
          src="src/assets/space.jpg"
          alt="Background"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "100%",
            height: "100%",
            transform: "translate(-50%, -50%)",
            zIndex: -1,
          }}
        />
        <Box
          sx={{
            width: "100%",
            marginTop: "80px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid
            container
            rowSpacing={2} // Spacing between rows
            columnSpacing={2} // Spacing between columns
            sx={{
              maxWidth: "1200px", // Limit the width on larger screens
              padding: "16px",
            }}
          >
            {/* Responsive Grid Items */}
            <Grid item xs={12} sm={6} md={4}>
              <Item isDarkMode={isDarkMode}>
                <Typography
                  variant="body1"
                  component={Link}
                  to="/convert"
                  sx={{ color: isDarkMode ? "black" : "white", textDecoration: "none" }}
                >
                  JPG to PDF
                </Typography>
              </Item>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Item isDarkMode={isDarkMode}>
                <Typography
                  variant="body1"
                  component={Link}
                  to="/pdftoimg"
                  sx={{ color: isDarkMode ? "black" : "white", textDecoration: "none" }}
                >
                  PDF to JPG
                </Typography>
              </Item>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Item isDarkMode={isDarkMode}>
                <Typography
                  variant="body1"
                  component={Link}
                  to="/pdftoword"
                  sx={{ color: isDarkMode ? "black" : "white", textDecoration: "none" }}
                >
                  PDF to Word
                </Typography>
              </Item>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Item isDarkMode={isDarkMode}>
                <Typography
                  variant="body1"
                  component={Link}
                  to="/mergepdf"
                  sx={{ color: isDarkMode ? "black" : "white", textDecoration: "none" }}
                >
                  Merge PDF
                </Typography>
              </Item>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Item isDarkMode={isDarkMode}>
                <Typography
                  variant="body1"
                  component={Link}
                  to="/splitpdf"
                  sx={{ color: isDarkMode ? "black" : "white", textDecoration: "none" }}
                >
                  Split PDF
                </Typography>
              </Item>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Item isDarkMode={isDarkMode}>
                <Typography
                  variant="body1"
                  component={Link}
                  to="/compresspdf"
                  sx={{ color: isDarkMode ? "black" : "white", textDecoration: "none" }}
                >
                  Compress PDF
                </Typography>
              </Item>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Item isDarkMode={isDarkMode}>
                <Typography
                  variant="body1"
                  component={Link}
                  to="/rotatepdf"
                  sx={{ color: isDarkMode ? "black" : "white", textDecoration: "none" }}
                >
                  Rotate PDF
                </Typography>
              </Item>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Item isDarkMode={isDarkMode}>
                <Typography
                  variant="body1"
                  component={Link}
                  sx={{ color: isDarkMode ? "black" : "white", textDecoration: "none" }}
                >
                  Future
                </Typography>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}
