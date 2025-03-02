import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import authStyle from "./auth-page.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { postAuth } from "../../services/actions/user";
import { TICons } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";

import { useAppDispatch } from "../../utils/hook";

type TInputPassword = "password" | "text" | "email" | "undefined";

const AuthPage = () => {
  const [emailValue, setEmailValue] = useState<string>("");
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };
  const location = useLocation()
  const from = location.state ? '/' : '/profile'
  
  function auth(event:FormEvent<HTMLFormElement>){
    console.log('test')
    event.preventDefault()
    return dispatch(postAuth(emailValue, value, navigate, from));
  }
  const [value, setValue] = useState<string>("");
  const [type, setType] = useState<"password" | "text">("password");
  const [icon, setIcon] = useState<keyof TICons | undefined>("ShowIcon");
  const inputRef = useRef(null);
  const onIconClick = () => {
    setType(type === "text" ? "password" : "text");
    setIcon(icon === "ShowIcon" ? "HideIcon" : "ShowIcon");
  };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div className={authStyle.container}>
      <h1>Вход</h1>
      <form onSubmit={auth}>
        <EmailInput
          onChange={onChange}
          value={emailValue}
          name={"email"}
          isIcon={false}
          extraClass="mt-6"
        />
        {
          //@ts-ignore
          <Input
            type={type}
            placeholder={"Пароль"}
            onChange={(e) => setValue(e.target.value)}
            icon={icon}
            value={value}
            name={"name"}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1 mt-6"
          />
        }
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mt-6 mb-20"

        >
          Войти
        </Button>
      </form>
      <p className={`text text_type_main-default mt-0 ${authStyle.p}`}>
        Вы — новый пользователь?{" "}
        <Link to="/register" className={authStyle.link}>
          Зарегистрироваться
        </Link>
      </p>
      <p className={`text text_type_main-default mt-4 ${authStyle.p}`}>
        Забыли пароль?{" "}
        <Link to="/forgot-password" className={authStyle.link}>
          Востановить пароль
        </Link>
      </p>
    </div>
  );
};

export default AuthPage;
