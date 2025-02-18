import { ComponentType, FC, ReactElement, ReactNode } from "react";
import Modal from "../../components/modal/modal";
import AuthPage from "../../page/auth-page/auth-page";
import ForgotPasswordPage from "../../page/forgot-password-page/forgot-password-page";
import HomePage from "../../page/home-page/home-page";
import IngredientsPage from "../../page/ingredients-page/ingredients-page";
import ProfilePage from "../../page/profile-page/profile-page";
import RegisterPage from "../../page/register-page/register-page";
import ResetPasswordPage from "../../page/reset-password-page/reset-password-page";
import Feed from "../../page/feed/feed";
import OrderPage from "../../page/order-page/order-page";
import FeedById from "../../page/feed-by-id/feed-by-id";

interface IRoute {
    path:string, 
    component: ComponentType | string
}

export const privateRoutes: IRoute[] = [
    {path:'/', component: HomePage},
    {path: '/profile', component: ProfilePage},
    {path: '/ingredients/:id', component: IngredientsPage},
    {path: '/feed', component: Feed},
    {path: '/feed/:number', component: FeedById},
    {path: '/profile/orders', component: OrderPage},
    {path: '/profile/orders/:number', component: FeedById},
]

export const publicRoutes: IRoute[] = [
    {path:'/', component: HomePage},
    {path: '/forgot-password', component:ForgotPasswordPage},
    {path: '/login', component:AuthPage},
    {path: '/register', component:RegisterPage},
    {path: '/ingredients/:id', component:IngredientsPage},
    {path: '/feed', component: Feed},
    {path: '/feed/:number', component: FeedById},
]

export const resetRoutes: IRoute[] = [
    {path: '/reset-password', component:ResetPasswordPage},
]