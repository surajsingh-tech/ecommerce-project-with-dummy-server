import { CREATE_MAINCATEGORY_REDUCER, DELETE_MAINCATEGORY_REDUCER, GET_MAINCATEGORY_REDUCER, UPDATE_MAINCATEGORY_REDUCER } from "../Sagas/Services/Constants"
export function MaincategoryReducer(state=[],action)
{
    switch(action.type)
    {
             case CREATE_MAINCATEGORY_REDUCER:
             return [...state,action.payload]
             case UPDATE_MAINCATEGORY_REDUCER:
                let indx=state.findIndex(x=>x.id===action.payload.id)
                state[indx].name=action.payload.name
                state[indx].pic=action.payload.pic
                state[indx].active=action.payload.active
             return state
             case GET_MAINCATEGORY_REDUCER:
             return [...action.payload];
             
             case DELETE_MAINCATEGORY_REDUCER:
             return state.filter(x=>x.id!==action.payload.id)
             default :return state
    }
}