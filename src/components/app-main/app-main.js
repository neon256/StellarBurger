import React from "react";
import appMainStyle from './app-main.module.css';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConctructor from "../burger-constructor/burger-constructor";
import PropTypes, { arrayOf } from "prop-types";

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
AppMain.propTypes = {
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
export default AppMain;