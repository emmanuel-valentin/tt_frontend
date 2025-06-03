import { useState, useEffect } from "react";
import {
  setSelectedImage,
  getSelectedImage,
} from "~/store/register-form.store";

export function useAvatarPreview() {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // Load existing image preview on mount
  useEffect(() => {
    const existingImage = getSelectedImage();
    if (existingImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(existingImage);
    }
  }, []);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setAvatarPreview(null);
      setSelectedImage(null);
      return;
    }

    // Store the file in the register form store
    setSelectedImage(file);

    // Create preview for display
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const clearAvatar = () => {
    setAvatarPreview(null);
    setSelectedImage(null);
  };

  return {
    avatarPreview,
    handleAvatarChange,
    clearAvatar,
  };
}
