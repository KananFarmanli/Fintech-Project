import { useEffect, useRef } from "react";

export default function Line() {
  const pathr = useRef<SVGPathElement>(null);
  const animationFrameId = useRef<null | number>(null);

  useEffect(() => {
    if (!pathr.current) return;

    let pathLength = pathr.current.getTotalLength();
    pathr.current.style.strokeDasharray = `${pathLength} ${pathLength}`;
    pathr.current.style.strokeDashoffset = `${pathLength}`;

    const handleScroll = () => {
      if (!pathr.current) return;
      pathr.current.style.opacity = "1";
      const scrollPercentage =
        (document.documentElement.scrollTop + document.body.scrollTop) /
        (document.documentElement.scrollHeight -
          document.documentElement.clientHeight);
      const drawLength = pathLength * scrollPercentage;

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }

      animationFrameId.current = requestAnimationFrame(() => {
        if (pathr.current) {
          pathr.current.style.strokeDashoffset = (
            pathLength - drawLength
          ).toString();
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
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMax meet"
        viewBox="0 0 1 1170"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={pathr}
          className="hidden-path"
          d="M0.5 0.5V1170"
          stroke="#306ee8"
        />
      </svg>

      
    </div>
  );
}
