import React from "react";
import appMainStyle from './home-page.module.css';
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConctructor from "../../components/burger-constructor/burger-constructor";
import PropTypes, { arrayOf } from "prop-types";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useLocation } from "react-router-dom";

function HomePage() {
    const location: { pathname: string} = useLocation()
    console.log(location)
    return (
        <main className={appMainStyle.container}>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients location={location}/>
                <BurgerConctructor />
            </DndProvider>
        </main>
    );
}
export default HomePage;