import { CREATE_NEWSLETTER_REDUCER, GET_NEWSLETTER_REDUCER} from "../Sagas/Services/Constants"
export function NewsletterReducer(state=[],action)
{
    switch(action.type)
    {
             case CREATE_NEWSLETTER_REDUCER:
             return [...state,action.payload]
             
             case GET_NEWSLETTER_REDUCER:
             return [...action.payload];
             default :return state
    }
}