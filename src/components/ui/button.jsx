import React from "react";

export const Button = ({ children, onClick, className }) => {
  return (
    <button onClick={onClick} className={`btn ${className}`}>
      {children}
    </button>
  );
};
