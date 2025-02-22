// src/components/ui/card.jsx
import React from "react";

// Example card component
const Card = ({ title, content }) => {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
      <p className="card-content">{content}</p>
    </div>
  );
};

export default Card;
