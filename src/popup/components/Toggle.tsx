import React, { useState, useEffect } from 'react';

const ToggleComponent = ({ onToggle }) => {
    const [isToggled, setIsToggled] = useState(false);

    useEffect(() => {
        const storedState = localStorage.getItem('isToggled');
        if (storedState !== null) {
            setIsToggled(JSON.parse(storedState));
        }
    }, []);

    const handleToggle = (event) => {
        const newState = event.target.checked;
        setIsToggled(newState);
        localStorage.setItem('isToggled', JSON.stringify(newState));
        onToggle(newState);
    };

    return (
        <label className="toggle-container">
            <input
                type="checkbox"
                checked={isToggled}
                onChange={handleToggle}
            />
            <span className="toggle-circle"></span>
        </label>
    );
};

export default ToggleComponent;