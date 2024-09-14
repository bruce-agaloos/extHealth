import React from "react";
import { setCategoryState } from "./../../../utils/storage";
import { CategoryProps } from "./../../../utils/types";

const Category: React.FC<CategoryProps> = ({ isOn = false, onChange, id}) => {
  const handleToggleChange = () => {
    onChange(!isOn);
    setCategoryState(id, !isOn);
  };

  return (
    <label className={`switch ${isOn ? 'active' : ''}`}>
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

export default Category;