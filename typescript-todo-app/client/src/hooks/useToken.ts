import { useState, useEffect } from "react";

function useToken() {
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenString = localStorage.getItem("token");
    if (tokenString) {
      setAuthToken(tokenString);
    }
  }, []);

  const updateToken = (tokenString: string) => {
    setAuthToken(tokenString);
    localStorage.setItem("token", tokenString);
  };

  return {
    token: authToken,
    setToken: updateToken
  };
}

export default useToken;
