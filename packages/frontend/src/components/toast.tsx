"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { X, AlertCircle, CheckCircle } from "lucide-react";

interface ToastProps {
  message: string;
  type: "error" | "success";
  onClose: () => void;
}

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -100, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -100, scale: 0.8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`fixed top-5 right-5 z-50 min-w-80 rounded-xl overflow-hidden shadow-2xl ${
        type === "error"
          ? "bg-red-50 border border-red-200 text-red-700"
          : "bg-green-50 border border-green-200 text-green-700"
      }`}
    >
      <div className="flex items-center gap-3 p-4">
        <div className="flex-shrink-0">
          {type === "error" ? (
            <AlertCircle size={20} />
          ) : (
            <CheckCircle size={20} />
          )}
        </div>
        <span className="flex-1 font-medium">{message}</span>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-black/10 transition-colors duration-200"
        >
          <X size={16} />
        </button>
      </div>

      <motion.div
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: 4, ease: "linear" }}
        className="h-0.5 bg-current opacity-30"
      />
    </motion.div>
  );
};

export default Toast;
