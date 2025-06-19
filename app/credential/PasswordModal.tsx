'use client'

import {getAuth, updatePassword, validatePassword} from "@firebase/auth";
import {app} from "@/app/library/firebase";
import {useState} from "react";
interface NameModalProps {
    isOpenModal: boolean;
    setIsOpenModal: (value: boolean) => void;
}

export default function PasswordModal({ isOpenModal, setIsOpenModal }: NameModalProps) {
    if (!isOpenModal) return <></>;
    const auth= getAuth(app);
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const isValidatedPassword =async (password:string) => {
        const status= await validatePassword(auth,password);
        if(!status.isValid)
        {
            throw new Error('Invalid password. Password must be at least 6 characters, contain at least one uppercase letter, one lowercase letter, and one number.');
        }
        return true;
    }
    const handlePasswordChange = async () => {

        if(!auth.currentUser) {
            setError('You are not logged in');
            return;
        }
        if(newPassword !== newPasswordConfirm)
        {
            setError('Passwords do not match');
            return;
        }
        try {
            await isValidatedPassword(newPassword);
        }catch(e:any)
        {
            setError(e.message);
            return;
        }
        try {
            await updatePassword(auth.currentUser,newPassword);
            setTimeout(()=>{setError("Success. Change will take place on the next cession")},1);
        }catch(e:any)
        {
            setError(e.message);
            return;
        }
    }
    return (
        <div className="absolute flex flex-col gap-4 z-20 w-fit px-16 h-96 py-2 bg-black border-white border-1 border-dashed rounded-xl">
            <div className="font-bold flex justify-center text-2xl">Change your password</div>
            <input
                type="password"
                placeholder="insert your new password"
                className="border-dashed border-1 border-white rounded-xl p-2 min-w-96"
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="confirm your new password"
                className="border-dashed border-1 border-white rounded-xl p-2 min-w-96"
                onChange={(e) => setNewPasswordConfirm(e.target.value)}
            />
            <div
            className="flex flex-row gap-4 items-center justify-center"
            >
                <button
                    className="text-white bg-black border-1 border-white border-dashed rounded-xl p-2 px-4 w-fit hover:bg-white hover:text-black"
                    onClick={handlePasswordChange}
                >
                    update
                </button>
                <button
                    className="text-white bg-black border-1 border-white border-dashed rounded-xl p-2 px-4 w-fit hover:bg-white hover:text-black"
                    onClick={() => { setIsOpenModal(false); }}
                >
                    close
                </button>
            </div>

            <div className="text-red-600">{error}</div>
        </div>
    )
}