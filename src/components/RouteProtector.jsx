import { useContext, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const RouteProtector = ({children}) => {
    const authContext = useContext(AuthContext);
    const location = useLocation();
    console.log(authContext);

    useEffect(() => {
        const currentTokens = localStorage.getItem('userTokens')
        if (currentTokens) {
            authContext.setAuth(currentTokens);
        }
    },[])

    return (
        authContext.auth ? children : <Navigate to="/login" state={{ from: location }} replace />
    )

}

export default RouteProtector