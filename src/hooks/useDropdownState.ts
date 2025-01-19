import { useState } from "react";

export const useDropdownState = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return { isOpen, toggleDropdown };
};
