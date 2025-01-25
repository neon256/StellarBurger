import { Button, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useRef, useState } from 'react'
import regStyle from './register-page.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { postRegister } from '../../services/actions/user'

const RegisterPage = () => {
    const [emailValue, setEmailValue] = useState('')
    const onChange = e => {
        setEmailValue(e.target.value)
    }
    const [passwordValue, setPasswordValue] = useState('')
    const [nameValue, setNameValue] = useState('')
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
        <div className={regStyle.container}>
            <h1>Зарегистрироваться</h1>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={e => setNameValue(e.target.value)}
                value={nameValue}
                name={'name'}
                error={false}
                ref={inputRef}
                onIconClick={onIconClick}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="ml-1 mt-6"
            />
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
                onChange={e => setPasswordValue(e.target.value)}
                icon={icon}
                value={passwordValue}
                name={'name'}
                error={false}
                ref={inputRef}
                onIconClick={onIconClick}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="ml-1 mt-6"
            />
            <Button htmlType="button" type="primary" size="medium" extraClass='mt-6 mb-20' onClick={()=>{dispatch(postRegister(emailValue, passwordValue, nameValue, navigate))}}>
                Зарегистрироваться
            </Button>
            <p className={`text text_type_main-default mt-0 ${regStyle.p}`}>Уже зарегистрированы? <Link to="/login" className={regStyle.link}>Войти</Link></p>
        </div>
    )
}

export default RegisterPage