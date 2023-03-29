import { useContext, useEffect } from "react";
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import jwt_decode from "jwt-decode";
// import { AuthContext } from "../contexts/AuthContext";

const RouteProtector = ({permittedRoles, children}) => {
    const authContext = useContext(AuthContext),
        [isAllowed, setIsAllowed] = useState(false),
        [auth, setAuth] = useState({});

    const location = useLocation();

    debugger

    useEffect(() => {
        const currentTokens = localStorage.getItem('userTokens')
        if (currentTokens) {
            const currentTokenObj = JSON.parse(currentTokens);
            const decodedToken = jwt_decode(currentTokenObj.token);
            setAuth(decodedToken)
        }

        // user only needs to be connected 
        // OR need to be connected and have those roles 
        if (currentTokens && permittedRoles.length == 0)
        || (currentTokens && permittedRoles.includes(auth.roles)) {
            setIsAllowed(true)
        }

    },[])

    const RenderPage = (children) => (children) ? children : <Outlet />

    const NavigatePage = (permittedRoles) => {
        return (
        (permittedRoles.length === 0) // means the user only needed to be connected.
        ? <Navigate to="/login" state={{ from: location }} replace />
        : <Navigate to="/erreur" state={{ code: 401, message: "Vous n'êtes pas autorisé à accéder à cette page." }} replace />;
      )
    }

    return (isAllowed) ? <RenderPage children={children} /> : <NavigatePage permittedRoles={permittedRoles} />;
}

/*const RouteProtector = ({children}) => {
    const authContext = useContext(AuthContext);
    const location = useLocation();

    useEffect(() => {
        const currentTokens = localStorage.getItem('userTokens')

        if (currentTokens) {
            authContext.setAuth(currentTokens);
        }
    },[])

    return (
        authContext.auth ? children : <Navigate to="/login" state={{ from: location }} replace />
    )
}*/

export default RouteProtector;