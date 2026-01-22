import { CREATE_TESTIMONIAL_REDUCER, UPDATE_TESTIMONIAL_REDUCER, GET_TESTIMONIAL_REDUCER} from "../Sagas/Services/Constants"
export function TestimonialReducer(state=[],action)
{
    switch(action.type)
    {
             case CREATE_TESTIMONIAL_REDUCER:
             return [...state,action.payload]
             
             case GET_TESTIMONIAL_REDUCER:
             return [...action.payload];
             case UPDATE_TESTIMONIAL_REDUCER:
                             let indx=state.findIndex(x=>x.id===action.payload.id)
                             state[indx].name=action.payload.name
                             state[indx].pic=action.payload.pic
                             state[indx].active=action.payload.active
                          return state
             default :return state
    }
}