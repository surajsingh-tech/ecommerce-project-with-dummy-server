import { CREATE_PRODUCT_REDUCER, DELETE_PRODUCT_REDUCER, GET_PRODUCT_REDUCER, UPDATE_PRODUCT_REDUCER } from "../Sagas/Services/Constants"
export function ProductReducer(state=[],action)
{
    switch(action.type)
    {
             case CREATE_PRODUCT_REDUCER:
             return [...state,action.payload]
             case UPDATE_PRODUCT_REDUCER:
             let indx=state.findIndex(x=>x.id===action.payload.id)
                state[indx].active=action.payload.active
                state[indx].basePrice=action.payload.basePrice
                state[indx].brand=action.payload.brand
                state[indx].color.map=action.payload.color
                state[indx].discount=action.payload.discount
                state[indx].discription=action.payload.discription
                state[indx].finalPrice=action.payload.finalPrice
                state[indx].id=action.payload.id
                state[indx].maincategory=action.payload.maincategory
                state[indx].name=action.payload.name
                state[indx].size=action.payload.size
                state[indx].pic=action.payload.pic
                state[indx].stock=action.payload.stock
                state[indx].stockQuantity=action.payload.stockQuantity
                state[indx].subcategory=action.payload.subcategory
             return state
             case GET_PRODUCT_REDUCER:  
             return [...action.payload];
            
             default :return state
    }
}