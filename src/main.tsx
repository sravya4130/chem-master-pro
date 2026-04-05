import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Initialize dark/light mode from localStorage
const savedDarkMode = localStorage.getItem('chemlearn-darkmode');
const isDark = savedDarkMode !== null ? JSON.parse(savedDarkMode) : true;
document.documentElement.classList.add(isDark ? 'dark' : 'light');

createRoot(document.getElementById("root")!).render(<App />);
