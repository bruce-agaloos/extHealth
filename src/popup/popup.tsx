import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./popup.css";

import { Toggle } from "./components";

const Popup = () => {
    return (
        <>
            <h1>Hello</h1>
            <Toggle onToggle={(isOn) => {
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, { toggleState: isOn });
                });
            }} />

        </>
    );
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<Popup />);