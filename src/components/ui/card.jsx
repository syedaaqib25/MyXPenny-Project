// src/components/ui/card.jsx
import React from "react";

export function Card({ children }) {
  return (
    <div className="rounded-lg border bg-white shadow p-4">
      {children}
    </div>
  );
}

export function CardContent({ children }) {
  return (
    <div className="mt-2 text-sm text-gray-700">
      {children}
    </div>
  );
}
