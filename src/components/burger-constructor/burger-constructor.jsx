import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyle from './burger-constructor.module.css'
import React, { useEffect, useMemo, useState } from "react";
import BurgerConstructorList from "./burger-constructor-list/burger-constructor-list";
import PropTypes, { arrayOf } from "prop-types";
import Modal from "../modal/modal";
import OrderDetails from "../modal/order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { order, POST_INGRIDIENTS_FAILED, POST_INGRIDIENTS_REQUEST, POST_INGRIDIENTS_SUCCESS } from "../../services/actions/order";

function BurgerConctructor() {
    const [visible, setVisible] = useState(false);
    const ingredients = useSelector(state => state.burgerConstructor);
    const dispatch = useDispatch();
    const [totalPrice, setTotalPrice] = useState(0);
    

    const price = useMemo(() => {
        return ingredients.ingredients.reduce(
            (sum, cur) => sum + cur.price,
            0
        ) + (ingredients.bun ? ingredients.bun.price * 2 : 0)
    },
        [ingredients]);

    const orderItems = useMemo(() => {
        if (ingredients.bun) {
            const arr = ingredients.ingredients.map(item => item._id)
            arr.push(ingredients.bun._id)
            arr.unshift(ingredients.bun._id)
            return arr
        }
    }, [ingredients])
    function handleOpenModal() {
        setVisible(true)
    }

    function handleCloseModal() {
        setVisible(false)
    }
    function createOrder(orderItems, handleOpenModal){
        dispatch(order(orderItems, handleOpenModal))
    }

    const modal = (
        <Modal header='' onClose={handleCloseModal}>
            <OrderDetails />
        </Modal>
    )

    return (
        <section className={`mt-25 ${burgerConstructorStyle.container}`}>
            <BurgerConstructorList />
            <div className={`mr-4 ${burgerConstructorStyle.button_container}`}>
                <p className="text text_type_main-large"> {price} <CurrencyIcon type="primary" /></p>
                <Button htmlType="button" type="primary" size="large" onClick={()=>{return createOrder(orderItems, handleOpenModal)}}>
                    Оформить заказ
                </Button>
            </div>
            {visible && modal}
        </section>

    );
}
export default BurgerConctructor;