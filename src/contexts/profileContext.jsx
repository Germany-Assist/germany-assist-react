//profile context
import { useState, useContext, createContext, useEffect } from "react";
import { profileRequest } from "../api/profile";
import { useAuth } from "./AuthContext";

const ProfileContext = createContext(null);

export const ProfileProvider = ({ children }) => {
  const { accessToken } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (accessToken) {
      (async () => {
        const data = await profileRequest();
        setProfile(data);
      })();
    }
  }, [accessToken]);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await profileRequest();
      setProfile(data);
    } catch (err) {
      setError(err);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const clearProfile = () => {
    setProfile(null);
    setError(null);
    setLoading(false);
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading,
        error,
        fetchProfile,
        clearProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const ctx = useContext(ProfileContext);
  if (!ctx) {
    throw new Error("useProfile must be used inside ProfileProvider");
  }
  return ctx;
};
