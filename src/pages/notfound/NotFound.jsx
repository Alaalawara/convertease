// src/pages/NotFound.jsx
import React, {useContext} from 'react';
import { ThemeContext } from '../../components/theme/ThemeContext';

const NotFound = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div style={{
      padding: "20%"
    }}>
      <h1 style={{ color: isDarkMode ? "white" : "black" }}>404 - Page Not Found</h1>
      <p style={{ color: isDarkMode ? "white" : "black" }}>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
