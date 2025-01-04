import React, { useState } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import * as pdfjsLib from "pdfjs-dist";

// Dynamically import the worker
import "pdfjs-dist/legacy/build/pdf.worker.entry";

const PdftoWord = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleConvert = async () => {
    if (!selectedFile) {
      alert("Please upload a PDF file first.");
      return;
    }

    setIsLoading(true);

    try {
      // Read the file as an ArrayBuffer
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      // Use pdfjs-dist to extract text
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;

      let extractedText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();

        // Extract text from content items
        const pageText = textContent.items.map((item) => item.str).join(" ");
        extractedText += `Page ${i}:\n${pageText}\n\n`;

        // Placeholder for image extraction
        // You can implement image extraction logic here
        // const operatorList = await page.getOperatorList();
        // Extract images from operatorList if needed
      }

      // Create a Word document using the extracted text
      const wordContent = `
        <!DOCTYPE html>
        <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
        <head>
          <meta charset="utf-8">
          <title>PDF to Word</title>
          <style>
            body { font-family: Arial, sans-serif; }
            h1 { color: #333; }
            pre { white-space: pre-wrap; }
          </style>
        </head>
        <body>
          <h1>Convertease</h1>
          ${extractedText.split('\n').map(line => `<p>${line}</p>`).join('')}
        </body>
        </html>
      `;

      // Save the Word file
      const blob = new Blob([wordContent], { type: "application/msword" });
      saveAs(blob, "converted.doc");
    } catch (error) {
      console.error("Error converting PDF to Word:", error);
      alert("Failed to convert PDF to Word document.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <img
        src="src/assets/space3.jpg"
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
        <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: "bold" }}>
          Convert PDF to Word
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, width: "200px" }}>
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
          }}  >
            Upload PDF
            <input type="file" accept="application/pdf" onChange={handleFileChange} hidden />
          </Button>

          {selectedFile && (
            <Typography>
              Selected File: {selectedFile.name}
            </Typography>
          )}

          <Button
            onClick={handleConvert}
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
            {isLoading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Convert to Word"}
          </Button>
        </Box>
      </Box>
    </div>
  )
};
export default PdftoWord;
