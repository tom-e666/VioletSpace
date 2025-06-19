'use client';

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, validatePassword} from "@firebase/auth";
import {app} from "@/app/library/firebase";
import {useAuthContext} from "@/app/component/AuthContext";

export default function AuthPage() {
    const searchParams = useSearchParams();
    const action = searchParams.get('action');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = getAuth(app);
    const {authenticated,name,onSuccessLoginOrRegister,onSuccessLogout} = useAuthContext();
    const handleLogin = async (email:string,password:string) => {
        if(!email.includes('@'))
        {
            throw new Error('Invalid email format');
        }
        try {
            const response = await signInWithEmailAndPassword(auth,email,password);
            onSuccessLoginOrRegister(response.user.displayName??'N/A');
        }catch(e:any)
        {
            throw new Error(e.message);
        }
    }
    const handleSignup = async (email:string, password:string) => {
        if(!email.includes('@'))
        {
            throw new Error('Invalid email format');
        }
        try {
            const response = await createUserWithEmailAndPassword(auth,email,password);
            onSuccessLoginOrRegister(response.user.displayName??'N/A');
        }catch(e:any)
        {
            throw new Error(e.message);
        }
    }
    const isValidatedPassword =async (password:string) => {
        const status= await validatePassword(auth,password);
        if(!status.isValid)
        {
            throw new Error('Invalid password. Password must be at least 6 characters, contain at least one uppercase letter, one lowercase letter, and one number.');
        }
        return true;
    }
    const onLogin = async () => {
        try {
            setError('');
            await handleLogin(email, password);
        } catch (e: any) {
            setError(e.message);
        }
    };

    const onSignup = async () => {
        try {
            setError('');
            await handleSignup(email, password);
        } catch (e: any) {
            setError(e.message);
        }
    };

    if (action === "login") {
        return (
            <div className=" w-screen h-screen flex flex-col gap-2 items-center justify-center content-center">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-3 py-2 border rounded min-w-64"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="px-3 py-2 border rounded min-w-64"
                />
                {error && <div className="text-red-500">{error}</div>}
                <button
                    onClick={onLogin}
                    className="px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-600"
                >
                    Login
                </button>
            </div>
        );
    }

    if (action === "signup") {
        return (
            <div className="flex flex-col gap-2 items-center">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-3 py-2 border rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="px-3 py-2 border rounded"
                />
                {error && <div className="text-red-500">{error}</div>}
                <button
                    onClick={onSignup}
                    className="px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-600"
                >
                    Register
                </button>
            </div>
        );
    }

    return (
        <div className="text-2xl text-amber-300 font-bold">Are you missing something?</div>
    );
}