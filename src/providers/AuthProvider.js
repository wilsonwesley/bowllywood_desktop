import { useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import jwt_decode from "jwt-decode";

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const checkStorage = () => {
    const currentTokens = localStorage.getItem("userTokens");
    if (currentTokens) {
      return currentTokens;
    } else {
      return false;
    }
  }
  useEffect(() => {
    if (checkStorage() && !auth) {
      const tokens = checkStorage();
      const decodedToken = jwt_decode(JSON.parse(tokens).token);
      const userID = decodedToken.id;
      const userROLE = decodedToken.roleID;

      let userInfos = {
        userId: userID,
        role: userROLE,
      };
      setAuth(userInfos);
    }
  }, [auth, setAuth])

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
