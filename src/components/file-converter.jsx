import { Download, RemoveRedEye } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Stack,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useEffect, useMemo, useState } from "react";
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist/build/pdf';

// GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;
GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.5.141/pdf.worker.min.js`;


function FileConverter({ pdfUrl, fileName }) {
  const myRef = React.createRef();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [numOfPages, setNumOfPages] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setLoading(false);
  }, [imageUrls]);

  const handleClickOpen = (url, index) => {
    setSelectedImage({ url, index });
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedImage(null);
    setOpen(false);
  };

  const UrlUploader = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        renderPage(data);
      };
      reader.readAsArrayBuffer(blob); // Use readAsArrayBuffer for PDF
    } catch (error) {
      console.error("Error fetching PDF:", error);
      setLoading(false);
    }
  };

  useMemo(() => {
    UrlUploader(pdfUrl);
  }, []);

  const renderPage = async (data) => {
    setLoading(true);
    const imagesList = [];
    const canvas = document.createElement("canvas");
    canvas.setAttribute("className", "canv");
    const pdf = await getDocument({ data }).promise;
    for (let i = 1; i <= pdf.numPages; i++) {
      var page = await pdf.getPage(i);
      var viewport = page.getViewport({ scale: 1.5 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      var render_context = {
        canvasContext: canvas.getContext("2d"),
        viewport: viewport,
      };
      await page.render(render_context).promise;
      let img = canvas.toDataURL("image/png");
      imagesList.push(img);
    }
    setNumOfPages((e) => e + pdf.numPages);
    setImageUrls((e) => [...e, ...imagesList]);
  };

  useEffect(() => {
    myRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [imageUrls]);

  const downloadImage = (url, index) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}_${index + 1}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    handleClose();
  };

  return (
    <Box sx={{ my: 4, textAlign: "center" }} ref={myRef} id="image-container">
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {imageUrls.length > 0 && (
            <>
              <h4 className="drop-file-preview__title" style={{margin:"0"}}>
                Converted Images - {numOfPages}
              </h4>
              <Grid container spacing={3}>
                {imageUrls.map((url, index) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <Box
                      sx={{ width: "100%", height: "250px" }}
                      className="img-card"
                    >
                      <img
                        src={url}
                        alt={`Page ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ position: "absolute", top: 2, right: 2 }}
                      >
                        <IconButton
                          onClick={() => handleClickOpen(url, index)}
                          className="btn-bg"
                        >
                          <RemoveRedEye />
                        </IconButton>
                        <IconButton
                          onClick={() => downloadImage(url, index)}
                          className="btn-bg"
                        >
                          <Download />
                        </IconButton>
                      </Stack>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Preview</DialogTitle>
        <DialogContent dividers={true}>
          <img
            src={selectedImage?.url}
            alt={selectedImage?.url}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              downloadImage(selectedImage.url, selectedImage.index)
            }
          >
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default FileConverter;