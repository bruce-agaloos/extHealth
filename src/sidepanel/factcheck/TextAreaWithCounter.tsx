import './css/TextAreaWithCounter.css'; // Import CSS file

import React, { useEffect, useState, ChangeEvent, FocusEvent, KeyboardEvent, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import {getColor} from './functions/FactFakeReview';

interface TextAreaWithCounterProps {
  value: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (event: FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  onKeyUp?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  onInput?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  className?: string;
  label?: string;
}

const TextAreaWithCounter: React.FC<TextAreaWithCounterProps> = ({
  value,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  onKeyUp,
  onInput,
  className,
  label,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const maxLength = 256;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  

  const handleFocus = (event: FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true);
    if (onFocus) onFocus(event);
  };

  const handleBlur = (event: FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    if (onBlur) onBlur(event);
  };

  const getBgColor = (classToConsider: string, isInvert: boolean) => {
    const direction = isInvert ? "to top" : "to bottom"; // Change gradient direction
    if (classToConsider === "textarea-unfocused") {
      return `linear-gradient(${direction}, #FBFCFF 50%, white 50%)`;
    } else if (classToConsider === "textarea-focused") {
      return `linear-gradient(${direction}, #FBFCFF 50%, #D7ECFF 50%)`;
    }
  };
  

  const textareaClassName = `textarea ${className || ''} ${value.length > maxLength ? 'textarea-exceed' : ''}`.trim();
  return (
    <div className="textarea-container" style={{position: "relative", paddingBottom: "0px"}}>
      <div style={{
        color: getColor(label || ''),
        fontSize: '0.8rem',
        position: 'absolute',
        top: '-2px',
        left: '20px',
        zIndex: 1,
        padding: '0 5px',
        background: getBgColor(className || '', false),
      }}>
        {label}
      </div>
      <TextareaAutosize 
        maxRows={3}
        minRows={1}
        ref={textareaRef}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        spellCheck={true}
        className={textareaClassName}
        style={{ borderColor: getColor(label || '') }}
        placeholder='Enter a health claim here...'
      />
      {isFocused && (
        <div 
        style={{ color: value.length > maxLength ? 'red' : '', background: getBgColor(className || '', true) }}
        className="counter">
          {value.length} / {maxLength}
        </div>
      )}
    </div>
  );
};

export default TextAreaWithCounter;