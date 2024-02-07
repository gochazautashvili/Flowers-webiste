import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null)

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        if (localStorage.key('user')) {
            setUser(JSON.parse(localStorage.getItem("user")))
        }
    }, [])

    const login = (data) => {
        localStorage.setItem("user", JSON.stringify(data))
        setUser(data)
    }

    const logout = () => {
        localStorage.removeItem("user")
        setUser(null)
        window.location.reload()
    }

    const AuthValue = {
        login,
        logout,
        user
    }

    return (
        <AuthContext.Provider value={AuthValue}>{children}</AuthContext.Provider>
    )
}