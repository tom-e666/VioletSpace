"use client"
import {useAuthContext} from "@/app/component/AuthContext";
import Link from "next/link";
import {handleLogout} from "@/app/handler/AuthHandler";

export default function Header() {
    const {authenticated, name} = useAuthContext();
    
    if(!authenticated) {
        return (
            <div className="absolute top-0 w-screen h-16 bg-gradient-to-b from-purple-900 to-gray-950 flex flex-row gap-2 items-center px-6">
                <button className="px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-600">
                  <Link href="/auth?login">Login</Link>
                </button>
                <button className="px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-600">
                  <Link href="/about-us">About us</Link>
                </button>
            </div>
        );
    }
    
    return (
        <div className="relative top-0 w-screen h-16 bg-gradient-to-b from-purple-900 to-gray-950 flex flex-row justify-between items-center px-6">
            <div>Hello {name}! Hope you have a nice day</div>
            <div>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-600"
                >
                  Logout
                </button>
            </div>
        </div>
    );
}