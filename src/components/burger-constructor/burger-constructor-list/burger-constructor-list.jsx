import React, { useCallback, useEffect } from 'react'
import burgerConstructorStyle from '../burger-constructor.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { BUN_SAVE, CHANGE_INGREDIENTS_POSITION, INGREDIENTS_SAVE } from '../../../services/actions/burger-constructor';
import BurgerConstructorListElement from './burger-constructor-list-element';
import update from 'immutability-helper'

const BurgerConstructorList = () => {
    const ingredients = useSelector(state => state.burgerConstructor);
    const dispatch = useDispatch()

    function onDropHandler(item) {
        if (item.type === 'bun') {
            dispatch({
                type: BUN_SAVE,
                value: item
            })
        } else {
            dispatch({
                type: INGREDIENTS_SAVE,
                value: item
            })
        }
    }
    const [, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(ingredient) {
            onDropHandler(ingredient);
        }
    }, [])
    const moveIngredient = useCallback(
        (dragIndex, hoverIndex) => {
            dispatch({
                type: CHANGE_INGREDIENTS_POSITION,
                change: update(ingredients.ingredients, {
                    $splice: [
                      [dragIndex, 1],
                      [hoverIndex, 0, ingredients.ingredients[dragIndex]],
                    ],
                  }),
            });
        },
        [ingredients.ingredients]
    );


    return (
        <ul className={`mb-10 ${burgerConstructorStyle.ingredients_container}`} ref={dropTarget}>
            {ingredients.bun !== null ? (
                <>
                    <li className="mr-4">
                        <ConstructorElement
                            text={`${ingredients.bun.name} (верх)`}
                            type="top"
                            price={ingredients.bun.price}
                            isLocked={true}
                            thumbnail={ingredients.bun.image}
                        />
                    </li>
                </>
            ) : (
                <>
                    <div className={ingredients.isDraggingBun ? burgerConstructorStyle.active_border : ''} style={{ width: 536, textAlign: 'center', borderTopRightRadius: 88, borderTopLeftRadius: 88, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, backgroundColor: 'rgba(28, 28, 33, 1)' }}>
                        <p className='text text_type_main-medium mt-4 mb-4'>Добавьте булку</p>
                    </div>
                </>

            )
            }
            {ingredients.ingredients.length > 0 ? (
                <>
                    <li>
                        <ul className={burgerConstructorStyle.ingredients_main_container}>
                            {ingredients.ingredients.map((ing, index) => {
                               return <BurgerConstructorListElement
                                    ing={ing}
                                    id={ing.id}
                                    index={index}
                                    moveIngredient={moveIngredient}
                                />
                            })
                            }

                        </ul>
                    </li>
                </>
            ) : (
                <>
                    <div className={ingredients.isDraggingIng ? burgerConstructorStyle.active_border : ''} style={{ width: 536, textAlign: 'center', borderTopRightRadius: 40, borderTopLeftRadius: 40, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, backgroundColor: 'rgba(28, 28, 33, 1)' }}>
                        <p className='text text_type_main-medium mt-4 mb-4'>Добавьте ингредиент</p>
                    </div>
                </>
            )
            }
            {ingredients.bun !== null ? (
                <>
                    <li className="mr-4">
                        <ConstructorElement
                            className='mr-4'
                            type="bottom"
                            isLocked={true}
                            text={`${ingredients.bun.name} (низ)`}
                            price={ingredients.bun.price}
                            thumbnail={ingredients.bun.image}
                        />
                    </li>
                </>
            ) : (
                <>
                    <div className={ingredients.isDraggingBun ? burgerConstructorStyle.active_border : ''} style={{ width: 536, textAlign: 'center', borderTopRightRadius: 40, borderTopLeftRadius: 40, borderBottomLeftRadius: 88, borderBottomRightRadius: 88, backgroundColor: 'rgba(28, 28, 33, 1)' }}>
                        <p className='text text_type_main-medium mt-4 mb-4' >Добавьте булку</p>
                    </div>
                </>

            )
            }
        </ul>
    )
}

export default BurgerConstructorList