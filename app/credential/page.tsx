'use client'
import Link from "next/link";
import {useAuthContext} from "@/app/component/AuthContext";
import {JSX, useState} from "react";
import NameModal from "@/app/credential/NameModal";
import PasswordModal from "@/app/credential/PasswordModal";
export default function CredentialPage() {
    const {authenticated,name} = useAuthContext();
    const [isOpenModal,setIsOpenModal] = useState(false);
    const [modalContent,setModalContent] = useState<JSX.Element>();
    const setIsOpenModalAction =(value:boolean) => {
        setIsOpenModal(value);
    }
    if(!authenticated) return (
        <div className="w-screen h-screen flex flex-col gap-2 items-center justify-center content-center bg-black">
            <div className="text-3xl">This page isn't for you!</div>
            <Link href="/auth?action=login" type="button" className="text-white border-1 p-2 rounded-xl hover:text-black hover:bg-white">Login</Link>
        </div>
    )
    return (
        <div className="w-full h-full flex flex-col gap-4 items-center justify-center content-center bg-black
">
            <h3 className="text-3xl">Never put ur faith on us! 🔥</h3>
            <div>Your name:
                <input type="text" value={name} className="text-white border-1 border-dashed p-2 rounded-xl ml-4" disabled={true}/>
            </div>
            <button
                className="px-4 py-2 rounded-xl bg-gray-200 text-black hover:bg-black hover:text-white"
                onClick={()=>{setIsOpenModal(true);setModalContent(<NameModal isOpenModal={isOpenModal} setIsOpenModalAction={setIsOpenModalAction} />);}}
            >Update your name</button>
            <button className="px-4 py-2 rounded-xl bg-gray-200 text-black hover:bg-black hover:text-white"
            onClick={()=>{setIsOpenModal(true);setModalContent(<PasswordModal isOpenModal={isOpenModal} setIsOpenModalAction={setIsOpenModalAction} />);}}
            >Update your password</button>

            {isOpenModal &&
                    modalContent
                }
        </div>
    )
}