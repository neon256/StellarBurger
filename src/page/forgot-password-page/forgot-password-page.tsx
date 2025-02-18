import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { ChangeEvent, FormEvent, useState } from "react";
import forgotStyle from "./forgot-password-page.module.css";
import { Link, useNavigate } from "react-router-dom";

import { postForgotPassword } from "../../services/actions/reset-password";

import { useAppDispatch } from "../../utils/hook";
const ForgotPasswordPage = () => {
  const dispatch= useAppDispatch();
  const navigate = useNavigate();
  const [emailValue, setEmailValue] = useState<string>("");
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };
  function forgot(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(postForgotPassword(emailValue, navigate));
  }
  return (
    <div className={forgotStyle.container}>
      <h1>Восстановление пароля</h1>
      <form onSubmit={forgot}>
        <EmailInput
          onChange={onChange}
          value={emailValue}
          name={"email"}
          placeholder="Укажите e-mail"
          isIcon={false}
          extraClass="mt-6"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mt-6 mb-20"
        >
          Востановить
        </Button>
      </form>

      <p className={`text text_type_main-default mt-0 ${forgotStyle.p}`}>
        Вспомнили пароль?{" "}
        <Link to="/login" className={forgotStyle.link}>
          Войти
        </Link>
      </p>
    </div>
  );
};

export default ForgotPasswordPage;
