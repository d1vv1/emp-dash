import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiBase } from "./Login.tsx";
import { useNavigate } from 'react-router-dom'
import './Login.css'
import { useState } from "react";
import { emailSchema, resetPasswordSchema } from "../templates/validationSchema.ts";
import axios from "axios";

type EmailFormFields = typeof emailSchema._type;
type OTPFormFields = typeof resetPasswordSchema._type;

function ResetP() {
    const navigate = useNavigate();
    const [step, setStep] = useState<1 | 2>(1);
    const [email, setEmail] = useState<string>("");

    // Step 1: Email form
    const {
        register: registerEmail,
        handleSubmit: handleSubmitEmail,
        setError: setEmailError,
        formState: { errors: emailErrors, isSubmitting: isEmailSubmitting }
    } = useForm<EmailFormFields>({ resolver: zodResolver(emailSchema) });

    // Step 2: OTP + password form
    const {
        register: registerOTP,
        handleSubmit: handleSubmitOTP,
        setError: setOTPError,
        setValue: setOTPValue, // <-- add setValue
        formState: { errors: otpErrors, isSubmitting: isOTPSubmitting }
    } = useForm<OTPFormFields>({ resolver: zodResolver(resetPasswordSchema) });

    const sendResetRequest: SubmitHandler<EmailFormFields> = async (data) => {
        try {
            const response = await axios.post(apiBase + 'change', data, {
                headers: { "Content-Type": "application/json" }
            });
            const status = await response.data;
            if (response.status === 201) {
                setEmail(data.email);
                setStep(2);
                setOTPValue("email", data.email); // <-- set email in OTP form state
            } else {
                throw new Error(status.message || "User does not exist");
            }
        } catch (error) {
            setEmailError("root", {
                message: `Error: ${error}`,
            });
        }
    };

    const validateOTP: SubmitHandler<OTPFormFields> = async (data) => {
        try {
            const response = await axios.put(apiBase + 'change/reset-password', data, {
                headers: { "Content-Type": "application/json" }
            });
            const status = await response.data;
            if (response.status === 200) {
                navigate("/");
            } else {
                throw new Error(status.message || "OTP expired or not found");
            }
        } catch (error) {
            setOTPError("root", {
                message: `Error: ${error}`,
            });
        }
    };

    return (
        <div className="form-bg">
            {step === 1 && (
                <form onSubmit={handleSubmitEmail(sendResetRequest)}>

                    <h1>Password Reset</h1>
                    <h3>{email}</h3>

                    {emailErrors.root && (<p>{emailErrors.root.message}</p>)}

                    <div className="group">
                        <input type="text" {...registerEmail("email")} placeholder="Email" />
                        {emailErrors.email && (<p>{emailErrors.email.message}</p>)}
                    </div>

                    <button disabled={isEmailSubmitting} type="submit">
                        {isEmailSubmitting ? "Loading..." : "Request Password Reset"}
                    </button>

                </form>
            )}
            {step === 2 && (
                <form onSubmit={handleSubmitOTP(validateOTP)}>

                    <h1>Enter OTP & New Password</h1>
                    <h2>Sent email to {email}</h2>

                    {otpErrors.root && (<p>{otpErrors.root.message}</p>)}


                    <div className="group">
                        <input type="text" {...registerOTP("email")} placeholder="Email" hidden />
                        {otpErrors.email && (<p>{otpErrors.email.message}</p>)}

                    </div>

                    <div className="group">
                        <input type="text" {...registerOTP("otp")} placeholder="OTP" />
                        {otpErrors.otp && (<p>{otpErrors.otp.message}</p>)}
                    </div>

                    <div className="group">
                        <input type="password" {...registerOTP("resetPass")} placeholder="New password" />
                        {otpErrors.resetPass && (<p>{otpErrors.resetPass.message}</p>)}
                    </div>

                    <div className="group">
                        <input type="password" {...registerOTP("confPass")} placeholder="Confirm password" />
                        {otpErrors.confPass && (<p>{otpErrors.confPass.message}</p>)}
                    </div>

                    <button disabled={isOTPSubmitting} type="submit">
                        {isOTPSubmitting ? "Loading..." : "Submit"}
                    </button>

                </form>
            )}
        </div>
    );
}

export default ResetP;
