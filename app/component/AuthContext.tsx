"use client"
import {createContext, useContext, useState} from 'react';

interface AuthContextProps {
    authenticated: boolean;
    name: string;
    onSuccessLoginOrRegister: (newName: string) => void;
    onSuccessLogout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({children}: {children: any}) {
    const [authenticated, setAuthenticated] = useState(false);
    const [name, setName] = useState('N/A');
    
    const onSuccessLoginOrRegister = (newName: string) => {
        setAuthenticated(true);
        setName(newName);
    };
    
    const onSuccessLogout = () => {
        setAuthenticated(false);
        setName('N/A');
    };
    
    const contextValue: AuthContextProps = {
        authenticated,
        name,
        onSuccessLoginOrRegister,
        onSuccessLogout,
    };
    
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext(): AuthContextProps {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within a AuthProvider');
    }
    return context;
}