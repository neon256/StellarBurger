import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { activeTab, listAllGetIngridients } from "./burger-ingridients";
import { devToolsEnhancer } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import { viewedIngridients } from "./ingredient-details";
import { burgerConstructor, constructor } from "./burger-constructor";
import { order } from "./order";

const rootReducer = combineReducers({
  ingridient: listAllGetIngridients,
  details: viewedIngridients,
  tab: activeTab,
  burgerConstructor: burgerConstructor,
  order: order,
});

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
    const enhancer = composeEnhancers(applyMiddleware(thunk));
export const store = createStore(rootReducer, enhancer);
