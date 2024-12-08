import React from "react";
import appMainStyle from './app-main.module.css';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConctructor from "../burger-constructor/burger-constructor";
import PropTypes, { arrayOf } from "prop-types";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

function AppMain() {
    return (
        <main className={appMainStyle.container}>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConctructor />
            </DndProvider>
        </main>
    );
}
export default AppMain;