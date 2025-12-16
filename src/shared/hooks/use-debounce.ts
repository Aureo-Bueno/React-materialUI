import { useCallback, useRef } from "react";

export function useDebounce(delay = 500) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const debounce = useCallback(
    (callback: () => void) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(callback, delay);
    },
    [delay]
  );

  return { debounce };
}
