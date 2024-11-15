import React from 'react'
import burgerConstructorStyle from '../burger-constructor.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
const BurgerConstructorList = ({ data }) => {

    const bun = data.find((element) => {
        if(element.type === 'bun'){
            return element;
        }
        return
    });
    
  return (
    <ul className={`mb-10 ${burgerConstructorStyle.ingredients_container}`}>
        <li className="mr-4">
            <ConstructorElement                
                text={`${bun.name} (верх)`}
                type="top"
                price={bun.price}
                isLocked={true}
                thumbnail={bun.image}
            />
        </li>
        <li>
            <ul className={burgerConstructorStyle.ingredients_main_container}>
                {data.filter((element) => {
                    if(element.type !== 'bun'){
                    return element
                    }
                    return
                    }).map((ing) => {
                    return(
                        <li className={burgerConstructorStyle.ingredients} key={ing._id}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text={ing.name}
                                price={ing.price}
                                thumbnail={ing.image}
                            />
                        </li>
                                    
                    )
                    })
                }
            </ul>
        </li>        
        <li className="mr-4">
            <ConstructorElement
                className='mr-4'
                type="bottom"
                isLocked={true}
                text={`${bun.name} (низ)`}
                price={bun.price}
                thumbnail={bun.image}
            />
        </li>
    </ul>
  )
}

export default BurgerConstructorList