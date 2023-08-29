
import { createContext, useContext } from "react";

export const AuthContext = createContext({
    user: undefined,
    isLoading: true,
    setUser: () => {},
});

export const useAuthContext = () => useContext(AuthContext);
