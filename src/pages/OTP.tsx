import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from 'react-router-dom'
import './Login.css'
import {apiBase} from "./Login.tsx";


const mergedSchema = z.object({
    email: z.string()
        .email({ message: "Invalid email address" })
        .max(43, { message: "Invalid email address" })
        .refine(
            (val) => val.endsWith("edvenswatech.com") || val.endsWith("edvenswatech.in"),
            { message: "Invalid Company email" }
        ),

    otp: z.string()
        .length(6, { message: "OTP must be 6 digits" }),

    resetPass: z.string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(50, { message: "Password is too long" })
        .refine((val) => /[a-z]/.test(val), {
            message: "Must contain at least one lowercase letter",
        })
        .refine((val) => /[A-Z]/.test(val), {
            message: "Must contain at least one uppercase letter",
        })
        .refine((val) => /[0-9]/.test(val), {
            message: "Must contain at least one number",
        })
        .refine((val) => /[^\w\s]/.test(val), {
            message: "Must contain at least one special character",
        }),

    confPass: z.string(),
}).refine((data) => data.resetPass === data.confPass, {
    path: ["confPass"],
    message: "Passwords do not match",
});



type mergedFields = z.infer<typeof mergedSchema>;

function OTP() {


    const navigate = useNavigate();


    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<mergedFields>({ resolver: zodResolver(mergedSchema) });

    const validateOTP: SubmitHandler<mergedFields> = async (data) => {

        try {

            const response = await fetch(apiBase + 'change/reset-password', {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            })

            console.log(data);
            const status = await response.json();

            if (response.status === 200) {
                //logout user
                console.log("status:", status);
                navigate("/");
            } else {
                throw new Error("OTP expired or not found");
            }


        } catch (error) {
            setError("root", {
                message: `Error: ${error}`,
            })
        }
    }



    return (
        <div className="form-bg">
            <form onSubmit={handleSubmit(validateOTP)}>
                <h1>Enter OTP</h1>

                {errors.root && (<p>{errors.root.message}</p>)}

                <div className="group">
                    <input type="text" {...register("email")} placeholder="email"/>
                    {errors.email && (<p>{errors.email.message}</p>)}
                </div>

                <div className="group">
                    <input type="text" {...register("otp")} placeholder="OTP"/>
                    {errors.otp && (<p>{errors.otp.message}</p>)}
                </div>

                <div className="group">
                    <input type="text" {...register("confPass")} placeholder="New password"/>
                    {errors.confPass && (<p>{errors.confPass.message}</p>)}
                </div>

                <div className="group">
                    <input type="text" {...register("resetPass")} placeholder="Confirm password"/>
                    {errors.resetPass && (<p>{errors.resetPass.message}</p>)}
                </div>

                <button disabled={isSubmitting} type="submit">
                    {isSubmitting ? "Loading..." : "Submit"}
                </button>
            </form>


        </div>
    )
}

export default OTP;
