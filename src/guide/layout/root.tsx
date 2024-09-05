import * as React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Root() {
    return (
      <>
        <nav>
          <img src="icon.png" alt="Icon" />
          <span>eXtHealth</span>
        </nav>
        <div id="detail">
          <Outlet />
        </div>
      </>
    );
  }