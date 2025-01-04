// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Global, css } from "@emotion/react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
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
  }
`;
function App() {
  return (
    <Router>
      <Global styles={globalStyles} />
      {/* Global Header */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page route */}
        <Route path="/about" element={<About />} /> {/* About page route */}
        <Route path="/convert" element={<Convert />} />{/* convert page route */}
        <Route path="/arena" element={<Arena />} />{/* all convert files page route */}
        <Route path="/pdftoimg" element={<PdftoImg />} />{/* all convert files page route */}
        <Route path="/pdftoword" element={<PdftoWord />} />{/* all convert files page route */}
        <Route path="/mergepdf" element={<MergePdf />} />{/* all convert files page route */}
        <Route path="/compresspdf" element={<CompressPdf />} />{/* all convert files page route */}
        <Route path="/splitpdf" element={<SplitPdf />} />{/* all convert files page route */}
        <Route path="/rotatepdf" element={<RotatePdf />} />{/* all convert files page route */}
        {/* Contact page route */}
        <Route path="*" element={<NotFound />} />{" "}
        {/* Fallback route for unknown pages */}
      </Routes>
       {/* Global Footer */}
       <Footer />
    </Router>
  );
}

export default App;
