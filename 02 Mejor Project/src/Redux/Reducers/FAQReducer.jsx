import { CREATE_FAQ_REDUCER, DELETE_FAQ_REDUCER, GET_FAQ_REDUCER, UPDATE_FAQ_REDUCER } from "../Sagas/Services/Constants"
export function FaqReducer(state=[],action)
{
    switch(action.type)
    {
             case CREATE_FAQ_REDUCER:
             return [...state,action.payload]
             case UPDATE_FAQ_REDUCER:
                let indx=state.findIndex(x=>x.id===action.payload.id)
                state[indx].question=action.payload.question
                state[indx].answer=action.payload.answer
                state[indx].active=action.payload.active
             return state
             case GET_FAQ_REDUCER:
             return [...action.payload];
             
             case DELETE_FAQ_REDUCER:
             return state.filter(x=>x.id!==action.payload.id)
             default :return state
    }
}