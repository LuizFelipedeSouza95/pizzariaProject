import { createContext, ReactNode, useState, useEffect } from 'react';
import { api } from '../services/apiClient'
import { toast, Zoom } from 'react-toastify';
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router';

type AuthContextData = {
    user: UserProps | undefined;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    singOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type SignUpProps = {
    name: string;
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function singOut() {
    try {
        destroyCookie(undefined, '@nextAuth.token')
        Router.push('/')
    } catch (error) {
        console.log('erro ao deslogar');

    }
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user;

    useEffect(() => {

        const { '@nextAuth.token': token } = parseCookies();
        if (token) {
            api.get('/me').then(response => {
                const { id, name, email } = response.data;

                setUser({
                    id,
                    name,
                    email
                })
            })
            .catch(() => {
                singOut();
            })

        }
    })

    async function signIn(credentials: SignInProps) {
        try {
            const response = await api.post('/session', {
                email: credentials.email,
                password: credentials.password
            })

            const { id, name, token } = response.data
            setCookie(undefined, '@nextAuth.token', token, {
                maxAge: 69 * 60 * 24 * 30, // 1 mes
                path: "/"
            })

            setUser({
                id,
                name,
                email: credentials.email
            })

            api.defaults.headers['Authorization'] = `Bearer ${token}`

            toast.success('Logado com sucesso!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                transition: Zoom
            });

            Router.push('/dashboard')

        } catch (error) {
            toast.error('Erro ao acessar!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
        }
    }

    async function signUp(credentials: SignUpProps) {
        try {
            const response = await api.post('/users', {
                name: credentials.name,
                email: credentials.email,
                password: credentials.password
            })
            toast.success('Conta criada com sucesso!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                transition: Zoom
            });

            Router.push('/')
        } catch (error) {
            toast.error('Erro ao cadastrar!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, singOut, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}
