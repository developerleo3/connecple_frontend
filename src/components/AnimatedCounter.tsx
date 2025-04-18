"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedCounterProps = {
  value: string;
  duration?: number; // 초 단위
  shouldAnimate?: boolean; // animation 트리거 여부
};

export default function AnimatedCounter({
  value,
  duration = 1.5,
  shouldAnimate = true
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const frame = useRef<number | null>(null);
  const startTime = useRef<number | null>(null);

  // 숫자 부분만 추출 (예: "97.3%" → "97.3")
  const match = value.match(/[0-9,.]+/);
  const number = match ? parseFloat(match[0].replace(/,/g, "")) : 0;

  // 숫자 부분을 제외한 나머지를 suffix로 (예: "%" 포함)
  const suffix = match ? value.slice(match[0].length) : "";

  useEffect(() => {
    if (!shouldAnimate) return;

    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = timestamp - startTime.current;
      const percentage = Math.min(progress / (duration * 1000), 1);
      setCount(
        Number((number * percentage).toFixed(value.includes(".") ? 1 : 0))
      );

      if (percentage < 1) {
        frame.current = requestAnimationFrame(animate);
      }
    };

    frame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame.current!);
  }, [shouldAnimate, number, duration, value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}
