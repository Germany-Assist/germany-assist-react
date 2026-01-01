import React, { useEffect, useState } from "react";
import { useProfile } from "../../contexts/profileContext";
import { useNavigate } from "react-router-dom";

export default function ProfileAvatar({ navDir, name = false, className }) {
  const [imageUrl, setImageUrl] = useState("");
  const { profile } = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    setImageUrl(profile?.image);
  }, [profile]);

  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <img
        alt="Profile Avatar"
        src={imageUrl}
        className={`w-14 mx-auto rounded-full object-cover shadow-xl ring-2 ring-black/10 cursor-pointer ${className}`}
        onClick={() => navigate(navDir)}
      />
      {name
        ? `${profile?.firstName || ""} ${profile?.lastName || ""}`
        : undefined}
    </div>
  );
}
