import {useBoolean} from "@/hooks/primitive/use-boolean";
import useInteger from "@/hooks/primitive/use-integer";
import {useEffect} from "react";

const useTimer = () => {
  const timer = useInteger(10);
  const isTimerActive = useBoolean(false);

  // Start the timer when the resend button is pressed
  useEffect(() => {
    let interval: NodeJS.Timeout | number | null = null;
    if (isTimerActive && timer.value > 0) {
      interval = setInterval(() => {
        timer.onChangeValue(timer.value - 1);
      }, 1000);
    } else if (timer.value === 0) {
      isTimerActive.onFalse();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, timer]);

  return {
    timer,
    isTimerActive,
  }
}

export default useTimer;
