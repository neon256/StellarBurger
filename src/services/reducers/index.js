import { combineReducers, createStore } from "redux";
import { activeTab, listAllGetIngridients} from "./burger-ingridients";
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
    order: order
  });
  
  export const store = createStore(rootReducer, {}, devToolsEnhancer(thunk));