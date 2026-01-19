import {
  useState,
  useContext,
  createContext,
  useEffect,
  useCallback,
} from "react";
import {
  addToFavoriteApi,
  profileRequest,
  removeFromFavoriteApi,
} from "../api/profile";
import { useAuth } from "./AuthContext";

const ProfileContext = createContext(null);

export const ProfileProvider = ({ children }) => {
  const { accessToken } = useAuth();
  const [profile, setProfile] = useState(null);
  //TODO later on delete
  console.log(profile);
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
  const toggleFavorite = async (service) => {
    if (profile) {
      const isFav = isInFavorite(service.id);
      const resp = isFav
        ? await removeFromFavorite(service)
        : await addToFavorite(service);
      return resp;
    } else {
      // TODO create error message
    }
  };
  const addToFavorite = async (service) => {
    if (profile && service.id) {
      const resp = await addToFavoriteApi(service.id);
      if (resp) {
        const newFavElement = {
          id: service.id,
          service: {
            id: service.id,
            title: service.title,
            description: service.description,
          },
        };
        setProfile((p) => ({
          ...p,
          favorites: [...p.favorites, newFavElement],
        }));
      }
      return resp;
    } else {
      return false;

      // TODO create error message
    }
  };
  const removeFromFavorite = async (service) => {
    if (profile && service.id) {
      const resp = await removeFromFavoriteApi(service.id);
      if (resp)
        setProfile((p) => ({
          ...p,
          favorites: p.favorites.filter((i) => i.id !== service.id),
        }));
      return resp;
    } else {
      return false;

      // TODO create error message
    }
  };
  const isInFavorite = (id) => {
    if (profile) {
      const exist = profile.favorites?.filter((i) => {
        return i.service.id == id;
      });

      if (exist) return exist.length > 0;
    } else {
      return false;
    }
  };
  const hasAlreadyPurchasedService = (service) => {
    if (profile) {
      const exist = profile.orders?.filter((i) => i.serviceId == service.id);
      if (exist.length > 0) return exist.map((i) => i.variant || i.timeline);
    } else {
      return false;
    }
  };
  const hasPurchasedOptions = (service) => {
    if (profile && (service.variants || service.timelines)) {
      const options = service.timelines || service.variants;
      const exist = options?.filter((option) => {
        // if (
        //   option.type === "timeline" &&
        //   option.serviceId == service.id &&
        //   option.timelines.length > 0
        // )

        return service.timelines.filter(
          (timeline) => timeline.id == service.activeTimeline.id,
        );
      });
      if (exist) return exist.length > 0;
    } else {
      return false;
    }
  };
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
    <ProfileContext.Provider
      value={{
        isInFavorite,
        toggleFavorite,
        hasAlreadyPurchasedService,
        profile,
        loading,
        error,
        fetchProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
