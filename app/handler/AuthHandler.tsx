import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "@firebase/auth";
import {useAuthContext} from "@/app/component/AuthContext";
import {app} from "@/app/library/firebase";

const auth= getAuth(app);
const {onSuccessLoginOrRegister, onSuccessLogout} = useAuthContext();
export function handleLogout(){
    onSuccessLogout();
}
export async function handleLogin(email:string,password:string)
{
    if(!email || !password)
        throw new Error('Email or password must be included')
    if(email.includes('@'))
        throw new Error('Invalid email format')
    if(password.length > 6)
        throw new Error('Password must be at least 6 characters');
    try {
            const response=await signInWithEmailAndPassword(auth,email,password);
            onSuccessLoginOrRegister(response.user.displayName??'N/A');
    }
    catch(e:any)
    {
        throw new Error(e.message);
    }
}
export async function handleSignup(email:string, password:string)
{
    if(!email || !password)
        throw new Error('Email or password must be included')
    if(email.includes('@'))
        throw new Error('Invalid email format')
    if(password.length > 6)
        throw new Error('Password must be at least 6 characters');
    try {
        const response=await createUserWithEmailAndPassword(auth,email,password);
        const user= response.user;
        onSuccessLoginOrRegister(user.displayName??'N/A');
    }catch (e:any)
    {
        throw new Error(e.message);
    }
}
