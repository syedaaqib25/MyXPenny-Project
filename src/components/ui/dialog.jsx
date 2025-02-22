// components/ui/Dialog.jsx

import React from "react";

const Dialog = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
        <button className="dialog-close" onClick={onClose}>✖</button>
        {children}
      </div>
    </div>
  );
};

export default Dialog;
