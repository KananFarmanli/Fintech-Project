import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useScrollToHash() {
    const location = useLocation();
  
    useEffect(() => {
      const hash = location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, [location]);
  }