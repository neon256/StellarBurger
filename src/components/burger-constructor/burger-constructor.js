import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyle from './burger-constructor.module.css'
import React from "react";
import BurgerConstructorList from "./burger-constructor-list/burger-constructor-list";
import PropTypes, { arrayOf } from "prop-types";

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
BurgerConctructor.propTypes = {
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
export default BurgerConctructor;