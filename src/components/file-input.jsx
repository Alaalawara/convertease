import { CloseOutlined, ViewColumn } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Snackbar,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import uploadImg from "../assets/cloud-upload-regular-240.png";
import filePdf from "../assets/file-pdf-solid-240.png";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FileInput = (props) => {
  const theme = useTheme();
  const wrapperRef = useRef(null);
  const bpSMd = theme.breakpoints.down("sm");

  const [file, setFile] = useState(null);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    props.onFileChange(file);
  }, [file]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile && newFile.type === "application/pdf") {
      setFile(newFile);
    } else {
      setOpen(true);
    }
  };

  const returnSize = (file) => {
    const fileSizeInBytes = file.size; // Example file size in bytes
    let fileSize;

    if (fileSizeInBytes >= 1048576) {
      fileSize = (fileSizeInBytes / 1048576).toFixed(2) + " MB";
    } else {
      fileSize = (fileSizeInBytes / 1024).toFixed(2) + " KB";
    }
    return fileSize;
  };

  return (
  <>
      <Stack
        direction="row"
        spacing={1}
        justifyContent="center"
        alignItems="center"
        sx={{ marginBottom: 3 }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: "40px",
            fontWeight: "bold",
            letterSpacing: 1,
            color: "white",
            padding:"20px",
            [bpSMd]: { fontSize: "20px" },
          }}
        >
          Extract Images from PDF
        </Typography>
      </Stack>
      <Stack
        direction="row"
        spacing={1}
        justifyContent="center"
        alignItems="center"
        sx={{ marginBottom: 3 }}
      >
      {!file && (
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
          }}
        >
          Upload files
          <input type="file" accept=".pdf" value="" hidden onChange={onFileDrop} />
        </Button>
      )}</Stack>
      {file ? (
        <div className="drop-file-preview">
          <p className="drop-file-preview__title">Uploaded file</p>
          <div className="drop-file-preview__item">
            <img style={{width:"100px"}} src={filePdf} alt="PDF Icon" />
            <div className="drop-file-preview__item__info">
              <p>{file.name}</p>
              <p>{returnSize(file)}</p>
            </div>
            <IconButton onClick={() => setFile(null)}>
              <CloseOutlined />
            </IconButton>
          </div>
        </div>
      ) : null}
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Please upload pdf only
        </Alert>
      </Snackbar>
    </>
  );
};

FileInput.propTypes = {
  onFileChange: PropTypes.func,
};

export default FileInput;