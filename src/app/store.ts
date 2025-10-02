import { create } from 'zustand'
import { getToken, Token } from './utils';

enum Roles {
    Demo = "Demo",
    Lottery = "Lottery",
    Family = "Family",
    Recurse = "Recurse",
    Girls = "Girls",
    None = "None"
}

type User = {
    role: Roles,
    username: string,
    accessToken: string,
    refreshToken: string,
}

type AuthStore = {
    user: User;
    authenticated: boolean,

    actions: {
        login: (accessToken: string, refreshToken: string) => void;
        logout: () => void;
        isAuth: () => boolean;
        setUser: (user: User) => void;
    }
};


const loginUser = (accessToken: string, refreshToken: string) => {



    localStorage.setItem('access-token', accessToken)
    localStorage.setItem('refresh-token', refreshToken)
}

const logoutUser = () => {
    localStorage.removeItem('access-token')
    localStorage.removeItem('refresh-token')
}

// checks if expired 
const isAuthenticated = (): boolean => {
    const isAuth = getToken('access-token');
    if(isAuth) return true
    else return false
} 


const useAuthStore = create<AuthStore>((set) => ({
  user: {
    role: Roles.None,
    username: '',
    accessToken: '',
    refreshToken: ''
    },
    authenticated: false,
    actions: {
        isAuth: isAuthenticated, 
        login: loginUser,
        logout: logoutUser,
        setUser: (user: User) =>set({user})
  }
}))


// Hooks
// export const useAccessToken = () => useAuthStore(accessTokenSelector);
// export const useAccessTokenData = () => useAuthStore(accessTokenDataSelector);
// export const useRefreshToken = () => useAuthStore(refreshTokenSelector);
// export const useActions = () => useAuthStore(actionsSelector);

export default useAuthStore;