// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Global, css } from "@emotion/react";

// Components
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

// Pages
import Home from "./pages/home/HomePage";
import About from "./pages/about/About";
import Convert from "./pages/convert/Convert";
import Arena from "./pages/arena/Arena";
import PdftoImg from "./pages/pdftoimg/pdftoimg";
import NotFound from "./pages/notfound/NotFound";
import PdftoWord from "./pages/pdftoword/PdftoWord";
import MergePdf from "./pages/mergepdf/MergePdf";
import CompressPdf from "./pages/compresspdf/CompressPDF";
import SplitPdf from "./pages/splitpdf/SplitPdf";
import RotatePdf from "./pages/rotatepdf/RotatePdf";

const globalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');

  * {
    font-family: "Space Mono", monospace;
    font-weight: 700;
    font-style: normal;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

function App() {
  return (
    <>
      <Global styles={globalStyles} />

      {/* Global Header */}
      <Header />

      {/* Routes must be alone here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/convert" element={<Convert />} />
        <Route path="/arena" element={<Arena />} />
        <Route path="/pdftoimg" element={<PdftoImg />} />
        <Route path="/pdftoword" element={<PdftoWord />} />
        <Route path="/mergepdf" element={<MergePdf />} />
        <Route path="/compresspdf" element={<CompressPdf />} />
        <Route path="/splitpdf" element={<SplitPdf />} />
        <Route path="/rotatepdf" element={<RotatePdf />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Global Footer */}
      <Footer />
    </>
  );
}

export default App;
