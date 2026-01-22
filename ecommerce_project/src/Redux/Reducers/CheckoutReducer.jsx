import { CREATE_CHECKOUT_REDUCER, DELETE_CHECKOUT_REDUCER, GET_CHECKOUT_REDUCER,UPDATE_CHECKOUT_REDUCER} from "../Sagas/Services/Constants";
export function CheckoutReducer(state=[],action)
{
    switch(action.type)
    {
             case  CREATE_CHECKOUT_REDUCER:
             return [...state,action.payload]
             case GET_CHECKOUT_REDUCER:
             return [...action.payload];
             case DELETE_CHECKOUT_REDUCER:
             return state.filter(x=>x.id!==action.payload.id)
             case UPDATE_CHECKOUT_REDUCER: {
                return state.map(item =>
                     item.id === action.payload.id
                    ? { ...item, ...action.payload } 
                    : item);
                }
             default :return state
    }
}