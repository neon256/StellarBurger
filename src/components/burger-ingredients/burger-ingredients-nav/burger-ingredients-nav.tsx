import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import { useSelector } from 'react-redux'
import burgerIngredientsStyle from '../burger-ingredients.module.css'

const BurgerIngredientsNav = () => {
    const [current, setCurrent] = React.useState<string>('one')
    const tab = useSelector((state: any) => state.tab.tab)
    return (
        <div  className={`mb-10  ${burgerIngredientsStyle.flex}`}>
            <Tab value="one" active={tab === 'one'} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value="two" active={tab === 'two'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value="three" active={tab === 'three'} onClick={setCurrent}>
                Начинки
            </Tab>
        </div>
    )
}

export default BurgerIngredientsNav