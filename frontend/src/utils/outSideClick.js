import { useEffect } from "react";

export const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    function handleClickOutside(event) {
      // Check if the click is outside the popup content
      if (ref.current && !ref.current.contains(event.target)) {
        // Only trigger if the click is on the popup overlay
        if (event.target.classList.contains('popup')) {
          callback();
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};
