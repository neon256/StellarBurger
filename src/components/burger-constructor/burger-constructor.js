import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyle from './burger-constructor.module.css'
import React from "react";
import BurgerConstructorList from "./burger-constructor-list/burger-constructor-list";
import PropTypes, { arrayOf } from "prop-types";
import { ingredientType } from "../../utils/types";

class BurgerConctructor extends React.Component {
    state = { 

    } 
    render() {

        const count = this.props.data.filter((element) => {
            if(element.name !== 'Флюоресцентная булка R2-D3'){
                return element
            }
            return
        }).map(ing => ing.price).reduce((prev, curr) => prev + curr, 1255);

        return (
            <section className={`mt-25 ${burgerConstructorStyle.container}`}>
                <BurgerConstructorList data={this.props.data}/>
                <div className={`mr-4 ${burgerConstructorStyle.button_container}`}>
                    <p className="text text_type_main-large">{count} <CurrencyIcon type="primary" /></p>
                    <Button htmlType="button" type="primary" size="large">
                        Оформить заказ
                    </Button>
                </div>
            </section>
        );
    }
}
ingredientType(BurgerConctructor);
export default BurgerConctructor;