import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext";
import { db } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import themes from "../context/colors"; 

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const { user } = useAuth();
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const fetchTheme = async () => {
            if (user) {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists() && userDoc.data().theme) {
                    setTheme(userDoc.data().theme);
                }
            }
        };
        fetchTheme();
    }, [user]);

    useEffect(() => {
        if (user) {
            setDoc(doc(db, "users", user.uid), { theme }, { merge: true });
        }
        const themeVars = themes[theme];
        if (themeVars) {
            document.documentElement.style.setProperty("--background1", themeVars.background1);
            document.documentElement.style.setProperty("--background2", themeVars.background2);
            document.documentElement.style.setProperty("--text", themeVars.text);
            document.documentElement.style.setProperty("--boxes", themeVars.boxes);
            document.documentElement.style.setProperty("--primary", themeVars.primary);
            document.documentElement.style.setProperty("--bars", themeVars.bars);
        }
    }, [theme, user]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, themes }}>
            {children}
        </ThemeContext.Provider>
    );
}
