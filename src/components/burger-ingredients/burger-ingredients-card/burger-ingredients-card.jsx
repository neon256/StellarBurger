import React, { useState } from 'react'
import burgerIngredientsStyle from '../burger-ingredients.module.css'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientType } from '../../../utils/types';
import PropTypes from 'prop-types';
import Modal from '../../modal/modal';
import IngredientDetails from '../../modal/ingredient-details/ingredient-details';
const BurgerIngredientsCard = ({ type, data }) => {

    const [visible, setVisible] = useState(false);
    const [info, setInfo] = useState();

    function handleOpenModal(data){
        setVisible(true)
        setInfo(data)
    }
    function handleCloseModal(){
        setVisible(false)
    }
    const modal = (data) => (
        <Modal header='Детали ингредиента' onClose={handleCloseModal}>
            <IngredientDetails data={data}/>
        </Modal>
    )
    
  return (
            <div className={burgerIngredientsStyle.card_container}>
                {data.filter((ing)=>{
                    if(ing.type === type){
                        return ing
                    }
                    return
                }).map((ing)=>{
                    return  (
                    <div className={`ml-4 ${burgerIngredientsStyle.card}`} key={ing._id} onClick={() => handleOpenModal(ing)}>
                        <img src={ing.image} alt="Фото булки" className='ml-4 mr-4'/>
                        <div className={`text text_type_digits-default mt-1 mb-1 ${burgerIngredientsStyle.price}`}>{ing.price}<CurrencyIcon type="primary"/></div>
                        <p className='text text_type_main-default'>{ing.name}</p>
                        <Counter count={1} size="default" extraClass="m-1" />
                    </div>
                    )
                })
                }
                {visible && modal(info)}
            </div>
  )
}
ingredientType(BurgerIngredientsCard)
BurgerIngredientsCard.propTypes = {
    type: PropTypes.string
}
export default BurgerIngredientsCard