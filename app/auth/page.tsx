"use client";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import {
    browserLocalPersistence,
    createUserWithEmailAndPassword,
    getAuth,
    setPersistence,
    signInWithEmailAndPassword,
    validatePassword
} from "@firebase/auth";
import {app} from "@/app/library/firebase";
import {useAuthContext} from "@/app/component/AuthContext";
import Link from "next/link";

function AuthPageContent() {
    const searchParams = useSearchParams();
    const action = searchParams.get('action');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = getAuth(app);
    const router = useRouter();
    const {authenticated,name,onSuccessLoginOrRegister,onSuccessLogout} = useAuthContext();
    
    const onLogin = async () => {
        if(!email.includes('@'))
        {
            throw new Error('Invalid email format');
        }
        try {
            const response = await signInWithEmailAndPassword(auth,email,password);

            onSuccessLoginOrRegister(response.user.displayName??'N/A');
            await setPersistence(auth, browserLocalPersistence)
            setTimeout(()=>{router.push('/workspace');},1);
        }catch(e:any)
        {
            setError(e.message);
            return;
        }
    }
    
    const onSignup = async () => {
        if(!email.includes('@'))
        {
            throw new Error('Invalid email format');
        }
        try {
            await isValidatedPassword(password);
        }catch(e:any)
        {
            setError(e.message);
            return;
        }

        try {
            const response = await createUserWithEmailAndPassword(auth,email,password);
            onSuccessLoginOrRegister(response.user.displayName??'N/A');
            setTimeout(()=>{
                router.push('/workspace');
            },1);
        }catch(e:any)
        {
            setError(e.message);
            return;
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
                <div className="flex flex-row gap-4">
                    <button
                        onClick={onLogin}
                        className="px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-600"
                    >
                        Login
                    </button>

                    <Link href="/auth?action=signup">
                        <button
                            className="px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-600"
                        >
                            Register
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    if (action === "signup") {
        return (
            <div className=" w-screen h-full flex flex-col gap-2 items-center justify-center align-center">
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
                    onClick={onSignup}
                    className="px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-600"
                >
                    Register
                </button>
            </div>
        );
    }

    return (
        <div className=" w-full h-full flex justify-center content-center text-2xl text-amber-300 font-bold">Are you missing something?</div>
    );
}

export default function AuthPage() {
    return (
        <Suspense fallback={<div className="w-screen h-screen flex justify-center items-center">Loading...</div>}>
            <AuthPageContent />
        </Suspense>
    );
}