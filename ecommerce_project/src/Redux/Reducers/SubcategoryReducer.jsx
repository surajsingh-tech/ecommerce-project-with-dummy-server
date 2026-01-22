import { CREATE_SUBCATEGORY_REDUCER, DELETE_SUBCATEGORY_REDUCER, GET_SUBCATEGORY_REDUCER, UPDATE_SUBCATEGORY_REDUCER } from "../Sagas/Services/Constants"
export function SubcategoryReducer(state=[],action)
{
    switch(action.type)
    {
             case CREATE_SUBCATEGORY_REDUCER:
             return [...state,action.payload]
             case UPDATE_SUBCATEGORY_REDUCER:
                let indx=state.findIndex(x=>x.id===action.payload.id)
                state[indx].name=action.payload.name
                state[indx].pic=action.payload.pic
                state[indx].active=action.payload.active
             return state
             case GET_SUBCATEGORY_REDUCER:
             return [...action.payload];
             
             case DELETE_SUBCATEGORY_REDUCER:
             return state.filter(x=>x.id!==action.payload.id)
             default :return state
    }
}