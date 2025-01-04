import React, { useState } from "react";
import { Box, Button, Typography, CircularProgress, Slider } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { PDFDocument, rgb } from "pdf-lib";
import { saveAs } from "file-saver";

const CompressPdf = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [compressionLevel, setCompressionLevel] = useState(50); // Default compression level (0 to 100)
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleCompressionChange = (event, value) => {
    setCompressionLevel(value);
  };

  const handleCompress = async () => {
    if (!selectedFile) {
      alert("Please upload a PDF file first.");
      return;
    }

    setIsLoading(true);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      // Loop through all pages and apply compression logic
      const pages = pdfDoc.getPages();
      for (const page of pages) {
        const { width, height } = page.getSize();
        const scaleFactor = compressionLevel / 100; // Scale content based on compression level

        page.scale(scaleFactor, scaleFactor); // Scale down the page
        page.drawRectangle({
          x: 0,
          y: 0,
          width: width * scaleFactor,
          height: height * scaleFactor,
          color: rgb(1, 1, 1),
          opacity: 0.5,
        });
      }

      // Serialize and save the compressed PDF
      const compressedPdfBytes = await pdfDoc.save();
      const blob = new Blob([compressedPdfBytes], { type: "application/pdf" });
      saveAs(blob, "compressed.pdf");
    } catch (error) {
      console.error("Error compressing PDF:", error);
      alert("Failed to compress PDF.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img
          src="src/assets/space2.jpg"
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
        Compress PDF Files
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
          <input type="file" accept="application/pdf" onChange={handleFileChange} hidden />
        </Button>

        {selectedFile && (
          <Typography>
            Selected File: {selectedFile.name}
          </Typography>
        )}

        <Typography sx={{ marginTop: 2 }}>Compression Level: {compressionLevel}%</Typography>
        <Slider
          value={compressionLevel}
          min={10}
          max={100}
          step={10}
          onChange={handleCompressionChange}
          sx={{ width: 200, color:'gold' }}
        />

        <Button
          onClick={handleCompress}
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
        >
          {isLoading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Compress PDF"}
        </Button>
      </Box>
    </Box>
    </>
  );
};

export default CompressPdf;
