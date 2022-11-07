import { useContext } from "react"
import { AuthContext } from '../context/auth.context';

export const useAuth = () => {
    const { loggedUser, token, onLogin, onLogout } = useContext(AuthContext)

    return {
        token,
        loggedUser,
        onLogin,
        onLogout,
    }
}