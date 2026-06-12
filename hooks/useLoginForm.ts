import {useForm} from "react-hook-form";
import { LoginFormData } from "../types/loginFormData.types";




export const useLoginForm = ()=>{
    const {register, handleSubmit, formState: {errors}} = useForm<LoginFormData>();

    return {
        register,
        handleSubmit,
        errors,
        defaultValues: {
            email: "",
            password: ""
        }
    }



}