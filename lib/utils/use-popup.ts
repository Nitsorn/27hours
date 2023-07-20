import { useState } from "react";

export const usePopup = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  return {
    isPopupOpen,
    setIsPopupOpen
  }
}