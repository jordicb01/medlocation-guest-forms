import SignInForm from "../forms/SignInForm";
import SignUpForm from "../forms/SignUpForm";

type AuthFormType = "signIn" | "signUp" | "forgotPassword" | "resetPassword";

interface AuthFormProps {
    type: AuthFormType;
    resetToken?: string;
}

export default function AuthForm({ type, resetToken }: AuthFormProps) {
    // Route according to form type
    switch (type) {
        case "signIn":
            return <SignInForm />;
        case "signUp":
            return <SignUpForm />;
        case "forgotPassword":
            return <ForgotPasswordForm />;
        case "resetPassword":
            return <ResetPasswordForm token={resetToken} />;
        default:
            return null;
    }
}