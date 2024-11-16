import React from "react";
import appMainStyle from './app-main.module.css';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConctructor from "../burger-constructor/burger-constructor";
import PropTypes, { arrayOf } from "prop-types";
import { ingredientType } from "../../utils/types";

class AppMain extends React.Component {
    state = {  } 
    render() { 
        return (
            <main className={appMainStyle.container}>
                <BurgerIngredients data={this.props.data}/>
                <BurgerConctructor data={this.props.data}/>
            </main>
        );
    }
}
ingredientType(AppMain);
export default AppMain;