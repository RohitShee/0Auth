import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from "react-hot-toast";
export const authStore = create((set) => ({
    user : null,
    isSigningUp : false,
    isLoggingIn : false,
    isCheckingAuth : true,
     signup : async(data) =>{
        set({isSigningUp : true})
        try {
            const res = await axiosInstance.post('client/signup',data);
            console.log(res.data)
            set({user: res.data});
            toast.success('Account created Successfully');
        } catch (error) {
            toast.error(error.response.data.detail)
        }finally{
            set({isSigningUp : false})
        }
    },
     login : async(data) =>{
        set({isLoggingIn : true});
        try {
            
            const res = await axiosInstance.post('client/login',data);
            console.log(res)
            set({user : res.data});
            toast.success('Logged In Successfully');
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.detail)
        }finally{
            set({isLoggingIn : false})
        }
    },

}));