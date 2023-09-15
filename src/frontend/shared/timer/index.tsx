import { useCountdown } from "@frontend/utils";

interface ITimerProps {
  initialTimer: number;
  callback: () => void;
  className?: string;
}

function Timer({ initialTimer, callback, className }: ITimerProps) {
  const { minutes, seconds } = useCountdown(initialTimer, callback);
  return (
    <span className={className}>
      {minutes}:{seconds}
    </span>
  );
}

export { Timer };
