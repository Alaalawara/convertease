// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { CustomThemeProvider } from './components/theme/ThemeContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CustomThemeProvider>
    <App />
    </CustomThemeProvider>
  </React.StrictMode>
);