import React, { FC } from "react";
import style from "./feed-card.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  IIngredients,
  IOrder,
  IOrderIngredients,
  RootState,
} from "../../services/type/data";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { number } from "prop-types";
import { useAppSelector } from "../../utils/hook";
interface IFeed {
  status?: boolean;
  data: Array<IOrderIngredients>;
  link: string
  location?: {pathname: string}
}

const FeedCard: FC<IFeed> = ({ status, data, link, location }) => {
  let cost: number = 0;
  const ingredient = useAppSelector((state) => state.ingridient.data);
  const navigate = useNavigate();
  return (
    <>
      {data &&
        data.map((item) => {
          cost = 0;
          
          return (
            <Link  className={`p-6 ${style.card}`} to={`${link}${item._id}`} state={{background: location}}>
              <div className={style.card__header}>
                <p className="text text_type_digits-default">#{item.number}</p>
                <p className="text text_type_main-default">
                  <FormattedDate date={new Date(item.createdAt)} />
                </p>
              </div>

              {!status && (
                <>
                  <h1 className="text text_type_main-medium mt-6 mb-6">
                    {item.name}
                  </h1>
                </>
              )}
              {status && (
                <>
                  <h1 className="text text_type_main-medium mt-6 ">
                    {item.name}
                  </h1>
                  <p className="text text_type_main-default mt-2 mb-6">
                    {item.status == 'done' ? 'Выполнен': item.status == 'pending' ? "Готовится" : "Создан"}
                  </p>
                </>
              )}
              <div className={style.card__footer}>
                <div className={style.image__container}>
                  {item.ingredients.map((item, index) => {
                    if (index == 5) {
                      return (
                        <div className={style.card__image}>
                          <img
                            src={
                              ingredient.find((ing: IIngredients) => ing._id == item)?.image_mobile
                            }
                            className={style.test}
                          />
                          <div className={style.overlay}>
                            <p className="text text_type_digits-small">
                              +{item.length - 4}
                            </p>
                          </div>
                        </div>
                      );
                    } else if (index > 5) {
                      return <></>;
                    } else {
                      return (
                        <div className={style.card__image}>
                          <img
                            src={
                              ingredient.find((ing: IIngredients) => ing._id == item)?.image_mobile
                            }
                            className={style.test}
                          />
                        </div>
                      );
                    }
                  })}
                </div>
                <p
                  className={`text text_type_digits-default ${style.card__cost}`}
                >
                  {item.ingredients.map((ing, index) => {
                    let price = ingredient.find(
                      (ingr: IIngredients) => ingr._id == ing
                    )?.price || 0;
                    cost += price;
                    if (item.ingredients.length == index + 1) {
                      return <>{cost}</>;
                    }
                  })}
                  <CurrencyIcon type="primary" />
                </p>
              </div>
            </Link>
          );
        })}
    </>
  );
};

export default FeedCard;
