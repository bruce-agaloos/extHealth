import React from 'react';
import './../css/logo.css'; // Ensure you have the CSS file imported

const Logo: React.FC = () => {
    return (
        <div className="logo-container">
            <img src="iconGreen.png" alt="Logo" className="logo-image" />
            <span className="logo-text">eXtHealth</span>
        </div>
    );
};

export default Logo;