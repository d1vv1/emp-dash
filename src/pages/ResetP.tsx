import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiBase } from "./Login.tsx";
import { useNavigate } from 'react-router-dom'
import './Login.css'

const emailSchema = z.object({
    email: z.string()
        .email({message: "Invalid email address"})
        .max(43, {message: "Invalid email address"})
        .refine(
            (val) => val.endsWith("edvenswatech.com") || val.endsWith("edvenswatech.in"),
            {message: "Invalid Company email"}
        ),
})


type EmailFormFields = z.infer<typeof emailSchema>


function ResetP() {


    const navigate = useNavigate();

    const {
        register: registerEmail,
        handleSubmit: handleSubmitEmail,
        setError: setEmailError,
        formState: { errors: emailErrors, isSubmitting: isEmailSubmitting }
    } = useForm<EmailFormFields>({ resolver: zodResolver(emailSchema) });


    const sendResetRequest: SubmitHandler<EmailFormFields> = async (data) => {


        try {

            const response = await fetch(apiBase + 'change', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            })

            const status = await response.json()
            console.log(status)

            if(response.status === 201) {
                console.log("status:", status);
                navigate("/otp")
            } else {
                throw new Error("User does not exist");
            }

        } catch (error) {
            setEmailError("root", {
                message: `Error: ${error} nigg`,
            })
        }
    }


    return(
        <div className="form-bg">
            <form onSubmit={handleSubmitEmail(sendResetRequest)}>
                <h1>Password Reset</h1>

                {emailErrors.root && (<p>{emailErrors.root.message}</p>)}

                <div className="group">
                    <input type="text" {...registerEmail("email")} placeholder="Email"/>
                    { emailErrors.email && (<p>{emailErrors.email.message}</p>) }
                </div>

                <button disabled={isEmailSubmitting} type="submit">
                    {isEmailSubmitting ? "Loading..." : "Request Password Reset"}
                </button>

            </form>
        </div>
    )
}

export default ResetP;
