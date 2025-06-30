import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import './Login.css'

export const apiBase = '/';

const schema = z.object({
    email: z.string()
        .email({message: "Invalid email address"})
        .max(43, {message: "Invalid email address"})
        .refine(
            (val) => val.endsWith("edvenswatech.com") || val.endsWith("edvenswatech.in"),
            { message: "Invalid Company email" }
        ),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(50, { message: "Password is too long" })
        .refine((val) => /[a-z]/.test(val), {
            message: "Password must contain at least one lowercase letter",
        })
        .refine((val) => /[A-Z]/.test(val), {
            message: "Password must contain at least one uppercase letter",
        })
        .refine((val) => /[0-9]/.test(val), {
            message: "Password must contain at least one number",
        })
        .refine((val) => /[^\w\s]/.test(val), {
            message: "Password must contain at least one special character",
        }),
});

type FormFields = z.infer<typeof schema>

function Login() {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<FormFields>({resolver: zodResolver(schema)});


    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            const response = await fetch(apiBase + "auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data),
            })
            const potentialToken = await response.json();

            if (potentialToken.token) {
                const token = potentialToken.token;

                localStorage.setItem("token", token);

                navigate("/pages");
            } else {
                throw new Error("Failed to authenticate");
            }

        } catch (error) {
            setError("root", {
                message: `Error: ${error}`,
            });
        }
    }

    const forgot = () => {
        navigate("/reset");
    }
    
    
    return (
        <div className="form-bg">
            <form onSubmit={handleSubmit(onSubmit)}>

                <h1>Login</h1>

                {errors.root && (<p>{errors.root.message}</p>)}

                <div className="group">
                    <input type="text" {...register("email")} placeholder="Email" />
                    { errors.email && (<p>{errors.email.message}</p>) }
                </div>

                <div className="group">
                    <input type="password" {...register("password")} placeholder="Password" />
                    {(errors.password) && (<p>{errors.password.message}</p>)}
                </div>

                <span onClick={forgot}>Forgot Password</span>

                <button disabled={isSubmitting} type="submit">
                    {isSubmitting ? "Loading..." : "Submit"}
                </button>
            </form>
        </div>
    )

}

export default Login;
