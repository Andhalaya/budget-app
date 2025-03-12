import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function Settings() {
    const { theme, setTheme, themes } = useContext(ThemeContext);

    return (
        <div>
            <h2>Settings</h2>
            <label>Select Theme:</label>
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                {Object.keys(themes).map((themeKey) => (
                    <option key={themeKey} value={themeKey}>
                        {themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    );
}
