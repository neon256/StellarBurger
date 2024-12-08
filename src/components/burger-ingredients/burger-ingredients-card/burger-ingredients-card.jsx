import React, { useEffect, useMemo, useState } from 'react'
import burgerIngredientsStyle from '../burger-ingredients.module.css'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientType } from '../../../utils/types';
import PropTypes, { element } from 'prop-types';
import Modal from '../../modal/modal';
import IngredientDetails from '../../modal/ingredient-details/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_INGRIDIENTS_DETAIL, INGRIDIENTS_DETAIL } from '../../../services/actions/ingredient-details';
import { useDrag } from 'react-dnd';
import { SET_INGREDIENTS_PRICE } from '../../../services/actions/burger-constructor';

const BurgerIngredientsCard = ({ id, ing}) => {

    const [visible, setVisible] = useState(false);
    const [info, setInfo] = useState();
    const dispatch = useDispatch();
    const ingredients = useSelector(state => state.burgerConstructor)
    
    
    function handleOpenModal(data) {
        dispatch({ type: INGRIDIENTS_DETAIL, value: data });
        setVisible(true)
    }

    function handleCloseModal() {
        setVisible(false)
        dispatch({ type: DELETE_INGRIDIENTS_DETAIL })
    }

    const [{bun, ingredient}, dragRef] = useDrag({
        type: 'ingredient',
        item: ing,
        collect: monitor => ({
            bun: ing.type === 'bun' ? monitor.isDragging() : false,
            ingredient: ing.type !== 'bun' ? monitor.isDragging() : false
        })
    })

    useEffect(()=>{
        dispatch({
            type:SET_INGREDIENTS_PRICE,
            dragBun: bun,
            dragIng: ingredient,
        })
    }, [bun, ingredient])

    const count = useMemo(()=>{
        if(ing.type === 'bun' && ingredients.bun && id === ingredients.bun._id){
            return 2
        }
        return ingredients.ingredients.filter(item => item._id === id).length;
    }, [bun, ingredient, id, ingredients.bun])

    const modal = () => (
        <Modal header='Детали ингредиента' onClose={handleCloseModal}>
            <IngredientDetails />
        </Modal>
    )

    return (
        <>
            <div ref={dragRef} className={`ml-4 ${burgerIngredientsStyle.card}`} key={id} onClick={() => handleOpenModal(ing)}>
                <img src={ing.image} alt="Фото булки" className='ml-4 mr-4' />
                <div className={`text text_type_digits-default mt-1 mb-1 ${burgerIngredientsStyle.price}`}>{ing.price}<CurrencyIcon type="primary" /></div>
                <p className='text text_type_main-default'>{ing.name}</p>
                {count ? <Counter count={count} size="default" extraClass="m-1" /> : (<></>)}
            </div>
            {visible && modal(info)}
        </>
    )
}
ingredientType(BurgerIngredientsCard)
BurgerIngredientsCard.propTypes = {
    ing: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired
}
export default BurgerIngredientsCard