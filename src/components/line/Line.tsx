import { useEffect, useRef } from "react";

export default function Line() {
  const pathr = useRef(null);
  const animationFrameId = useRef(null);

  useEffect(() => {
    if (!pathr.current) return;

    let pathLength = pathr.current.getTotalLength();
    pathr.current.style.strokeDasharray = `${pathLength} ${pathLength}`;
    pathr.current.style.strokeDashoffset = pathLength;

 
    

    const handleScroll = () => {
      pathr.current.style.opacity = '1';
      const scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / 
                               (document.documentElement.scrollHeight - document.documentElement.clientHeight);
      const drawLength = pathLength * scrollPercentage;

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }

      animationFrameId.current = requestAnimationFrame(() => {
        if (pathr.current) {
          pathr.current.style.strokeDashoffset = pathLength - drawLength;
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="line-container">
      <svg width="100%" height="100%" preserveAspectRatio="xMidYMax meet" viewBox="0 0 307 1040" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path ref={pathr} className="hidden-path" d="M151 0.5V37V47.5H72H12H1.5V147.5V277.5H187H251V316.5H208.5V286H305.5V526H174H82.5V571H118.5V549H1.5V782.5H269V820.5H231V794H303V1038.5H124.5V1007.5H151.5V1027.5H107.5V989H203.5" stroke="#DC2626" strokeWidth="1"/>
      </svg>
    </div>
  );
}