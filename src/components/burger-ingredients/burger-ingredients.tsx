import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { FC } from 'react'
import burgerIngredientsStyle from './burger-ingredients.module.css'
import BurgerIngredientsList from './burger-ingredients-list/burger-ingredients-list'
import BurgerIngredientsNav from './burger-ingredients-nav/burger-ingredients-nav'
import PropTypes, { arrayOf } from 'prop-types'

interface IBurgerIngredients {
  location: {pathname: string};
} 

const BurgerIngredients: FC<IBurgerIngredients> = ({location}) => {
  return (
    <section className={`mt-10 ${burgerIngredientsStyle.container}`}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <BurgerIngredientsNav />
      <BurgerIngredientsList location={location}/>
    </section>
  )

}
export default BurgerIngredients