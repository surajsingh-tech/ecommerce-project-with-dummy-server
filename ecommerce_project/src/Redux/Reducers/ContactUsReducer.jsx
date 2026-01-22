import { CREATE_CONTACT_REDUCER, DELETE_CONTACT_REDUCER, GET_CONTACT_REDUCER,UPDATE_CONTACT_REDUCER} from "../Sagas/Services/Constants";
export function ContactReducer(state=[],action)
{
    switch(action.type)
    {
             case  CREATE_CONTACT_REDUCER:
             return [...state,action.payload]
             case GET_CONTACT_REDUCER:
             return [...action.payload];
             case DELETE_CONTACT_REDUCER:
             return state.filter(x=>x.id!==action.payload.id)
             case UPDATE_CONTACT_REDUCER:
                             let indx=state.findIndex(x=>x.id===action.payload.id)
                             state[indx].name=action.payload.name
                             state[indx].email=action.payload.email
                             state[indx].phone=action.payload.phone
                             state[indx].subject=action.payload.subject
                             state[indx].message=action.payload.message
                             state[indx].active=action.payload.active
                             state[indx].date=action.payload.date
             default :return state
    }
}
