import React from "react";

interface NoResultsProps {
  message: string;
}

const NoResults: React.FC<NoResultsProps> = ({ message }) => {
  return (
    <div
      style={{
        color: "gray",
        marginBottom: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        fontSize: "1.2em",
        marginTop: "20px",
      }}
    >
      <span>{message}</span>
      <img src="sad-emoji.gif" alt=":(" height="30px" width="30px" />
    </div>
  );
};

export default NoResults;
