import React, { useState } from "react";
import { Box, Button, Typography, Checkbox, CircularProgress } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

const SplitPdfWithPreview = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pagePreviews, setPagePreviews] = useState([]);
  const [selectedPages, setSelectedPages] = useState([]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

        const previews = [];
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 0.5 });

          // Create a canvas to render the page
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({ canvasContext: context, viewport }).promise;
          previews.push(canvas.toDataURL());
        }
        setPagePreviews(previews);
      } catch (error) {
        console.error("Error loading PDF:", error);
        alert("Failed to load PDF. Please try a different file.");
      }
    }
  };

  const handlePageSelection = (pageIndex) => {
    setSelectedPages((prev) =>
      prev.includes(pageIndex)
        ? prev.filter((page) => page !== pageIndex)
        : [...prev, pageIndex]
    );
  };

  const handleSplit = async () => {
    if (!selectedFile) {
      alert("Please upload a PDF file first.");
      return;
    }

    if (selectedPages.length === 0) {
      alert("Please select at least one page to create a new PDF.");
      return;
    }

    setIsLoading(true);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      const newPdfDoc = await PDFDocument.create();

      for (const pageIndex of selectedPages) {
        const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [pageIndex]);
        newPdfDoc.addPage(copiedPage);
      }

      const newPdfBytes = await newPdfDoc.save();
      const blob = new Blob([newPdfBytes], { type: "application/pdf" });
      saveAs(blob, "split.pdf");
    } catch (error) {
      console.error("Error splitting PDF:", error);
      alert("Failed to split PDF.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
    <Box
            sx={{
              flex: "1",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 6,
              px: 4,
            }}
          >
      <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: "bold" }}>
        Split PDF
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}sx={{
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

        {pagePreviews.length > 0 && (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, marginTop: 2, justifyContent:"center" }}>
            {pagePreviews.map((src, index) => (
              <Box
                key={index}
                sx={{
                  border: "2px solid",
                  borderColor: selectedPages.includes(index) ? "blue" : "grey",
                  borderRadius: "4px",
                  padding: 1,
                  cursor: "pointer",
                  textAlign: "center",
                }}
                onClick={() => handlePageSelection(index)}
              >
                <img
                  src={src}
                  alt={`Page ${index + 1}`}
                  style={{ width: "90px", height: "140px", objectFit: "contain" }}
                />
                <Typography variant="caption">Page {index + 1}</Typography>
                <Checkbox
                  checked={selectedPages.includes(index)}
                  onChange={() => handlePageSelection(index)}
                  sx={{ marginLeft: 1 }}
                />
              </Box>
            ))}
          </Box>
        )}

        <Button
          onClick={handleSplit}
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
          {isLoading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Split PDF"}
        </Button>
      </Box>
    </Box>
    </div>
  );
};

export default SplitPdfWithPreview;