import React, { useState } from "react";
import "./PdftoImg.scss";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Grid, Box } from "@mui/material";
import FileInput from "../../components/file-input";
import FileConverter from "../../components/file-converter";

export const primary = "#176ede";

const PdftoImg = () => {
  const [pdfFile, setPdfFile] = useState(null);

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
        <Grid container spacing={4} className="d-flex">
          <Grid item className="box" xs={12} sm={6}>
            <FileInput onFileChange={(file) => setPdfFile(file)} />
          </Grid>
          {pdfFile && (
            <Grid item xs={12}>
              <FileConverter
                pdfUrl={URL.createObjectURL(pdfFile)}
                fileName={pdfFile.name}
              />
            </Grid>
          )}
        </Grid>
      </Box>
    </div>
  );
};

export default PdftoImg;
