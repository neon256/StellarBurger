import Modal from "../../components/modal/modal";
import AuthPage from "../../page/auth-page/auth-page";
import ForgotPasswordPage from "../../page/forgot-password-page/forgot-password-page";
import HomePage from "../../page/home-page/home-page";
import IngredientsPage from "../../page/ingredients-page/ingredients-page";
import ProfilePage from "../../page/profile-page/profile-page";
import RegisterPage from "../../page/register-page/register-page";
import ResetPasswordPage from "../../page/reset-password-page/reset-password-page";

export const privateRoutes = [
    {path:'/', component: <HomePage/>},
    {path: '/profile', component:<ProfilePage/>},
    {path: '/ingredients/:id', component:<IngredientsPage/>},
]

export const publicRoutes = [
    {path:'/', component: <HomePage/>},
    {path: '/forgot-password', component:<ForgotPasswordPage/>},
    {path: '/login', component:<AuthPage/>},
    {path: '/register', component:<RegisterPage/>},
]

export const resetRoutes = [
    {path: '/reset-password', component:<ResetPasswordPage/>},
]