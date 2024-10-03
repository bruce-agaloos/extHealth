import React from 'react';

interface FactRadionProps {
    label: string;
    value: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FactRadio: React.FC<FactRadionProps> = ({ label, value, checked, onChange }) => {
    return (
        <div className='containerSummary less'>
            <p className="popupSummary indent">{label}</p>
            <label className='switch'>
                <input
                    type="radio"
                    value={value}
                    checked={checked}
                    onChange={onChange}
                />
                <span className='slider round'></span>
            </label>
        </div>
    );
};

export default FactRadio;