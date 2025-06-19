'use client'

import {getAuth, updateProfile} from "@firebase/auth";
import {useAuthContext} from "@/app/component/AuthContext";
import {app} from "@/app/library/firebase";
import {useState} from "react";
interface NameModalProps {
    isOpenModal: boolean;
    setIsOpenModal: (value: boolean) => void;
}

export default function NameModal({ isOpenModal, setIsOpenModal }: NameModalProps) {
    if (!isOpenModal) return <></>;
    const auth= getAuth(app);
    const [newName, setNewName] = useState('');
    const [error, setError] = useState('');
    const handleNameChange = async () => {
        if(!auth.currentUser) {
            setError('You are not logged in');
            return;
        }
        try {
            await updateProfile(auth.currentUser,
                {
                    displayName: newName,
                })
            setTimeout(()=>{setError("Success. Change will take place on the next cession")},1);
        }catch(e:any)
        {
            setError(e.message);
            return;
        }
    }

    return (
        <div className="absolute flex flex-col gap-4 z-20 w-fit px-16 h-96 py-2 bg-black border-white border-1 border-dashed rounded-xl">
            <div className="font-bold flex justify-center text-2xl">Change your name</div>
            <input
                type="text"
                placeholder="insert your new name"
                className="border-dashed border-1 border-white rounded-xl p-2 min-w-96"
                onChange={(e) => setNewName(e.target.value)}
            />
            <button
                className="text-white bg-black border-1 border-white border-dashed rounded-xl p-2 px-4 w-fit hover:bg-white hover:text-black"
                onClick={handleNameChange}
            >
                update
            </button>
            <button
                className="text-white bg-black border-1 border-white border-dashed rounded-xl p-2 px-4 w-fit hover:bg-white hover:text-black"
                onClick={() => { setIsOpenModal(false); }}
            >
                close
            </button>
            <div className="text-red-600">{error}</div>
        </div>
    )
}