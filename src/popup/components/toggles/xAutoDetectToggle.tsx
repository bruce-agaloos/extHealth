import React from "react";
import { setXAutoDetectState } from "./../../../utils/storage";
import { xAutoDetectProps } from "./../../../utils/types";

const XAutoDetectToggle: React.FC<xAutoDetectProps> = ({ isOn, onChange }) => {
    const handleToggleChange = () => {
        onChange(!isOn);
        setXAutoDetectState(!isOn);
    }

    return (
        <label className="switch">
            <input
                type="checkbox"
                id="toggle-switch"
                checked={isOn}
                onChange={handleToggleChange}
            />
            <span className="slider round"></span>
        </label>
    );
};

export default XAutoDetectToggle;