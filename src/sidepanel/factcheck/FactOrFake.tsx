import React from "react";
import { Fact } from "./../../utils/pop_up_storage/types";

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
  // Function to determine the overall label
  const determineLabel = (premiseHypothesisPair: Fact): string => {
    const ACCEPTABLE_THRESHOLD = 75; // Define the confidence threshold
    const labels = {
      entailment: "FACT",
      neutral: "N.R.",
      contradiction: "FAKE",
    };

    // Filter premises that meet the acceptable confidence level
    const filteredPremises = premiseHypothesisPair.premises.filter(
      (premise) => premise.confidence_level >= ACCEPTABLE_THRESHOLD
    );

    // If no premises pass the threshold, return "neutral"
    if (filteredPremises.length === 0) {
      return labels["neutral"];
    }

    // Count occurrences of each relationship in the filtered premises
    const relationshipCounts = filteredPremises.reduce((counts, premise) => {
      counts[premise.relationship] = (counts[premise.relationship] || 0) + 1;
      return counts;
    }, {} as Record<string, number>);

    // Determine the relationship with the greatest count
    const maxCount = Math.max(
      relationshipCounts["entailment"] || 0,
      relationshipCounts["contradiction"] || 0,
      relationshipCounts["neutral"] || 0
    );

    const predominantRelationships = Object.entries(relationshipCounts)
      .filter(([_, count]) => count === maxCount)
      .map(([relationship]) => relationship);

    // If there's a tie, return "neutral"; otherwise, return the predominant label
    if (predominantRelationships.length > 1) {
      return labels["neutral"];
    }

    const predominantRelationship =
      predominantRelationships[0] as keyof typeof labels;
    return labels[predominantRelationship];
  };

  const getStyle = (label: string): React.CSSProperties => {
    switch (label.toUpperCase()) {
      case "FACT":
        return {
          color: "#04935B",
        };
      case "FAKE":
        return {
          color: "#D61D17",
        };
      case "N.R.":
        return {
          color: "#F2AD08",
        };
      default:
        return {
          color: "inherit",
        };
    }}

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
          ...getStyle(determineLabel(premiseHypothesisPair)),
        }}
      >
        {determineLabel(premiseHypothesisPair)}
      </span>
    </div>
  );
};

export default ThresholdComponent;
