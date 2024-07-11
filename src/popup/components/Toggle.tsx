import React from "react";
import { setExtensionState } from "../../utils/storage";
import { ToggleProps } from "./../../utils/types";

const Toggle: React.FC<ToggleProps> = ({ isOn, onChange }) => {
  const handleToggleChange = () => {
    onChange(!isOn);
    setExtensionState(!isOn);
  };

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

export default Toggle;