import React, { useState, useEffect } from "react";
import { Box, Button, Typography, CircularProgress, Select, MenuItem } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { PDFDocument, degrees } from "pdf-lib";
import { saveAs } from "file-saver";

const RotatePdf = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(90);
  const [pageNumbers, setPageNumbers] = useState("all");
  const [totalPages, setTotalPages] = useState(0);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Determine total number of pages
    if (file) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const pageCount = pdfDoc.getPageCount();
        setTotalPages(pageCount);
      } catch (error) {
        console.error("Error reading PDF:", error);
        alert("Failed to read the PDF file.");
      }
    }
  };

  const handleRotate = async () => {
    if (!selectedFile) {
      alert("Please upload a PDF file first.");
      return;
    }

    setIsLoading(true);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      if (pageNumbers === "all") {
        // Rotate all pages
        const pageCount = pdfDoc.getPageCount();
        for (let i = 0; i < pageCount; i++) {
          const page = pdfDoc.getPage(i);
          page.setRotation(degrees(rotationAngle));
        }
      } else {
        // Rotate specific page
        const pageIndex = parseInt(pageNumbers) - 1;
        const page = pdfDoc.getPage(pageIndex);
        page.setRotation(degrees(rotationAngle));
      }

      // Save the rotated PDF
      const newPdfBytes = await pdfDoc.save();
      const blob = new Blob([newPdfBytes], { type: "application/pdf" });
      saveAs(blob, "rotated.pdf");
    } catch (error) {
      console.error("Error rotating PDF:", error);
      alert("Failed to rotate the PDF.");
    } finally {
      setIsLoading(false);
    }
  };

  // Generate page number options dynamically
  const generatePageOptions = () => {
    const options = [
      <MenuItem key="all" value="all">
        All Pages
      </MenuItem>
    ];

    // Add individual page options based on total pages
    for (let i = 1; i <= totalPages; i++) {
      options.push(
        <MenuItem key={i} value={i.toString()}>
          Page {i}
        </MenuItem>
      );
    }

    return options;
  };

  return (
    <>
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    ><img
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
      zIndex: -1,
    }}
  />
      <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: "bold" }}>
        Rotate PDF
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{
                appearance: 'none',
                backgroundColor: 'transparent',
                border: '2px solid #1A1A1A',
                borderRadius: '15px',
                boxSizing: 'border-box',
                color: '#3B3B3B',
                cursor: 'pointer',
                display: 'inline-block',
                fontSize: '16px',
                fontWeight: 600,
                lineHeight: 'normal',
                margin: 0,
                minHeight: '60px',
                outline: 'none',
                padding: '4px 24px',
                textAlign: 'center',
                textDecoration: 'none',
                transition: 'all 300ms cubic-bezier(.23, 1, 0.32, 1)',
                userSelect: 'none',
                touchAction: 'manipulation',
                willChange: 'transform',
                '&:hover': {
                  color: '#fff',
                  backgroundColor: '#1A1A1A',
                  boxShadow: 'rgba(0, 0, 0, 0.25) 0 8px 15px',
                  transform: 'translateY(-2px)',
                },
                '&:active': {
                  boxShadow: 'none',
                  transform: 'translateY(0)',
                },
                '&:disabled': {
                  pointerEvents: 'none',
                },
              }}>
          Upload PDF
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            hidden
          />
        </Button>

        {selectedFile && (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography>
              Selected File: {selectedFile.name}
            </Typography>
            <Typography variant="body2" color="white" marginTop={1}>
              Total Pages: {totalPages}
            </Typography>
          </Box>
        )}

        <Box sx={{ display: "flex", flexDirection: "row", gap: 2, alignItems: "center" }}>
          <Typography>Rotation Angle:</Typography>
          <Select
            value={rotationAngle}
            onChange={(e) => setRotationAngle(Number(e.target.value))}
          >
            <MenuItem value={90}>90°</MenuItem>
            <MenuItem value={180}>180°</MenuItem>
            <MenuItem value={270}>270°</MenuItem>
          </Select>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "row", gap: 2, alignItems: "center" }}>
          <Typography>Page to Rotate:</Typography>
          <Select
            value={pageNumbers}
            onChange={(e) => setPageNumbers(e.target.value)}
            disabled={!selectedFile}
          >
            {generatePageOptions()}
          </Select>
        </Box>

        <Button
          onClick={handleRotate}
          variant="contained"
          sx={{
            appearance: 'none',
            backgroundColor: '#fff', // White background
            border: '2px solid #1A1A1A', // Black border for contrast
            borderRadius: '15px',
            boxSizing: 'border-box',
            color: '#3B3B3B', // Dark text color
            cursor: 'pointer',
            display: 'inline-block',
            fontSize: '16px',
            fontWeight: 600,
            lineHeight: 'normal',
            marginTop: '10px', // Matches `marginTop: 2` (16px)
            minHeight: '40px',
            padding: '8px 24px', // Adjusted padding for a balanced look
            textAlign: 'center',
            textDecoration: 'none',
            transition: 'all 300ms cubic-bezier(.23, 1, 0.32, 1)',
            touchAction: 'manipulation',
            '&:hover': {
              color: '#fff', // Text turns white
              backgroundColor: '#1A1A1A', // Black background
              boxShadow: 'rgba(0, 0, 0, 0.25) 0 8px 15px', // Subtle shadow
              transform: 'translateY(-2px)',
            },
            '&:active': {
              boxShadow: 'none',
              transform: 'translateY(0)',
            },
            '&:disabled': {
              pointerEvents: 'none',
            },
          }}
          disabled={!selectedFile}
        >
          {isLoading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Rotate PDF"}
        </Button>
      </Box>
    </Box>
    </>
  );
};

export default RotatePdf;