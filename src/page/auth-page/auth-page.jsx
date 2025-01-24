import { Button, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useRef, useState } from 'react'
import authStyle from './auth-page.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { postAuth } from '../../services/actions/user'

const AuthPage = () => {
    const [emailValue, setEmailValue] = useState('')
    const onChange = e => {
        setEmailValue(e.target.value)
    }
    const [value, setValue] = useState('')
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState('ShowIcon');
    const inputRef = useRef(null)
    const onIconClick = () => {
        setType(type === 'text' ? 'password' : 'text');
        setIcon(icon === 'ShowIcon' ? 'HideIcon' : 'ShowIcon');
    }
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <div className={authStyle.container}>
            <h1>Вход</h1>
            <EmailInput
                onChange={onChange}
                value={emailValue}
                name={'email'}
                isIcon={false}
                extraClass='mt-6'
            />
            <Input
                type={type}
                placeholder={'Пароль'}
                onChange={e => setValue(e.target.value)}
                icon={icon}
                value={value}
                name={'name'}
                error={false}
                ref={inputRef}
                onIconClick={onIconClick}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="ml-1 mt-6"
            />
            <Button htmlType="button" type="primary" size="medium" extraClass='mt-6 mb-20' onClick={()=>{dispatch(postAuth(emailValue, value, navigate));}}>
                Войти
            </Button>
            <p className={`text text_type_main-default mt-0 ${authStyle.p}`}>Вы — новый пользователь? <Link to="/register" className={authStyle.link}>Зарегистрироваться</Link></p>
            <p className={`text text_type_main-default mt-4 ${authStyle.p}`}>Забыли пароль? <Link to="/forgot-password" className={authStyle.link}>Востановить пароль</Link></p>
        </div>
    )
}

export default AuthPage