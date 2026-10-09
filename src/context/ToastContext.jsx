import {
  useState,
  useRef,
  useEffect,
  useCallback
} from "react";

import { ToastContext } from "./ToastContext.js";
import Toast from "../components/Toast";

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const timer = useRef(null);

  const showToast = useCallback((message, type = "success") => {
    clearTimeout(timer.current);

    setToast({ message, type });

    timer.current = setTimeout(() => {
      setToast(null);
    }, 3000);
  }, []);

  useEffect(() => {
    return () => clearTimeout(timer.current);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
        />
      )}
    </ToastContext.Provider>
  );
}