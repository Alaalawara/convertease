import React, { useState } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";

const MergePdf = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files); // Multiple file upload
    setSelectedFiles(files);
  };

  const handleMerge = async () => {
    if (selectedFiles.length < 2) {
      alert("Please upload at least two PDF files to merge.");
      return;
    }

    setIsLoading(true);

    try {
      // Create a new PDFDocument instance
      const mergedPdf = await PDFDocument.create();

      for (const file of selectedFiles) {
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);

        // Copy pages from the current PDF and add to mergedPdf
        const copiedPages = await mergedPdf.copyPages(
          pdfDoc,
          pdfDoc.getPageIndices()
        );

        copiedPages.forEach((page) => {
          mergedPdf.addPage(page);
        });
      }

      // Serialize the merged PDFDocument to bytes
      const mergedPdfBytes = await mergedPdf.save();

      // Download the merged PDF
      const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
      saveAs(blob, "merged.pdf");
    } catch (error) {
      console.error("Error merging PDF files:", error);
      alert("Failed to merge PDF files.");
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
        overflow: "hidden",
        flexDirection: "column",
      }}
    >
      <img
          src="src/assets/space.jpg"
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
        Merge PDF Files
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, width: "200px" }}>
      <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              sx={{
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
                width: '100%',
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
              }}
            >
          Upload PDFs
          <input
            type="file"
            accept="application/pdf"
            multiple
            onChange={handleFileChange}
            hidden
          />
        </Button>

        {selectedFiles.length > 0 && (
          <Typography>
            Selected Files: {selectedFiles.map((file) => file.name).join(", ")}
          </Typography>
        )}

        <Button
          onClick={handleMerge}
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
            width: '100%', // Matches original width
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
          {isLoading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Merge PDFs"}
        </Button>
      </Box>
    </Box>
    </>
  );
};

export default MergePdf;
