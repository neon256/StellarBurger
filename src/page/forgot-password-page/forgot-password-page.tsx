import { Button, EmailInput} from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useState } from 'react'
import forgotStyle from './forgot-password-page.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { postForgotPassword } from '../../services/actions/reset-password'
const ForgotPasswordPage = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
    const [emailValue, setEmailValue] = useState<string>('')
    const onChange = (e: any) => {
        setEmailValue(e.target.value)
    }
  return (
    <div className={forgotStyle.container}>
    <h1>Восстановление пароля</h1>
    <EmailInput
        onChange={onChange}
        value={emailValue}
        name={'email'}
        placeholder='Укажите e-mail'
        isIcon={false}
        extraClass='mt-6'
    />
    <Button htmlType="button" type="primary" size="medium" extraClass='mt-6 mb-20' onClick={()=>{dispatch(postForgotPassword(emailValue, navigate))}}>
        Востановить
    </Button>
    <p className={`text text_type_main-default mt-0 ${forgotStyle.p}`}>Вспомнили пароль? <Link to="/login" className={forgotStyle.link}>Войти</Link></p>
</div>
  )
}

export default ForgotPasswordPage