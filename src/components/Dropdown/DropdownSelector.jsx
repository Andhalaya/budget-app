import { useState } from "react";
import "./DropdownSelector.css";

export default function DropdownSelector({ options, selected, setSelected, type }) {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className="dropdown">
            {/* Selected Item Display */}
            <button type="button" className="dropdown-button" onClick={() => setShowDropdown(!showDropdown)}>
                {type === "icon" ? (
                    options.find(option => option.value === selected)?.component
                ) : (
                    <div className="color-box" style={{ backgroundColor: selected }}></div>
                )}
                ▼
            </button>

            {/* Dropdown List */}
            {showDropdown && (
                <div className="dropdown-menu">
                    {options.map((option, index) => (
                        <div
                            key={`${option.value}-${index}`} // Ensure unique key
                            className="dropdown-item"
                            onClick={() => { setSelected(option.value); setShowDropdown(false); }}
                        >
                            {type === "icon" ? (
                                option.component
                            ) : (
                                <div className="color-box" style={{ backgroundColor: option.value }}></div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
