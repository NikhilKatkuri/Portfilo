"use client"; // Ensures this runs only on the client side

import { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/vs.css"; // Optional: Choose a theme

const HighlightLoader = () => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return null;  
};

export default HighlightLoader;
