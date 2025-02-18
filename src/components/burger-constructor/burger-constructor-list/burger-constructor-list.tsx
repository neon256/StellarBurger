import React, { useCallback, useEffect } from 'react'
import burgerConstructorStyle from '../burger-constructor.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { BUN_SAVE, CHANGE_INGREDIENTS_POSITION, INGREDIENTS_SAVE } from '../../../services/constants/burger-constructor';
import BurgerConstructorListElement from './burger-constructor-list-element';
import update from 'immutability-helper'
import { v4 as uuidv4 } from 'uuid';
import { AppDispatch, RootState } from '../../../services/type/data';

const BurgerConstructorList = () => {
    const ingredients = useSelector((state: RootState) => state.burgerConstructor);
    const dispatch: AppDispatch = useDispatch()

    function onDropHandler(item: any) {
        if (item.type === 'bun') {
            dispatch({
                type: BUN_SAVE,
                value: item,
            })
        } else {
            dispatch({
                type: INGREDIENTS_SAVE,
                value: {
                    ...item,
                  uuid: uuidv4()
                }
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
        (dragIndex: number, hoverIndex: number) => {
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

                <li className="mr-4">
                    <ConstructorElement
                        text={`${ingredients.bun.name} (верх)`}
                        type="top"
                        price={ingredients.bun.price}
                        isLocked={true}
                        thumbnail={ingredients.bun.image}
                    />
                </li>

            ) : (

                <div className={`${ingredients.isDraggingBun ? burgerConstructorStyle.active_border : ''} ${burgerConstructorStyle.current_bun_top_card}`}>
                    <p className='text text_type_main-medium mt-4 mb-4'>Добавьте булку</p>
                </div>


            )
            }
            {ingredients.ingredients.length > 0 ? (

                <li>
                    <ul className={burgerConstructorStyle.ingredients_main_container}>
                        {ingredients.ingredients.map((ing: any, index: number) => {
                            return <BurgerConstructorListElement
                                key={ing.uuid}
                                ing={ing}
                                id={ing.id}
                                index={index}
                                moveIngredient={moveIngredient}
                            />
                        })
                        }

                    </ul>
                </li>

            ) : (

                <div className={`${ingredients.isDraggingIng ? burgerConstructorStyle.active_border : ''} ${burgerConstructorStyle.current_ingredients_card}`} >
                    <p className='text text_type_main-medium mt-4 mb-4'>Добавьте ингредиент</p>
                </div>

            )
            }
            {ingredients.bun !== null ? (

                <li className="mr-4">
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${ingredients.bun.name} (низ)`}
                        price={ingredients.bun.price}
                        thumbnail={ingredients.bun.image}
                    />
                </li>

            ) : (

                <div className={`${ingredients.isDraggingBun ? burgerConstructorStyle.active_border : ''} ${burgerConstructorStyle.current_bun_button_card}`} >
                    <p className='text text_type_main-medium mt-4 mb-4' >Добавьте булку</p>
                </div>
            )
            }
        </ul>
    )
}

export default BurgerConstructorList