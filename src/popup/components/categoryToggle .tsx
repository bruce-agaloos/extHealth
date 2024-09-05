import React from "react";
import { setCategoryState } from "../../utils/storage";
import { CategoryProps } from "../../utils/types";

const Category: React.FC<CategoryProps> = ({ isOn, onChange, id, disabled }) => {
  const handleToggleChange = () => {
    onChange(!isOn);
    setCategoryState(id, !isOn);
  };

  return (
    <label className={`switch ${disabled ? 'disabled' : ''}`}>
      <input
        type="checkbox"
        id="toggle-switch"
        checked={isOn}
        onChange={handleToggleChange}
        disabled={disabled}
      />
      <span className="slider round"></span>
    </label>
  );
};

export default Category;