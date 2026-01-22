import { CREATE_WISHLIST_REDUCER, DELETE_WISHLIST_REDUCER, GET_WISHLIST_REDUCER } from "../Sagas/Services/Constants"
export function WishListReducer(state=[],action)
{
    switch(action.type)
    {
             case CREATE_WISHLIST_REDUCER:
             return [...state,action.payload]
             case GET_WISHLIST_REDUCER:
             return [...action.payload];
             case DELETE_WISHLIST_REDUCER:
             return state.filter(x=>x.id!==action.payload.id)
             default :return state
    }
}