import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuth = () => {
    const { login, logout, user } = useContext(AuthContext)

    return {
        login,
        logout,
        user
    }
}

export default useAuth