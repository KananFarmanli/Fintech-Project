
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export default function useHeader() {
  const headerRef = useRef<HTMLElement>(null);

  const location = useLocation();
  const [showBanner, setShowBanner] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  function openMenu() {
    setMenuOpen((prev) => !prev);
  }

  useEffect(() => {
    const lastPath = sessionStorage.getItem("lastPath"); 
    console.log(lastPath,'last path ')
    const currentPath = location.pathname;
    const isHomePage =
      currentPath === "/" && location.hash === "" && location.search === "";
    const isScrollAtTop = window.scrollY === 0;
    const cameFromSameSite = lastPath && lastPath !== "/"; 
    
    if (isHomePage && isScrollAtTop && !cameFromSameSite) {
      setShowBanner(true);
    } else {
      setShowBanner(false);
    }

    sessionStorage.setItem("lastPath", currentPath);

    const handleScroll = () => {
      if (window.scrollY !== 0) {
        setShowBanner(false);
      } else if (window.scrollY == 0 && location.pathname === "/") {
        setShowBanner(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  return {
    operations:{openMenu},
    models: { showBanner,isMenuOpen, headerRef },
  };
}
