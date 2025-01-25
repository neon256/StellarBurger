import { Button, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useRef, useState } from 'react'
import resetStyle from './reset-password-page.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { postResetPassword } from '../../services/actions/reset-password'
import { TICons } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons'

const ResetPasswordPage = () => {
   const [passwordValue, setPasswordValue] = useState<string>('')
   const [tokenValue, setTokenValue] = useState<string>('')
      const [type, setType] = useState<'password' | 'text'>('password');
      const [icon, setIcon] = useState<keyof TICons | undefined>('ShowIcon');
      const inputRef = useRef(null)
      const navigate = useNavigate();
      const dispatch: any = useDispatch();
      const onIconClick = () => {
          setType(type === 'text' ? 'password' : 'text');
          setIcon(icon === 'ShowIcon' ? 'HideIcon' : 'ShowIcon');
      }
  return (
    <div className={resetStyle.container}>
            <h1>Зарегистрироваться</h1>
            {//@ts-ignore
            <Input
                type={type}
                placeholder={'Введите новый пароль'}
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
            }
            {//@ts-ignore
            <Input
                type={'text'}
                placeholder={'Введите код из письма'}
                onChange={e => setTokenValue(e.target.value)}
                value={tokenValue}
                name={'name'}
                error={false}
                ref={inputRef}
                onIconClick={onIconClick}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="ml-1 mt-6"
            />
            }
            <Button htmlType="button" type="primary" size="medium" extraClass='mt-6 mb-20' onClick={()=>{dispatch(postResetPassword(passwordValue, tokenValue, navigate))}}>
                Сохранить
            </Button>
            <p className={`text text_type_main-default mt-0 ${resetStyle.p}`}>Уже зарегистрированы? <Link to="/login" className={resetStyle.link}>Войти</Link></p>
        </div>
  )
  
}

export default ResetPasswordPage