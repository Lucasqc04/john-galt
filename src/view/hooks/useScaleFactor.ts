import { useEffect, useState } from 'react';

export function useScaleFactor() {
  const [scaleFactor, setScaleFactor] = useState(1);

  useEffect(() => {
    const ratio = window.devicePixelRatio;
    if (ratio > 1) {
      setScaleFactor(ratio);
    }
  }, [scaleFactor]);

  return {
    scaleFactor,
  };
}
