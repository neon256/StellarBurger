import React, { FC, useEffect, useMemo, useState } from 'react'
import burgerIngredientsStyle from '../burger-ingredients.module.css'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes, { element } from 'prop-types';
import Modal from '../../modal/modal';
import IngredientDetails from '../../modal/ingredient-details/ingredient-details';

import { DELETE_INGRIDIENTS_DETAIL, INGRIDIENTS_DETAIL } from '../../../services/constants/ingredient-details';
import { useDrag } from 'react-dnd';
import { SET_INGREDIENTS_PRICE } from '../../../services/constants/burger-constructor';
import { Link, useNavigate } from 'react-router-dom';
import { IBurgerIngredients } from '../../../utils/ingredients-interface';
import { AppDispatch, IIngredients, RootState } from '../../../services/type/data';
import { useAppDispatch, useAppSelector } from '../../../utils/hook';

interface IBurgerIngredientsCard {
    id: string;
    ing: IBurgerIngredients;
    location: {pathname: string};
}
const BurgerIngredientsCard: FC<IBurgerIngredientsCard> = ({ id, ing, location }) => {

    const [visible, setVisible] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const ingredients = useAppSelector((state) => state.burgerConstructor)
    function handleOpenModal(data: IIngredients) {
        dispatch({ type: INGRIDIENTS_DETAIL, value: data });   
    }

    function handleCloseModal(): void {
        dispatch({ type: DELETE_INGRIDIENTS_DETAIL })
        setVisible(false)
    }

    const [{ bun, ingredient }, dragRef] = useDrag({
        type: 'ingredient',
        item: ing,
        collect: monitor => ({
            bun: ing.type === 'bun' ? monitor.isDragging() : false,
            ingredient: ing.type !== 'bun' ? monitor.isDragging() : false
        })
    })

    useEffect(() => {
        dispatch({
            type: SET_INGREDIENTS_PRICE,
            dragBun: bun,
            dragIng: ingredient,
        })
    }, [ingredients.bun, ingredients.ingredients])

    const count = useMemo(() => {
        if (ing.type === 'bun' && ingredients.bun && id === ingredients.bun._id) {
            return 2
        }
        return ingredients.ingredients.filter((item: {
            _id:string;
            name:string;
            type:string;
            proteins:number;
            fat:number;
            carbohydrates:number;
            calories:number;
            price:number;
            image:string;
            image_mobile:string;
            image_large:string;
            __v:number;
        }) => item._id === id).length;
    }, [ingredients.bun, ingredients.ingredients, ingredients])

    const modal = () => (
        <Modal header='Детали ингредиента' onClose={handleCloseModal}>
            <IngredientDetails />
        </Modal>
    )

    return (
        <>
            <Link ref={dragRef} className={`ml-4 ${burgerIngredientsStyle.card}`} id='ing' key={id} onClick={() => handleOpenModal(ing)} to={`/ingredients/${id}`} state={{background: location}}>
                <img src={ing.image} alt="Фото булки" className='ml-4 mr-4' />
                <div className={`text text_type_digits-default mt-1 mb-1 ${burgerIngredientsStyle.price}`}>{ing.price}<CurrencyIcon type="primary" /></div>
                <p className='text text_type_main-default'>{ing.name}</p>
                {count ? <Counter count={count} size="default" extraClass="m-1" /> : (<></>)}
            </Link>
        </>
    )
}
export default BurgerIngredientsCard