import React from "react";
import { createRoot } from "react-dom/client";
const Popup = () => {
  return (
    <>
      <h1>Hello</h1>
      asdsada
    </>
  );
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<Popup />);