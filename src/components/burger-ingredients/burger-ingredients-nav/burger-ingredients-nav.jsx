import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import { useSelector } from 'react-redux'

const BurgerIngredientsNav = () => {
    const [current, setCurrent] = React.useState('one')
    const tab = useSelector(state => state.tab.tab)
    return (
        <div style={{ display: 'flex' }} className='mb-10'>
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