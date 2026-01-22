import { CREATE_SETTING_REDUCER, DELETE_SETTING_REDUCER, GET_SETTING_REDUCER, UPDATE_SETTING_REDUCER } from "../Sagas/Services/Constants"
export function SettingReducer(state=[],action)
{   
    switch(action.type)
    {
             case CREATE_SETTING_REDUCER:
             return [...state,action.payload]
             case UPDATE_SETTING_REDUCER:
                let indx=state.findIndex(x=>x.id===action.payload.id)
                state[indx].name=action.payload.name
                state[indx].pic=action.payload.pic
                state[indx].active=action.payload.active
             return state
             case GET_SETTING_REDUCER:
             return [...action.payload];
             default:return state;
    }
}