import { CREATE_FEATURE_REDUCER, DELETE_FEATURE_REDUCER, GET_FEATURE_REDUCER, UPDATE_FEATURE_REDUCER } from "../Sagas/Services/Constants"
export function FeatureReducer(state=[],action)
{
    switch(action.type)
    {
             case CREATE_FEATURE_REDUCER:
             return [...state,action.payload]
             case UPDATE_FEATURE_REDUCER:  
                let indx=state.findIndex(x=>x.id===action.payload.id)
                state[indx].name=action.payload.name
                state[indx].shortDescription=action.payload.shortDescription
                state[indx].icon=action.payload.icon
                state[indx].active=action.payload.active
             return state
             case GET_FEATURE_REDUCER:
             return [...action.payload];
             
             case DELETE_FEATURE_REDUCER:
             return state.filter(x=>x.id!==action.payload.id)
             default :return state
    }
}