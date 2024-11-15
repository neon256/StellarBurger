import React from 'react'
import burgerIngredientsStyle from '../burger-ingredients.module.css'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
const BurgerIngredientsCard = ({ type, data }) => {
  return (
            <div className={burgerIngredientsStyle.card_container}>
                {data.filter((ing)=>{
                    if(ing.type === type){
                        return ing
                    }
                    return
                }).map((ing)=>{
                    return  (
                    <div className={`ml-4 ${burgerIngredientsStyle.card}`} key={ing._id}>
                        <img src={ing.image} alt="Фото булки" className='ml-4 mr-4'/>
                        <div className={`text text_type_digits-default mt-1 mb-1 ${burgerIngredientsStyle.price}`}>{ing.price}<CurrencyIcon type="primary"/></div>
                        <p className='text text_type_main-default'>{ing.name}</p>
                        <Counter count={1} size="default" extraClass="m-1" />
                    </div>
                    )
                })
                }
            </div>
  )
}

export default BurgerIngredientsCard