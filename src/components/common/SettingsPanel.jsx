import { useEffect, useState } from "react";

const defaults = {
    mode: "light",
    background: "#ffffff",
    bubble: "#5145cd"
};

const readSettings = () => {
    try {
        return { ...defaults, ...JSON.parse(localStorage.getItem("chat-appearance") || "{}") };
    } catch {
        return defaults;
    }
};

const applySettings = (settings) => {
    const root = document.documentElement;
    root.dataset.theme = settings.mode;
    root.style.setProperty("--custom-background", settings.mode === "custom" ? settings.background : "");
    if (settings.mode === "custom") {
        const hex = settings.background.replace("#", "");
        const rgb = [0, 2, 4].map(index => parseInt(hex.slice(index, index + 2), 16));
        const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
        root.style.setProperty("--custom-text", brightness < 145 ? "#f5f7fa" : "#171827");
        root.style.setProperty("--custom-muted", brightness < 145 ? "#b5bbca" : "#626779");
    } else {
        root.style.removeProperty("--custom-text");
        root.style.removeProperty("--custom-muted");
    }
    root.style.setProperty("--primary", settings.mode === "custom" ? settings.bubble : "");
    root.style.setProperty("--primary-hover", settings.mode === "custom" ? settings.bubble : "");
    localStorage.setItem("chat-appearance", JSON.stringify(settings));
};

export default function SettingsPanel({ onClose }) {
    const [settings, setSettings] = useState(readSettings);

    useEffect(() => { applySettings(settings); }, [settings]);

    const update = (key, value) => setSettings(previous => ({ ...previous, [key]: value }));

    return (
        <div className="settings-backdrop" onMouseDown={onClose}>
            <section className="settings-panel" role="dialog" aria-modal="true" aria-labelledby="appearance-title" onMouseDown={event => event.stopPropagation()}>
                <div className="settings-heading">
                    <div><span className="eyebrow">PERSONALIZE</span><h2 id="appearance-title">Appearance settings</h2></div>
                    <button className="modal-close" onClick={onClose} aria-label="Close settings">×</button>
                </div>
                <p className="settings-description">Choose how ChatApp looks on this device.</p>
                <label className="settings-label" htmlFor="theme-mode">Theme</label>
                <select id="theme-mode" className="settings-select" value={settings.mode} onChange={event => update("mode", event.target.value)}>
                    <option value="light">Light mode</option>
                    <option value="dark">Dark mode</option>
                    <option value="custom">Custom colours</option>
                </select>
                {settings.mode === "custom" && <>
                    <label className="settings-label" htmlFor="background-colour">Background colour</label>
                    <div className="colour-control"><input id="background-colour" type="color" value={settings.background} onChange={event => update("background", event.target.value)} /><span>{settings.background.toUpperCase()}</span></div>
                    <label className="settings-label" htmlFor="bubble-colour">Chat bubble / accent colour</label>
                    <div className="colour-control"><input id="bubble-colour" type="color" value={settings.bubble} onChange={event => update("bubble", event.target.value)} /><span>{settings.bubble.toUpperCase()}</span></div>
                </>}
                <div className="settings-preview">
                    <span>Preview</span>
                    <div className="preview-bubble">Your messages will look like this</div>
                </div>
                <div className="settings-actions">
                    <button className="settings-reset" onClick={() => setSettings(defaults)}>Reset</button>
                    <button className="primary-button" onClick={onClose}>Done</button>
                </div>
            </section>
        </div>
    );
}
