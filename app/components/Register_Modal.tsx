import React, { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg relative">
        <button
          className="text-xl absolute top-2 right-2 text-gray-700"
          onClick={onClose}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
}
