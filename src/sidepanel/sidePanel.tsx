import React from "react";
import { createRoot } from "react-dom/client";

import Layout from "./layout/layout";

const SidePanel = () => {

    return (
        <Layout/>
    );
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<SidePanel />);