import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useEffect } from "react";

const useCheckAuth = () => {
  const { user, isAuthenticated, isLoading } = useKindeAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
        window.location.href='/'
    }
  }, [isLoading, isAuthenticated]);

  return user;
};

export default useCheckAuth;
