import React, { FC, useEffect, useState } from "react";
import style from "./feed-by-id.module.css";
import { AppDispatch, IIngredients, IOrderIngredients, RootState } from "../../services/type/data";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../services/actions/order";
import { useAppDispatch, useAppSelector } from "../../utils/hook";

interface IFeedById {
  status?: string;

}

const FeedById: FC<IFeedById> = ({ status }) => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const feed = useAppSelector((state) => state.ws.feed.orders);
  const orders = useAppSelector((state) => state.ws.orders.orders);
  
  const ingredients = useAppSelector((state) => state.ingridient.data);
  const [check, setCheck] = useState(false);
  let order: IOrderIngredients;


  if(orders){
    order = orders.find((item: IOrderIngredients) => item._id == params.id);
  } else {
    order = feed.find((item: IOrderIngredients) => item._id == params.id);
  } 
  let cost: number = 0;

  return (
    <div className={style.container}>
      <div className={`p-6 ${style.card}`}>
        <div className={style.card__header}>
          <p className="text text_type_digits-medium mb-10">#340005</p>
        </div>
        {order.status && (
          <>
            <h1 className="text text_type_main-medium mt-3 ">
              {order.name}
            </h1>
            <p className="text text_type_main-default mb-15">{order.status}</p>
          </>
        )}
        <div className={style.card__footer}>
          <p className="text text_type_main-medium mb-6">Состав:</p>
          <div className={style.info__container}>
            {order.ingredients.map((item: string, index: number) => {
              cost = 0
              return (
                <div className={style.card__info}>
                  <div className={style.card__image}>
                    <img
                      src={
                        ingredients.find((ing: IIngredients) => ing._id == item)?.image_mobile
                      }
                      className={style.test}
                    />
                  </div>
                  <p className="text text_type_main-medium">{ingredients.find((ing: IIngredients) => ing._id == item)?.name}</p>
                  <div
                    className={`text text_type_digits-default ${style.ing__cost}`}
                  >
                    1 x {ingredients.find((ing: IIngredients) => ing._id == item)?.price}
                    <CurrencyIcon type="primary" />
                  </div>
                </div>
              );
            })}
          </div>
          <div
            className={`text text_type_digits-default mt-10 ${style.card__cost}`}
          >
            <p className="text text_type_main-default">Сегодня, 16:20</p>
            <p className={style.cost}>
            {order.ingredients.map((ing:string, index: number) => {
                    let price: number = ingredients.find(
                      (ingr: any) => ingr._id == ing
                    )?.price || 0;
                    cost += price;
                    if (order.ingredients.length == index + 1) {
                      return <>{cost}</>;
                    }
                  })}
              <CurrencyIcon type="primary" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedById;
