import React, { useEffect, useState } from "react";
import { useProfile } from "../../contexts/profileContext";
import avatar from "../../assets/avatar.png";
import { useNavigate } from "react-router-dom";
export default function ProfileAvatar({ navDir, name = false }) {
  const [imageUrl, setImageUrl] = useState(avatar);
  const { profile } = useProfile();
  const navigate = useNavigate();
  useEffect(() => {
    profile?.image ? setImageUrl(profile.image) : avatar;
  }, [profile]);
  return (
    <div class="flex flex-col justify-center items-center gap-6">
      <img
        alt=""
        src={imageUrl}
        class="w-20 mx-auto rounded-full object-cover shadow-xl ring-2 ring-black/10 cursor-pointer"
        onClick={() => navigate(navDir)}
      />
      {name ? `${profile?.firstName} ${profile?.lastName}` : undefined}
    </div>
  );
}
