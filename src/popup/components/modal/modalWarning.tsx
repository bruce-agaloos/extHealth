import { text } from '@fortawesome/fontawesome-svg-core';
import React from 'react';

interface ModalWarningProps {
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ModalWarning: React.FC<ModalWarningProps> = ({ title, message, onConfirm, onCancel }) => {
    return (
        <div className="danger-popup"
        style={{
            top: "0px",
            height: "50%",
        }}>
            <div className="danger-popupContent">
                <button className="closeButton" onClick={onCancel}>×</button>
                <h4>{message}</h4>
                <button className="redRoundedButton" style={{marginRight:"10px"}} onClick={onConfirm}>Yes</button>
                <button onClick={onCancel}
                className='noButton'
                style={{
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    color: "grey",
                    border: "none",
                }}>No</button>
            </div>
        </div>
    );
};

export default ModalWarning;