import { CREATE_CART_REDUCER, DELETE_CART_REDUCER, GET_CART_REDUCER} from "../Sagas/Services/Constants"
export function CartReducer(state=[],action)
{
    switch(action.type)
    {
             case CREATE_CART_REDUCER:
             return [...state,action.payload]
             
             case GET_CART_REDUCER:
             return [...action.payload];
             case DELETE_CART_REDUCER:
             return state.filter(x=>x.id!==action.payload.id)
             default :return state
    }
}