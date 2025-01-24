import { Button, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { act, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import profileStyle from './profile-page.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, patchUser, postResetToken } from '../../services/actions/user'

const ProfilePage = () => {
    let user = useSelector(state=>state.user);
    const navigate = useNavigate()
    const [load, setLoad] = useState(true)
    const [nameValue, setNameValue] = useState(user.name)
    const [emailValue, setEmailValue] = useState(user.email)
    const [passwordValue, setPasswordValue] = useState('')
    const [nameDisabled, setNameDisabled] = useState(true);
    const [passwordDisabled, setPasswordDisabled] = useState(true);
    const [active, setActive] = useState(false);
    const dispatch = useDispatch();
    const onChange = e => {
        setEmailValue(e.target.value)
        setActive(true)
    }
    const onNameIconClick = () => {
        setNameDisabled(nameDisabled ? false : true)
    }
    const onPasswordIconClick = () => {
        setPasswordDisabled(passwordDisabled ? false : true)
    }
    const resetInput = () => {
        setActive(false)
        setEmailValue(user.email)
        setPasswordValue('')
        setNameValue(user.name)
        setNameDisabled(true)
        setPasswordDisabled(true)
    }
    const patch = () => {
        setActive(false)
        dispatch(patchUser(nameValue, emailValue, passwordValue, setNameValue, setEmailValue))
        setNameDisabled(true)
        setPasswordDisabled(true)
    }
    function logout(){
        navigate('/')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        window.location.reload()
    }
    function resetToken(){
            if(!dispatch(getUser())){
                dispatch(postResetToken())
            }
        }
    useEffect(()=>{
        resetToken()
        dispatch(getUser(setLoad, setNameValue, setEmailValue));
    },[])
    if(load){
        return null
    }
    return (
        <div className={profileStyle.container}>
            <div className={`mr-15 ${profileStyle.left}`}>
                <div className={`mb-20 ${profileStyle.nav__container}`}>
                    <Link className={`text text_type_main-medium ${profileStyle.link} ${profileStyle.active}`}>Профиль</Link>
                    <Link className={`text text_type_main-medium ${profileStyle.link}`}>История заказов</Link>
                    <Link className={`text text_type_main-medium ${profileStyle.link}`} onClick={()=>{logout()}}>Выход</Link>
                </div>
                <p className={`text text_type_main-default text_color_inactive ${profileStyle.subtitle}`}>В этом разделе вы можете
                    изменить свои персональные данные</p>
            </div>
            <div>
                <form>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={e => {setNameValue(e.target.value); setActive(true)}}
                        icon={'EditIcon'}
                        value={nameValue}
                        name={'name'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        onIconClick={onNameIconClick}
                        disabled={nameDisabled}
                        extraClass="ml-1"
                    />
                    <EmailInput
                        onChange={onChange}
                        value={emailValue}
                        name={'Логин'}
                        placeholder="Логин"
                        isIcon={true}
                        extraClass="mt-6 mb-6"
                    />
                    <Input
                        type={'password'}
                        placeholder={'Пароль'}
                        onChange={e => {setPasswordValue(e.target.value); setActive(true)}}
                        icon={'EditIcon'}
                        value={passwordValue}
                        name={'password'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        onIconClick={onPasswordIconClick}
                        disabled={passwordDisabled}
                        extraClass="ml-1 mb-6"
                    />
                    {active &&
                    <>
                    <Button htmlType="button" type="primary" size="medium" extraClass='mr-10' onClick={()=>{resetInput()}}>
                        Отмена
                    </Button>
                    <Button htmlType="button" type="primary" size="medium" onClick={()=>{patch()}}>
                        Сохранить
                    </Button>   
                    </>
                    }
                    
                </form>
            </div>
        </div>
    )
}

export default ProfilePage