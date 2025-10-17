import { useState, useCallback } from "react";

export const useAlert = () => {
  const [alert, setAlert] = useState(null);

  const showAlert = useCallback((message, type = "info") => {
    setAlert({ message, type });
  }, []);

  const clearAlert = useCallback(() => {
    setAlert(null);
  }, []);

  return {
    alert,
    showAlert,
    clearAlert,
  };
};
