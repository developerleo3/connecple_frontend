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
  shouldAnimate = true,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false); // 애니메이션 중 여부
  const frame = useRef<number | null>(null);
  const startTime = useRef<number | null>(null);

  const match = value.match(/[0-9,.]+/);
  const number = match ? parseFloat(match[0].replace(/,/g, "")) : 0;
  const suffix = match ? value.slice(match[0].length) : "";

  useEffect(() => {
    if (!shouldAnimate) return;

    setIsAnimating(true); // 애니메이션 시작할 때

    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = timestamp - startTime.current;
      const percentage = Math.min(progress / (duration * 1000), 1);
      setCount(
        Number((number * percentage).toFixed(value.includes(".") ? 1 : 0))
      );

      if (percentage < 1) {
        frame.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false); // 애니메이션 끝났을 때
      }
    };

    frame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame.current!);
  }, [shouldAnimate, number, duration, value]);

  return (
    <span
      style={{
        opacity: isAnimating ? 0.3 : 1, // 숫자 올라가는 중이면 50%, 완료되면 100%
        transition: "opacity 0.3s ease", // 부드럽게 변하게
      }}
    >
      {count}
      {suffix}
    </span>
  );
}