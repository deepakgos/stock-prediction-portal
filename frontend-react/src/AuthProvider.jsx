import { useState, useContext, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) =>{
    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem('accessToken')//!! converts a truthy or falsy value to true or false
    );
    return (
        <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
export {AuthContext};