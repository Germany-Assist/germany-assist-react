import {
  useState,
  useContext,
  createContext,
  useEffect,
  useCallback,
} from "react";
import { profileRequest } from "../api/profile";
import { useAuth } from "./AuthContext";

const ProfileContext = createContext(null);

export const ProfileProvider = ({ children }) => {
  const { accessToken } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    if (accessToken) {
      if (!profile) {
        fetchProfile();
      }
    } else {
      setProfile(null);
      setError(null);
    }
  }, [accessToken, fetchProfile]);

  return (
    <ProfileContext.Provider value={{ profile, loading, error, fetchProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
