import React from "react";
import { Fact } from "./../../utils/pop_up_storage/types";
import { determineLabel } from "./functions/FactFakeReview";

interface ThresholdComponentProps {
  style?: React.CSSProperties; // For inline styles
  className?: string; // For CSS classes
  premiseHypothesisPair: Fact;
}

const ThresholdComponent: React.FC<ThresholdComponentProps> = ({
  style,
  className,
  premiseHypothesisPair,
}) => {
  const LABEL = determineLabel(premiseHypothesisPair);

  const getIcon = (label: string): JSX.Element | null => {
    if (!label) {
      console.log("Label is undefined or null");
      return null;
    }
    switch (label.toUpperCase()) {
      case "FACT":
        return (
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ backgroundColor: "transparent" }}
          >
            <circle cx="12.5" cy="12.5" r="12.5" fill="#3BA0FD" />
            <line
              x1="9.93934"
              y1="17.9393"
              x2="19.9393"
              y2="7.93934"
              stroke="white"
              stroke-width="3"
            />
            <path d="M6 13L11.8107 17.9222" stroke="white" stroke-width="3" />
          </svg>
        );
      case "FAKE":
        return (
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ backgroundColor: "transparent" }}
          >
            <circle cx="12.5" cy="12.5" r="12.5" fill="#F8686A" />
            <line
              x1="7.87473"
              y1="7.62068"
              x2="16.947"
              y2="17.5428"
              stroke="white"
              stroke-width="2"
            />
            <line
              y1="-1"
              x2="13.4529"
              y2="-1"
              transform="matrix(-0.739675 0.672964 -0.672962 -0.739678 16.7307 7.15878)"
              stroke="white"
              stroke-width="2"
            />
          </svg>
        );
      case "REVIEW":
        return (
          <svg
            width="25"
            height="27"
            viewBox="0 0 25 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ backgroundColor: "transparent" }}
          >
            <path
              d="M23.5 21.5C18.3373 21.5944 15.9638 22.5035 12.5 25.5C9.19108 22.5858 6.77705 21.5857 1 21.5V7.50002C5.75452 7.39477 8.34798 7.74613 12.5 11C16.3947 8.47061 18.811 7.67395 23.5 7.50002V21.5Z"
              stroke="#AC6DB5"
              stroke-width="2"
            />
            <circle cx="12.5" cy="4" r="4" fill="#AC6DB5" />
            <circle cx="12.5" cy="4" r="2" fill="white" />
            <line
              x1="12.5"
              y1="11"
              x2="12.5"
              y2="25"
              stroke="#AC6DB5"
              stroke-width="2"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  // Render the component
  return (
    <div style={style} className={className}>
      <span
        style={{
          fontSize: "12px",
          fontWeight: "bold",
          backgroundColor: "transparent",
          padding: "2px 4px",
          borderRadius: "4px",
        }}
      >
        {getIcon(LABEL)}
      </span>
    </div>
  );
};

export default ThresholdComponent;
