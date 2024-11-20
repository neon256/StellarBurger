import React from 'react';
import burgerIngredientsStyle from '../burger-ingredients.module.css'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsTitle from '../burger-ingredients-title/burger-ingredients-title';
import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';

class BurgerIngredientsList extends React.Component{
    state = {  } 
    
    render() { 
        return (
        <section className={burgerIngredientsStyle.ingredients_container}>
            <BurgerIngredientsTitle>Булки</BurgerIngredientsTitle>
            <BurgerIngredientsCard data={this.props.data} type='bun'/>
            <BurgerIngredientsTitle>Соусы</BurgerIngredientsTitle>
            <BurgerIngredientsCard data={this.props.data} type='sauce'/>
            <BurgerIngredientsTitle>Начинки</BurgerIngredientsTitle>
            <BurgerIngredientsCard data={this.props.data} type='main'/>
        </section>
        );
    }
}
 
export default BurgerIngredientsList;