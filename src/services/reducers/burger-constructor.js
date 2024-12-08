import { act } from "react"
import { BUN_SAVE, CHANGE_INGREDIENTS_POSITION, INGREDIENTS_REMOVE, INGREDIENTS_SAVE, SET_INGREDIENTS_PRICE } from "../actions/burger-constructor"

const initialConstuctor = {
    bun: null,
    ingredients: [],

    isDraggingBun: false,
    isDraggingIng: false,

    
}

export const burgerConstructor = (state = initialConstuctor, action) => {
    switch(action.type){
        case INGREDIENTS_SAVE:{
            return{
                ...state,
                ingredients: [...state.ingredients, action.value],
            }
        }
        case BUN_SAVE:{
            return{
                ...state,
                bun: action.value,
            }
        }
        case SET_INGREDIENTS_PRICE:{
            return{
                ...state,
                isDraggingBun: action.dragBun,
                isDraggingIng: action.dragIng
            }
        }
        case CHANGE_INGREDIENTS_POSITION:{
            return{
                ...state,
                ingredients: action.change
            }
        }
        case INGREDIENTS_REMOVE:{
            return{
                ...state,
                ingredients:[],
                bun:[]
            }
        }
        default:{
            return state
        }
    }
}