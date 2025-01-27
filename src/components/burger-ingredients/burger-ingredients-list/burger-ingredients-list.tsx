import React, { FC, useState } from "react";
import burgerIngredientsStyle from "../burger-ingredients.module.css";
import BurgerIngredientsTitle from "../burger-ingredients-title/burger-ingredients-title";
import BurgerIngredientsCard from "../burger-ingredients-card/burger-ingredients-card";
import { useDispatch, useSelector } from "react-redux";
import { ACTIVE_TAB } from "../../../services/actions/burger-ingridients";
import PropTypes from "prop-types";
import { IBurgerIngredients } from "../../../utils/ingredients-interface";

interface IBurgerIngredientsList {
  location: { pathname: string };
}

const BurgerIngredientsList: FC<IBurgerIngredientsList> = ({ location }) => {
  const dispatch = useDispatch();
  const [scrollTop, setScrollTop] = useState<number>(0);
  const ingredients = useSelector((state: any) => state.ingridient.data);
  const handleScroll = (event: React.UIEvent) => {
    if (event.currentTarget.scrollTop < 270) {
      dispatch({
        type: ACTIVE_TAB,
        value: "one",
      });
    } else if (
      event.currentTarget.scrollTop >= 270 &&
      event.currentTarget.scrollTop <= 780
    ) {
      dispatch({
        type: ACTIVE_TAB,
        value: "two",
      });
    } else {
      dispatch({
        type: ACTIVE_TAB,
        value: "three",
      });
    }
    setScrollTop(event.currentTarget.scrollTop);
  };

  return (
    <section
      className={burgerIngredientsStyle.ingredients_container}
      onScroll={handleScroll}
    >
      <BurgerIngredientsTitle>Булки</BurgerIngredientsTitle>
      <div className={burgerIngredientsStyle.card_container}>
        {ingredients
          .filter((ing: IBurgerIngredients) => {
            if (ing.type === "bun") {
              return ing;
            }
            return;
          })
          .map(
            (
              ing: IBurgerIngredients,
              i: number
            ) => {
              return (
                <BurgerIngredientsCard
                  key={i}
                  id={ing._id}
                  ing={ing}
                  location={location}
                />
              );
            }
          )}
      </div>
      <BurgerIngredientsTitle>Соусы</BurgerIngredientsTitle>
      <div className={burgerIngredientsStyle.card_container}>
        {ingredients
          .filter((ing: IBurgerIngredients) => {
            if (ing.type === "sauce") {
              return ing;
            }
            return;
          })
          .map(
            (
              ing: IBurgerIngredients,
              i: number
            ) => {
              return (
                <BurgerIngredientsCard
                  key={i}
                  id={ing._id}
                  ing={ing}
                  location={location}
                />
              );
            }
          )}
      </div>
      <BurgerIngredientsTitle>Начинки</BurgerIngredientsTitle>
      <div className={burgerIngredientsStyle.card_container}>
        {ingredients
          .filter((ing: IBurgerIngredients) => {
            if (ing.type === "main") {
              return ing;
            }
            return;
          })
          .map(
            (
              ing: IBurgerIngredients,
              i: number
            ) => {
              return (
                <BurgerIngredientsCard
                  key={i}
                  id={ing._id}
                  ing={ing}
                  location={location}
                />
              );
            }
          )}
      </div>
    </section>
  );
};
export default BurgerIngredientsList;
