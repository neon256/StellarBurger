import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyle from './burger-constructor.module.css'
import React, { useEffect, useState } from "react";
import BurgerConstructorList from "./burger-constructor-list/burger-constructor-list";
import PropTypes, { arrayOf } from "prop-types";
import { ingredientType } from "../../utils/types";
import Modal from "../modal/modal";
import OrderDetails from "../modal/order-details/order-details";

function BurgerConctructor({ data }) {
    const [visible, setVisible] = useState(false);

    const handleEscClick = (event) =>{
        if(event.key === 'Escape'){
            handleCloseModal();
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleEscClick);
        return () => {
            document.removeEventListener('keydown', handleEscClick);
        }
    },[])

    const count = data.filter((element) => {
        if (element.name !== 'Флюоресцентная булка R2-D3') {
            return element
        }
        return
    }).map(ing => ing.price).reduce((prev, curr) => prev + curr, 1255);

    function handleOpenModal() {
        setVisible(true)
    }

    function handleCloseModal() {
        setVisible(false)
    }

    const modal = (
        <Modal header='' onClose={handleCloseModal}>
            <OrderDetails/>
        </Modal>
    )

    return (
        <section className={`mt-25 ${burgerConstructorStyle.container}`}>
            <BurgerConstructorList data={data} />
            <div className={`mr-4 ${burgerConstructorStyle.button_container}`}>
                <p className="text text_type_main-large">{count} <CurrencyIcon type="primary" /></p>
                <Button htmlType="button" type="primary" size="large" onClick={handleOpenModal}>
                    Оформить заказ
                </Button>
            </div>
            {visible && modal}
        </section>
        
    );
}
ingredientType(BurgerConctructor);
export default BurgerConctructor;