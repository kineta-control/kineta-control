import { useEffect, useState } from 'react';

function readStoredValue<T extends object>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return { ...fallback, ...(JSON.parse(raw) as Partial<T>) } as T;
  } catch (error) {
    console.warn(`localStorage konnte für "${key}" nicht gelesen werden:`, error);
    return fallback;
  }
}

export function useLocalStorage<T extends object>(
  key: string,
  fallback: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => readStoredValue(key, fallback));

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`localStorage konnte für "${key}" nicht geschrieben werden:`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
