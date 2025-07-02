import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import './Login.css'
import { loginSchema } from "../templates/validationSchema.ts";
import axios from "axios";

export const apiBase = '/';

type FormFields = typeof loginSchema._type;

function Login() {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<FormFields>({resolver: zodResolver(loginSchema)});


    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            const response = await axios.post(apiBase + "auth/login", data, {
                headers: { "Content-Type": "application/json" }
            });
            const potentialToken = response.data;

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
