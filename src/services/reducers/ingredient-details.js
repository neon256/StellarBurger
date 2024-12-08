import { DELETE_INGRIDIENTS_DETAIL, INGRIDIENTS_DETAIL } from "../actions/ingredient-details"

const initialDetails ={
    data: [],
}


export const viewedIngridients = (state = initialDetails, action) => {
    switch(action.type){
        case INGRIDIENTS_DETAIL:{
            return{
                data: action.value
            }
        }
        case DELETE_INGRIDIENTS_DETAIL:{
            return{
                data:[]
            }
        }
        default:{
            return{state}
        }
    }
}