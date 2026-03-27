
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [userToken,setUserToken] = useState(localStorage.getItem("token"));

    const login = (token) => {
        localStorage.setItem("token", token);
        setUserToken(token);
    }
    const logout = () =>{
        localStorage.removeItem("token");
        setUserToken(null);
    };

    return(
        <AuthContext.Provider value={{userToken, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;