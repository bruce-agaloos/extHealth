import React from "react";
import { getColor } from "./functions/FactFakeReview";

interface InterpretationComponentProps {
  label: string;
}

const InterpretationComponent: React.FC<InterpretationComponentProps> = ({
  label,
}) => {
  const getInterpretation = (label: string): JSX.Element => {
    if (!label) {
      console.log("Label is undefined or null");
    }
    const FONT_SIZE = "10px";
    const COLOR = getColor(label);
    switch (label.toUpperCase()) {
      case "FACT":
        return (
          <>
            This claim is considered as{" "}
            <span
              style={{
                color: COLOR,
                fontWeight: "bold",
                fontSize: `${FONT_SIZE}`,
              }}
            >
              Fact
            </span>{" "}
            because there is more evidence supporting it that passed the
            threshold.
          </>
        );
      case "FAKE":
        return (
          <>
            This claim is considered as{" "}
            <span
              style={{
                color: COLOR,
                fontWeight: "bold",
                fontSize: `${FONT_SIZE}`,
              }}
            >
              Fake
            </span>{" "}
            because there is more evidence disputing it that passed the
            threshold.
          </>
        );
      case "NEUTRAL":
        return (
          <>
            This claim needs further{" "}
            <span
              style={{
                color: COLOR,
                fontWeight: "bold",
                fontSize: `${FONT_SIZE}`,
              }}
            >
              User Review
            </span>{" "}
            because there is the same amount of evidence supporting and
            disputing it.
          </>
        );
      default:
        return (
          <>
            This claim needs further{" "}
            <span
              style={{
                color: COLOR,
                fontWeight: "bold",
                fontSize: `${FONT_SIZE}`,
              }}
            >
              User Review
            </span>{" "}
            because there is the same amount of evidence supporting and
            disputing it.
          </>
        );
    }
  };

  return (
    <div
      style={{
        padding: "5px",
        paddingTop: "0",
        marginBottom: "10px",
      }}
    >
      <div
        style={{
          fontSize: "10px",
          border: "1px solid",
          borderTop: "0",
          borderColor: `${getColor(label)}`,
          padding: "5px",
        }}
      >
        {getInterpretation(label)}
      </div>
    </div>
  );
};

export default InterpretationComponent;
