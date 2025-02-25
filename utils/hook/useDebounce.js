import { useState, useEffect } from "react";

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler); // ล้าง Timeout ถ้ามีการเปลี่ยนแปลงก่อน 1 วินาที
  }, [value, delay]);

  return debouncedValue;
}
