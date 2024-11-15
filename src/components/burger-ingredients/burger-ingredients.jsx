import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import burgerIngredientsStyle from './burger-ingredients.module.css'
import BurgerIngredientsList from './burger-ingredients-list/burger-ingredients-list'
import BurgerIngredientsNav from './burger-ingredients-nav/burger-ingredients-nav'
import PropTypes, { arrayOf } from 'prop-types'

const BurgerIngredients = ({ data }) => {    
  return (
    <section className={`mt-10 ${burgerIngredientsStyle.container}`}>
        <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
        <BurgerIngredientsNav/>
        <BurgerIngredientsList data={data}/>
    </section>
  )
}
BurgerIngredients.propTypes = {
    data: arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        __v: PropTypes.number
      }))
}

export default BurgerIngredients