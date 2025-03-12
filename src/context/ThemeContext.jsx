import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

const themes = {
    light: {
        name: "light",
        background: "#ffffff",
        text: "#000000",
        sidebar: "#ffffff6f",
        primary: "#3498db"
    },
    dark: {
        name: "dark",
        background: "#1a1a1a",
        text: "#ffffff",
        sidebar: "#333",
        primary: "#e67e22"
    },
    ocean: {
        name: "ocean",
        background: "#2c3e50",
        text: "#ecf0f1",
        sidebar: "#34495e",
        primary: "#16a085"
    },
    purple: {
        name: "purple",
        background: "#3d214a",
        text: "#f8c471",
        sidebar: "#4a235a",
        primary: "#8e44ad"
    }
};

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    useEffect(() => {
        localStorage.setItem("theme", theme);
        const themeVars = themes[theme];
        document.documentElement.style.setProperty("--background", themeVars.background);
        document.documentElement.style.setProperty("--text", themeVars.text);
        document.documentElement.style.setProperty("--sidebar", themeVars.sidebar);
        document.documentElement.style.setProperty("--primary", themeVars.primary);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, themes }}>
            {children}
        </ThemeContext.Provider>
    );
}
