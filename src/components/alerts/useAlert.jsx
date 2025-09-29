import { useState, useCallback } from "react";

export const useAlert = () => {
  const [alert, setAlert] = useState(null);

  const showAlert = useCallback((message, type = "info") => {
    setAlert({ message, type });
  }, []);

  const showAutoAlert = useCallback(
    (message, type = "info", duration = 3000) => {
      setAlert({ message, type });
      setTimeout(() => setAlert(null), duration);
    },
    []
  );

  return {
    alert,
    showAlert,
    showAutoAlert,
    clearAlert: () => setAlert(null),
  };
};
