import { useEffect, useState } from "react";

const parseZero = (value: number) => (value < 10 ? `0${value}` : `${value}`);

const getReturnValues = (countDown: number) => {
  const days = parseZero(Math.floor(countDown / (1000 * 60 * 60 * 24)));
  const hours = parseZero(
    Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  );
  const minutes = parseZero(
    Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60))
  );
  const seconds = parseZero(Math.floor((countDown % (1000 * 60)) / 1000));

  return { days, hours, minutes, seconds };
};

const useCountdown = (targetDate: number, callback: () => void) => {
  const [countDown, setCountDown] = useState(targetDate - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      if (targetDate - new Date().getTime() <= 0) {
        callback();
      }

      setCountDown(targetDate - new Date().getTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return getReturnValues(countDown);
};

export { useCountdown };
