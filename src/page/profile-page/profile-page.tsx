import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { act, ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import profileStyle from "./profile-page.module.css";

import {
  getUser,
  patchUser,
  postResetToken,
} from "../../services/actions/user";
import { AppDispatch, RootState } from "../../services/type/data";
import { useAppDispatch, useAppSelector } from "../../utils/hook";

const ProfilePage = () => {
  let user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [load, setLoad] = useState(true);
  const [nameValue, setNameValue] = useState<string>(user.name);
  const [emailValue, setEmailValue] = useState<string>(user.email);
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [nameDisabled, setNameDisabled] = useState<boolean>(true);
  const [passwordDisabled, setPasswordDisabled] = useState<boolean>(true);
  const [active, setActive] = useState(false);
  const dispatch= useAppDispatch();
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
    setActive(true);
  };
  const onNameIconClick = () => {
    setNameDisabled(nameDisabled ? false : true);
  };
  const onPasswordIconClick = () => {
    setPasswordDisabled(passwordDisabled ? false : true);
  };
  const resetInput = () => {
    setActive(false);
    setEmailValue(user.email);
    setPasswordValue("");
    setNameValue(user.name);
    setNameDisabled(true);
    setPasswordDisabled(true);
  };
  const patch = () => {
    setActive(false);
    dispatch(
      patchUser(
        nameValue,
        emailValue,
        passwordValue,
        setNameValue,
        setEmailValue
      )
    );
    setNameDisabled(true);
    setPasswordDisabled(true);
  };
  function logout() {
    navigate("/");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.reload();
  }
  function resetToken() {
    
    
  }
  useEffect(() => {
    dispatch(getUser(setLoad))
    if (load) {
        dispatch(postResetToken());
        dispatch(getUser(setLoad, setNameValue, setEmailValue))
      }
    return ()=>{
        return
    }
  }, []);
  if (load) {
    return null;
  }
  return (
    <div className={profileStyle.container}>
      <div className={`mr-15 ${profileStyle.left}`}>
        <div className={`mb-20 ${profileStyle.nav__container}`}>
          <Link
            to={"/profile"}
            className={`text text_type_main-medium ${profileStyle.link} ${profileStyle.active}`}
          >
            Профиль
          </Link>
          <Link
            to={"/profile/orders"}
            className={`text text_type_main-medium ${profileStyle.link}`}
          >
            История заказов
          </Link>
          <Link
            to={"/"}
            className={`text text_type_main-medium ${profileStyle.link}`}
            onClick={() => {
              logout();
            }}
          >
            Выход
          </Link>
        </div>
        <p
          className={`text text_type_main-default text_color_inactive ${profileStyle.subtitle}`}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div>
        <form>
          {
            //@ts-ignore
            <Input
              type={"text"}
              placeholder={"Имя"}
              onChange={(e) => {
                setNameValue(e.target.value);
                setActive(true);
              }}
              icon={"EditIcon"}
              value={nameValue}
              name={"name"}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
              onIconClick={onNameIconClick}
              disabled={nameDisabled}
              extraClass="ml-1"
            />
          }
          <EmailInput
            onChange={onChange}
            value={emailValue}
            name={"Логин"}
            placeholder="Логин"
            isIcon={true}
            extraClass="mt-6 mb-6"
          />
          {
            //@ts-ignore
            <Input
              type={"password"}
              placeholder={"Пароль"}
              onChange={(e) => {
                setPasswordValue(e.target.value);
                setActive(true);
              }}
              icon={"EditIcon"}
              value={passwordValue}
              name={"password"}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
              onIconClick={onPasswordIconClick}
              disabled={passwordDisabled}
              extraClass="ml-1 mb-6"
            />
          }
          {active && (
            <>
              <Button
                htmlType="button"
                type="primary"
                size="medium"
                extraClass="mr-10"
                onClick={() => {
                  resetInput();
                }}
              >
                Отмена
              </Button>
              <Button
                htmlType="button"
                type="primary"
                size="medium"
                onClick={() => {
                  patch();
                }}
              >
                Сохранить
              </Button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
