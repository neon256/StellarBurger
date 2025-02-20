import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useState } from "react";
import headerStyles from "./app-header.module.css";
import { Link } from "react-router-dom";

const AppHeader = () => {
  const token: string | null = localStorage.getItem('accessToken')
  const [profile, setProfile] = useState<string>('')
  useEffect(()=>{
    setProfile(token ? '/profile' : '/login')
  }, [token])
  return (
    <header className={headerStyles.header}>
      <nav className={headerStyles.nav}>
        <div className={headerStyles.nav_container}>
          <div className={headerStyles.flex}>
            <Link
              to="/"
              className={`text text_type_main-default p-5 mr-2 ${headerStyles.active}`}
            >
              <BurgerIcon type="secondary" className="mr-2" />
              Конструктор
            </Link>
            <Link
              to="/feed"
              className={`text text_type_main-default p-5 mr-2 ${headerStyles.link}`}
            >
              <ListIcon type="secondary" className="mr-2" />
              Лента заказов
            </Link>
          </div>
          <Logo className="mt-6 mb-6" />
        </div>
        <Link
          to={profile}
          className={`text text_type_main-default p-5 mr-2 ${headerStyles.link}`}
        >
          <ProfileIcon type="secondary" className="mr-2" />
          Личный кабинет
        </Link>
      </nav>
    </header>
  );
}

export default AppHeader