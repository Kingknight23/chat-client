import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";

import "./styles/theme.css";
import "./styles/global.css";
import "./styles/auth.css";
import "./styles/dashboard.css";
import "./styles/sidebar.css";
import "./styles/chat.css";
import "./styles/messages.css";
import "./styles/friends.css";
import "./styles/responsive.css";
import "./styles/reference-ui.css";

try {
    const savedAppearance = JSON.parse(localStorage.getItem("chat-appearance") || "null");
    if (savedAppearance) {
        document.documentElement.dataset.theme = savedAppearance.mode || "light";
        if (savedAppearance.mode === "custom") {
            document.documentElement.style.setProperty("--custom-background", savedAppearance.background || "#ffffff");
            const hex = (savedAppearance.background || "#ffffff").replace("#", "");
            const rgb = [0, 2, 4].map(index => parseInt(hex.slice(index, index + 2), 16));
            const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
            document.documentElement.style.setProperty("--custom-text", brightness < 145 ? "#f5f7fa" : "#171827");
            document.documentElement.style.setProperty("--custom-muted", brightness < 145 ? "#b5bbca" : "#626779");
            document.documentElement.style.setProperty("--primary", savedAppearance.bubble || "#5145cd");
            document.documentElement.style.setProperty("--primary-hover", savedAppearance.bubble || "#5145cd");
        }
    }
} catch (error) {
    console.warn("Unable to load appearance preferences.", error);
}

ReactDOM.createRoot(
    document.getElementById("root")
).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);