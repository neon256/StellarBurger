import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import regStyle from "./register-page.module.css";
import { Link, useNavigate } from "react-router-dom";

import { postRegister } from "../../services/actions/user";
import { TICons } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { AppDispatch } from "../../services/type/data";
import { useAppDispatch } from "../../utils/hook";

const RegisterPage = () => {
  const [emailValue, setEmailValue] = useState<string>("");
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [nameValue, setNameValue] = useState<string>("");
  const [type, setType] = useState<"password" | "text">("password");
  const [icon, setIcon] = useState<keyof TICons | undefined>("ShowIcon");
  const inputRef = useRef(null);
  const onIconClick = () => {
    setType(type === "text" ? "password" : "text");
    setIcon(icon === "ShowIcon" ? "HideIcon" : "ShowIcon");
  };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  function reg(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(postRegister(emailValue, passwordValue, nameValue, navigate));
  }
  return (
    <div className={regStyle.container}>
      <h1>Зарегистрироваться</h1>
      <form onSubmit={reg}>
        {
          //@ts-ignore
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={(e) => setNameValue(e.target.value)}
            value={nameValue}
            name={"name"}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1 mt-6"
          />
        }
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
            onChange={(e) => setPasswordValue(e.target.value)}
            icon={icon}
            value={passwordValue}
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
          Зарегистрироваться
        </Button>
      </form>

      <p className={`text text_type_main-default mt-0 ${regStyle.p}`}>
        Уже зарегистрированы?{" "}
        <Link to="/login" className={regStyle.link}>
          Войти
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
