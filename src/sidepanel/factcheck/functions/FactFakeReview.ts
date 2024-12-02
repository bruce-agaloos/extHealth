import { Fact } from "./../../../utils/pop_up_storage/types";

const determineLabel = (premiseHypothesisPair: Fact): string => {
  const ACCEPTABLE_THRESHOLD = 75; // Define the confidence threshold
  const labels = {
    entailment: "Fact",
    neutral: "Review",
    contradiction: "Fake",
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
    relationshipCounts["contradiction"] || 0
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

const getColor = (label: string): string => {
  const colors = {
    Fact: "#3BA0FD",
    Fake: "#F8686A",
    Review: "#FFD700",
  };

  return colors[label];
};

export { determineLabel, getColor };
