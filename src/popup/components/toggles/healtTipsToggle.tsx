import React from "react";
import { setHealthTipState } from "./../../../utils/storage";
import { HealthTipsProps } from "./../../../utils/types";

const Toggle: React.FC<HealthTipsProps> = ({ isOn, onChange }) => {
  const handleToggleChange = () => {
    onChange(!isOn);
    setHealthTipState(!isOn);
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