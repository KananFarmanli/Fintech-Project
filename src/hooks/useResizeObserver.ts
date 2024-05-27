import { useRef, useState, useEffect } from "react";

export default function useResizeObserver() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observerTarget = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      });
    });

    if (observerTarget) {
      resizeObserver.observe(observerTarget);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return { ref, size };
}
