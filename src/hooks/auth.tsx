import React, { createContext, useCallback, useContext, useState } from 'react'
import api from '../services/api'
import noPhotoUSer from '../assets/no-photo.png'


interface signInData {
    password: string;
    email: string;
}

interface User {
    id: string;
    name: string;
    avatar_url: string;
    email:string;
}


interface AuthContextData {
    user: User;
    signIn(credentials: signInData): Promise<void>
    signOut(): void
    updateUser(user:User):void

}

interface userAuthData {

    token: string;
    user: User;
}

const AuthContext = createContext({} as AuthContextData) // Hackzinho para inicializar o contexto

const AuthProvider: React.FC = ({ children }) => {

    const [authData, setAuthData] = useState<userAuthData>(() => {

        const token = localStorage.getItem('@BarberApp:token')
        const user = localStorage.getItem('@BarberApp:user')

        if (token && user) {

            api.defaults.headers.authorization = `Bearer ${token}`
            return { token, user: JSON.parse(user) }



        }

        return {} as userAuthData

    })

    const signIn = useCallback(async ({ email, password }) => {

        const response = await api.post('sessions', {
            email,
            password,
        })


        const { user, token } = response.data
// my code here
        if (!user.avatar_url){
            user.avatar_url = noPhotoUSer
        }

        localStorage.setItem('@BarberApp:token', token);
        localStorage.setItem('@BarberApp:user', JSON.stringify(user))
        api.defaults.headers.authorization = `Bearer ${token}`
        setAuthData({ user, token })
    }, [])

    const updateUser = useCallback((user:User)=>{

        localStorage.setItem(`@BarberApp:user`, JSON.stringify(user))

        setAuthData({
            token:authData.token,
            user,
        })

    },[authData.token])

    const signOut = useCallback(() => {

        localStorage.removeItem('@BarberApp:token')
        localStorage.removeItem('@BarberApp:user')

        setAuthData({} as userAuthData)


    }, [])
    return (
        <AuthContext.Provider value={{ user: authData.user, signIn, signOut, updateUser }}>
            {children}
        </AuthContext.Provider>
    )

}

function useAuth(): AuthContextData {
    const context = useContext(AuthContext)

    if (!context) {

        throw new Error('useAuth must be used within an AuthProvider ')

    }

    return context;
}




export { useAuth, AuthProvider }