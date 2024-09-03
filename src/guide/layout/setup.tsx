import React from "react";

import './css/setup.css';
const Setup = () => {
  
    return (
      <section id = "setup">
        <video controls>
          <source src="movie.mp4" type="video/mp4"/>
          Your browser does not support the video tag.
        </video>
        <p>
          Make sure to watch our Video Demo for a quick overview of eXtHealth’s features and instructions on how to use the browser extension.
        </p>
      </section>
    );
  };
  
export default Setup;