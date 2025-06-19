"use client"
import {useAuthContext} from "@/app/component/AuthContext";
import Link from "next/link";

export default function Header() {
    const {authenticated, name} = useAuthContext();
    const {onSuccessLogout} = useAuthContext();
    if(!authenticated) {
        return (
            <div className="relative top-0 w-screen h-16 bg-black border-b border-gray-700 flex flex-row gap-2 items-center px-6 justify-end">
                <button className="px-4 py-2 rounded-xl text-gray-400 hover:text-black hover:bg-white">
                  <Link href="/auth?action=login">Login</Link>
                </button>
                <button className="px-4 py-2 rounded-xl text-gray-400 hover:text-black hover:bg-white">
                  <Link href="/about-us">About us</Link>
                </button>
            </div>
        );
    }
    return (
        <div className="relative top-0 w-screen h-16 bg-black border-b border-gray-700 flex flex-row gap-4 items-center px-6 justify-end">

                <Link href="/credential">
                    <div
                        className="px-4 py-2 rounded-xl text-white hover:text-black hover:bg-white"                >
                        Hello {name}! Hope you have a nice day</div>
                    </Link>
                <button 
                  onClick={onSuccessLogout}
                  className="px-4 py-2 rounded-xl text-white hover:text-black hover:bg-white"                >
                  Logout
                </button>
        </div>
    );
}