import React from "react";
import appMainStyle from './app-main.module.css';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConctructor from "../burger-constructor/burger-constructor";
import PropTypes, { arrayOf } from "prop-types";
import { ingredientType } from "../../utils/types";

function AppMain({data}){ 
        return (
            <main className={appMainStyle.container}>
                <BurgerIngredients data={data}/>
                <BurgerConctructor data={data}/>
            </main>
        );
    }
ingredientType(AppMain);
export default AppMain;