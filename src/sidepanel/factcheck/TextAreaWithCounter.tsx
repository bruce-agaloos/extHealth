import './css/TextAreaWithCounter.css'; // Import CSS file

import React, { useEffect, useState, ChangeEvent, FocusEvent, KeyboardEvent, useRef } from 'react';

interface TextAreaWithCounterProps {
  value: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (event: FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  onKeyUp?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  onInput?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  style?: React.CSSProperties; 
}

const TextAreaWithCounter: React.FC<TextAreaWithCounterProps> = ({
  value,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  onKeyUp,
  onInput,
  style,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const maxLength = 80;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  

  const handleFocus = (event: FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true);
    if (onFocus) onFocus(event);
  };

  const handleBlur = (event: FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    if (onBlur) onBlur(event);
  };

  const autoResizeTextarea = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = 'auto'; // Reset the height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to the scroll height
  };

  const textColor = value.length > maxLength ? 'red' : '';
  return (
    <div className="textarea-container">
      <textarea
        ref={textareaRef}
        rows={1}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onInput={(e) => autoResizeTextarea(e.target as HTMLTextAreaElement)}
        style={{ ...style, borderColor: textColor}}
        className="textarea"
        placeholder='Enter a health claim here...'
      />
      {isFocused && (
        <div 
        style={{ color: textColor}}
        className="counter">
          {value.length} / {maxLength}
        </div>
      )}
    </div>
  );
};

export default TextAreaWithCounter;