import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import style from './order-page.module.css'
import FeedCard from '../../components/feed-card/feed-card';

import { ORDERS_WEBSOCKET_CONNECT, WEBSOCKET_DISCONNECT, WEBSOCKET_MESSAGE_RECEIVED } from '../../services/constants/ws';
import { useAppDispatch, useAppSelector } from '../../utils/hook';

const OrderPage = () => {
    const navigate = useNavigate();
    function logout(){
        navigate('/')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        window.location.reload()
    }
    const dispatch= useAppDispatch();
    const data = useAppSelector((state) => state.ws);
    useEffect(() => {
      dispatch({ type: ORDERS_WEBSOCKET_CONNECT });
      if (data.isConnecting == true) {
        dispatch({ type: WEBSOCKET_MESSAGE_RECEIVED });
      }
      return () => {
        dispatch({ type: WEBSOCKET_DISCONNECT });
      };
    }, [dispatch]);
    const location: { pathname: string} = useLocation()
  return (
    <div className={style.container}>
    <div className={`mr-15 ${style.left}`}>
        <div className={`mb-20 ${style.nav__container}`}>
            <Link to={'/profile'} className={`text text_type_main-medium ${style.link} `}>Профиль</Link>
            <Link to={'/profile/orders'} className={`text text_type_main-medium ${style.link} ${style.active}`}>История заказов</Link>
            <Link to={'/'} className={`text text_type_main-medium ${style.link}`} onClick={()=>{logout()}}>Выход</Link>
        </div>
        <p className={`text text_type_main-default text_color_inactive ${style.subtitle}`}>В этом разделе вы можете
            изменить свои персональные данные</p>
    </div>
    <div className={style.card__container}>
      {data.orders.orders &&
        <FeedCard data={data.orders.orders} location={location}  link={'/profile/orders/'}/>
      }
        
    </div>
</div>
  )
}

export default OrderPage

