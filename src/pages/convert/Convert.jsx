import React, { useState, useContext } from 'react';
import { Box, Button, Typography, IconButton, RadioGroup, FormControlLabel, Radio, Checkbox } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';
import { PDFDocument } from 'pdf-lib'; // Import the PDF-lib library
import { ThemeContext } from '../../components/theme/ThemeContext';

const Convert = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [pdfUrl, setPdfUrl] = useState(null); // URL for the generated PDF
  const [isConverting, setIsConverting] = useState(false);

  // Options states
  const [pageOrientation, setPageOrientation] = useState('Portrait');
  const [pageSize, setPageSize] = useState('Same as Image');
  const [compressImages, setCompressImages] = useState(false);

  // Handle file selection
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  // Move image up in the list
  const moveUp = (index) => {
    if (index === 0) return; // Cannot move the first image up
    const updatedFiles = [...selectedFiles];
    [updatedFiles[index - 1], updatedFiles[index]] = [updatedFiles[index], updatedFiles[index - 1]];
    setSelectedFiles(updatedFiles);
  };
  // Move image down in the list
  const moveDown = (index) => {
    if (index === selectedFiles.length - 1) return; // Cannot move the last image down
    const updatedFiles = [...selectedFiles];
    [updatedFiles[index], updatedFiles[index + 1]] = [updatedFiles[index + 1], updatedFiles[index]];
    setSelectedFiles(updatedFiles);
  };
  // Delete an image from the list
  const deleteFile = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
  };
  // Convert selected images to PDF
  const handleConvertToPdf = async () => {
    if (selectedFiles.length === 0) {
      alert('Please upload at least one image.');
      return;
    }
    setIsConverting(true);

    try {
      // Create a new PDF Document
      const pdfDoc = await PDFDocument.create();

      for (const file of selectedFiles) {
        // Read the image file as an ArrayBuffer
        const fileArrayBuffer = await file.arrayBuffer();
        const fileType = file.type;

        // Embed the image into the PDF
        let embeddedImage;
        let imageDims;
        if (fileType === 'image/jpeg') {
          embeddedImage = await pdfDoc.embedJpg(fileArrayBuffer);
        } else if (fileType === 'image/png') {
          embeddedImage = await pdfDoc.embedPng(fileArrayBuffer);
        } else {
          alert('Unsupported file type. Only JPG and PNG are allowed.');
          return;
        }

        // Handle page dimensions
        let pageWidth = imageDims?.width || 595.28; // Default A4 width
        let pageHeight = imageDims?.height || 841.89; // Default A4 height

        if (pageSize === 'A4') {
          pageWidth = 595.28; // A4 width in points
          pageHeight = 841.89; // A4 height in points
        } else if (pageSize === 'US Letter') {
          pageWidth = 612; // US Letter width in points
          pageHeight = 792; // US Letter height in points
        }

        // Swap width and height if landscape is selected
        if (pageOrientation === 'Landscape') {
          [pageWidth, pageHeight] = [pageHeight, pageWidth];
        }

        const page = pdfDoc.addPage([pageWidth, pageHeight]);
        page.drawImage(embeddedImage, {
          x: 0,
          y: 0,
          width: pageWidth,
          height: pageHeight,
        });
      }

      // Serialize the PDF to bytes
      const pdfBytes = await pdfDoc.save();

      // Create a Blob URL for the PDF
      const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
      const pdfBlobUrl = URL.createObjectURL(pdfBlob);

      // Set the PDF URL to display or download
      setPdfUrl(pdfBlobUrl);
    } catch (error) {
      console.error('Error creating PDF:', error);
    } finally {
      setIsConverting(false); // Hide loading indicator
    }
  };

  return (
    <div>
      <Box
        sx={{
          position: 'relative',
          // height: '100vh',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
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
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            color: 'white',
            // textAlign: 'center',
            padding:'10%'
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: '3em',
              maxWidth: '700px',
              fontFamily: 'Space Mono',
              fontWeight: '800',
              paddingTop:'15%',
              color: isDarkMode ? "black" : "white",
            }}
          >
            Conversion of Images to PDF
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              marginTop: 3,
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            {/* Upload Files Button */}
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
                fontFamily: 'Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                fontSize: '16px',
                fontWeight: 600,
                lineHeight: 'normal',
                margin: 0,
                minHeight: '60px',
                outline: 'none',
                padding: 0,
                textAlign: 'center',
                textDecoration: 'none',
                transition: 'all 300ms cubic-bezier(.23, 1, 0.32, 1)',
                userSelect: 'none',
                touchAction: 'manipulation',
                width: '25%',
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
              Upload files
              <input
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleFileChange}
                hidden
                multiple
              />
            </Button>


            {/* Display Selected Files */}
            {selectedFiles.length > 0 && (
              <Box
                sx={{
                  width: '80%',
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  borderRadius: '10px',
                  padding: '10px',
                  marginTop: '20px',
                  overflowY: 'auto',
                  maxHeight: '300px',
                }}
              >
                {selectedFiles.map((file, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      padding: '10px',
                      borderRadius: '5px',
                      marginBottom: '10px',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <img
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        style={{
                          width: '50px',
                          height: '50px',
                          marginRight: '10px',
                          borderRadius: '5px',
                        }}
                      />
                      <Typography variant="body1" sx={{ color: 'white' }}>
                        {file.name}
                      </Typography>
                    </Box>

                    <Box>
                      <IconButton onClick={() => moveUp(index)} disabled={index === 0}>
                        <ArrowUpwardIcon sx={{ color: 'white' }} />
                      </IconButton>
                      <IconButton
                        onClick={() => moveDown(index)}
                        disabled={index === selectedFiles.length - 1}
                      >
                        <ArrowDownwardIcon sx={{ color: 'white' }} />
                      </IconButton>
                      <IconButton onClick={() => deleteFile(index)}>
                        <DeleteIcon sx={{ color: 'white' }} />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
            {/* Options Section*/}
            <Box sx={{ margin: '20px 0', color: 'white', width: '80%', fontWeight:'10px' }}>
              <Typography variant="h6" sx={{fontWeight:'10px'}}>Options</Typography>

              {/* Page Orientation */}
              <Typography variant="body1">Page Orientation:</Typography>
              <RadioGroup
                value={pageOrientation}
                onChange={(e) => setPageOrientation(e.target.value)}
                row
              >
                <FormControlLabel value="Portrait" control={<Radio />} label="Portrait" />
                <FormControlLabel value="Landscape" control={<Radio />} label="Landscape" />
              </RadioGroup>

              {/* Page Size */}
              <Typography variant="body1">Page Size:</Typography>
              <RadioGroup
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value)}
                row
              >
                <FormControlLabel value="A4" control={<Radio />} label="A4" />
                <FormControlLabel value="US Letter" control={<Radio />} label="US Letter" />
                <FormControlLabel value="Same as Image" control={<Radio />} label="Same as Image" />
              </RadioGroup>

              {/* Compression */}
              <Typography variant="body1">Compression:</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={compressImages}
                    onChange={(e) => setCompressImages(e.target.checked)}
                  />
                }
                label="Compress Images"
              />
            </Box>


            {/* Convert Button */}
            <Button
              onClick={handleConvertToPdf}
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
                fontFamily: 'Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                fontSize: '16px',
                fontWeight: 600,
                lineHeight: 'normal',
                marginTop: '10px', // Matches `marginTop: 2` (16px)
                minHeight: '40px',
                padding: '8px 24px', // Adjusted padding for a balanced look
                textAlign: 'center',
                textDecoration: 'none',
                transition: 'all 300ms cubic-bezier(.23, 1, 0.32, 1)',
                width: '170px', // Matches original width
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
              Convert to pdf
            </Button>


            {/* Display or Download PDF */}
            {pdfUrl && (
              <Box sx={{ marginTop: 3 }}>
                <Typography>Conversion Successful! Download your PDF:</Typography>
                <a
                  href={pdfUrl}
                  download="converted.pdf"
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      appearance: 'none',
                      backgroundColor: 'blue', // Keep the blue color
                      border: '2px solid blue', // Blue border to match background
                      borderRadius: '15px',
                      boxSizing: 'border-box',
                      color: '#fff', // White text for good contrast
                      cursor: 'pointer',
                      display: 'inline-block',
                      fontFamily: 'Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                      fontSize: '16px',
                      fontWeight: 600,
                      lineHeight: 'normal',
                      margin: '8px 0px 20px', // Matches `marginTop: 1` (8px)
                      padding: '12px 24px',
                      textAlign: 'center',
                      textDecoration: 'none',
                      transition: 'all 300ms cubic-bezier(.23, 1, 0.32, 1)',
                      touchAction: 'manipulation',
                      '&:hover': {
                        backgroundColor: '#0046ad', // Slightly darker blue on hover
                        boxShadow: 'rgba(0, 0, 0, 0.25) 0 8px 15px', // Subtle shadow
                        transform: 'translateY(-2px)', // Interactive hover effect
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
                    Download PDF
                  </Button>

                </a>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Convert;
