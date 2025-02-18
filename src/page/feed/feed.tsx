import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect } from "react";
import style from "./feed.module.css";
import FeedCard from "../../components/feed-card/feed-card";
import { useDispatch, useSelector } from "react-redux";
import {
  WEBSOCKET_CONNECT,
  WEBSOCKET_DISCONNECT,
  WEBSOCKET_MESSAGE_RECEIVED,
} from "../../services/constants/ws";
import { AppDispatch, IOrderIngredients, RootState } from "../../services/type/data";
import { useLocation } from "react-router-dom";
const Feed = () => {
  const dispatch: AppDispatch = useDispatch();
  const data = useSelector((state: RootState) => state.ws);
  useEffect(() => {
    dispatch({ type: WEBSOCKET_CONNECT });
    if (data.isConnecting == true) {
      dispatch({ type: WEBSOCKET_MESSAGE_RECEIVED });
    }
    return () => {
      dispatch({ type: WEBSOCKET_DISCONNECT });
    };
  }, [dispatch]);
  const location: { pathname: string} = useLocation()
  return (
    <div className={style.container}>
      <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
      <div className={style.info__container}>
        <div className={style.card__container}>
          <FeedCard data={data.feed.orders} link={'/feed/'} location={location}/>
        </div>
        <div>
          <div className={style.info}>
            <div className={style.info__header}>
              <div className={style.completed}>
                <p className="text text_type_main-medium">Готовы:</p>
                <div>
                  {data.feed.orders &&
                    data.feed.orders.map(
                      (item: IOrderIngredients, index: number) => {
                        if (index > 7) {
                          return;
                        }
                        if (item.status === "done") {
                          return (
                            <p className="text text_type_digits-default">
                              {item.number}
                            </p>
                          );
                        }
                      }
                    )}
                </div>
              </div>
              <div className={style.doing}>
                <p className="text text_type_main-medium">В работе:</p>
                <div>
                  {data.feed.orders &&
                    data.feed.orders.map(
                      (item: IOrderIngredients, index: number) => {
                        if (index > 7) {
                          return;
                        }
                        if (item.status !== "done") {
                          return (
                            <p className="text text_type_digits-default">
                              {item.number}
                            </p>
                          );
                        }
                      }
                    )}
                </div>
              </div>
            </div>
            <div className={`mt-5 ${style.completed_all_time}`}>
              <p className="text text_type_main-large">
                Выполнено за все время:
              </p>
              <p className="text text_type_digits-large">{data.feed.total}</p>
            </div>
            <div className={`${style.completed_to_day}`}>
              <p className="text text_type_main-large">Выполнено за сегодня:</p>
              <p className="text text_type_digits-large">
                {data.feed.totalToday}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
