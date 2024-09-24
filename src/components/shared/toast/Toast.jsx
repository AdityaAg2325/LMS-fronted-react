import React, { useEffect } from "react";
import "./Toast.css";

const Toast = ({ message, type, show, duration = 3000, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration]);

  if (!show) return null;

  return (
    <div className={`toast toast-${type}`}>
      <p>{message}</p>
    </div>
  );
};

export default Toast;
