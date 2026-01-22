import { CREATE_BRAND_REDUCER, DELETE_BRAND_REDUCER, GET_BRAND_REDUCER, UPDATE_BRAND_REDUCER } from "../Sagas/Services/Constants"
export function BrandReducer(state=[],action)
{
    switch(action.type)
    {
             case CREATE_BRAND_REDUCER:
             return [...state,action.payload]
             case UPDATE_BRAND_REDUCER:
                let indx=state.findIndex(x=>x.id===action.payload.id)
                state[indx].name=action.payload.name
                state[indx].pic=action.payload.pic
                state[indx].active=action.payload.active
             return state
             case GET_BRAND_REDUCER:
             return [...action.payload];
             
             case DELETE_BRAND_REDUCER:
             return state.filter(x=>x.id!==action.payload.id)
             default :return state
    }
}