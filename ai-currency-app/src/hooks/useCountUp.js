import { useEffect, useState, useRef } from "react";

export default function useCountUp(end, duration = 1500, decimals = 2) {
  const [value, setValue] = useState(0);
  const startTime = useRef(null);

  useEffect(() => {
    startTime.current = null;
    let frame;
    const step = (timestamp) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = Math.min((timestamp - startTime.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(end * eased);
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [end, duration]);

  return value.toFixed(decimals);
}
