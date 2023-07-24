import { useEffect, useState } from "react";

export const usePopup = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  useEffect(() => {
    // stop propagation of keydown event
    // if is open
    const handleKeydown = (e) => {
      if (isPopupOpen) {
        e.stopPropagation();
      }
    }
    
    window.addEventListener('keydown', handleKeydown, true);

    return () => {
      window.removeEventListener('keydown', handleKeydown, true);
    }
  }, [isPopupOpen]);

  return {
    isPopupOpen,
    setIsPopupOpen,
    isCreatingNew,
    setIsCreatingNew,
  }
}