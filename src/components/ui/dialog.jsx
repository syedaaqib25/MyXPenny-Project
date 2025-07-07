// src/components/ui/dialog.jsx
import React, { useState, createContext, useContext } from "react";

const DialogContext = createContext();

export function Dialog({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DialogContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogTrigger({ children }) {
  const { setIsOpen } = useContext(DialogContext);
  return React.cloneElement(children, {
    onClick: () => setIsOpen(true),
  });
}

export function DialogContent({ children }) {
  const { isOpen, setIsOpen } = useContext(DialogContext);
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={() => setIsOpen(false)}
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
}

export function DialogTitle({ children }) {
  return <h2 className="text-xl font-bold mb-4 text-center">{children}</h2>;
}
