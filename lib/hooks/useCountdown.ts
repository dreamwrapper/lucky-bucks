import { useEffect, useState } from 'react';

export default function useCountdown(targetTimestamp: number) {
  const [remainingTime, setRemainingTime] = useState<number>(0);

  useEffect(() => {
    const updateRemainingTime = () => {
      setRemainingTime(targetTimestamp * 1000 - Date.now());
    };

    const intervalId = setInterval(updateRemainingTime, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [targetTimestamp]);

  const formatTime = (time: number): string => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const days = Math.floor(time / (1000 * 60 * 60 * 24));

    return `${days}:${hours}:${minutes}:${seconds}`;
  };

  return { remainingTime, formatTime };
}
