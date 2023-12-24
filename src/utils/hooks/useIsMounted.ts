import { useEffect, useState } from "react";

export const useIsMounted = () => {
  //state based hook
  const [isMounted, setIsMounted] = useState(false);
  //useEffect hook
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  //return isMounted
  return isMounted;
};
