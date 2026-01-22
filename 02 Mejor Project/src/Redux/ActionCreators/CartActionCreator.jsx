import { CREATE_CART ,GET_CART,DELETE_CART} from "../Sagas/Services/Constants";
export const createCart=(data)=>{
return{
    type:CREATE_CART,
    payload:data
}
}
export const getCart=()=>{
return{
    type:GET_CART
}
}
export const deleteCart=(data)=>{
return{
    type:DELETE_CART,
    payload:data,
}
}
