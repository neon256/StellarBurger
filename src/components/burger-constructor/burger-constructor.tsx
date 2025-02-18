import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyle from "./burger-constructor.module.css";
import React, { useEffect, useMemo, useState } from "react";
import BurgerConstructorList from "./burger-constructor-list/burger-constructor-list";
import PropTypes, { any, arrayOf } from "prop-types";
import Modal from "../modal/modal";
import OrderDetails from "../modal/order-details/order-details";

import { useDrop } from "react-dnd";
import {
  order,
} from "../../services/actions/order";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { IBurgerIngredients } from "../../utils/ingredients-interface";
import { AppDispatch, RootState } from "../../services/type/data";
import { useAppDispatch, useAppSelector } from "../../utils/hook";

function BurgerConctructor() {
  const [visible, setVisible] = useState<boolean>(false);
  const ingredients = useAppSelector((state) => state.burgerConstructor);
  const dispatch = useAppDispatch();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [flag, setFlag] = useState(false)
  const navigate = useNavigate();
  const location = useLocation()
  const price = useMemo(() => {
    return (
      ingredients.ingredients.reduce(
        (sum: number, cur: IBurgerIngredients) => sum + cur.price,
        0
      ) + (ingredients.bun ? ingredients.bun.price * 2 : 0)
    );
  }, [ingredients]);

  const orderItems = useMemo(() => {
    if (ingredients.bun) {
      const arr = ingredients.ingredients.map((item:IBurgerIngredients) => item._id);
      arr.push(ingredients.bun._id);
      arr.unshift(ingredients.bun._id);
      return arr;
    }
  }, [ingredients]);
  function handleOpenModal() {
    setVisible(true);
  }

  function handleCloseModal() {
    setVisible(false);
  }
  function createOrder(orderItems?: string[], handleOpenModal?: ()=> void) {
    if (!localStorage.getItem("accessToken")) {
      return setFlag(true)
    }
    if (!orderItems) {
      return;
    }
    dispatch(order(orderItems, handleOpenModal));
  }

  const modal = (
    <Modal header="" onClose={handleCloseModal}>
      <OrderDetails />
    </Modal>
  );

  return (
    <section className={`mt-25 ${burgerConstructorStyle.container}`}>
      <BurgerConstructorList />
      <div className={`mr-4 ${burgerConstructorStyle.button_container}`}>
        <p className="text text_type_main-large">
          {" "}
          {price} <CurrencyIcon type="primary" />
        </p>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={() => {
            return createOrder(orderItems, handleOpenModal);
          }}
        >
          Оформить заказ
        </Button>
       {flag &&
        <Navigate to="/login" state={{ from: location}}/>
       } 
      </div>
      {visible && modal}
    </section>
  );
}
export default BurgerConctructor;
