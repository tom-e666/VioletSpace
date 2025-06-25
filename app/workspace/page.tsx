'use client'
import {useAuthContext} from "@/app/component/AuthContext";
export default function WorkSpace() {
    const {authenticated,name} = useAuthContext();
    return (
        <div>This is the workspace, {authenticated?name:"not auth"}</div>
    )
}