import { useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import jwt_decode from "jwt-decode";



export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const currentTokens = localStorage.getItem('userTokens')
        if (currentTokens) {
            const currentTokenObj = JSON.parse(currentTokens);
            const decodedToken = jwt_decode(currentTokenObj.token);
            const userID = decodedToken.id;
            console.log(userID);
            setAuth({userID});
        }
    },[])

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
