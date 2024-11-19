import { useRef, useEffect, useCallback } from "react";

type Timer = ReturnType<typeof setTimeout>;
type SomeFunction = (...args: any[]) => void;

/**
 * Custom hook for debouncing a function.
 *
 * @param func The function to debounce (can accept any number of arguments)
 * @param delay Delay (in ms) after which the function will execute if there are no new calls
 * @returns A debounced version of the function
 */
export function useDebounce<Func extends SomeFunction>(
  func: Func,
  delay = 1000
) {
  const timer = useRef<Timer>();

  useEffect(() => {
    // Cleanup the timer when the component unmounts
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  const debouncedFunction = useCallback(
    ((...args: Parameters<Func>) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        func(...args);
      }, delay);
    }) as Func,
    [func, delay]
  );

  return debouncedFunction;
}

export {};
