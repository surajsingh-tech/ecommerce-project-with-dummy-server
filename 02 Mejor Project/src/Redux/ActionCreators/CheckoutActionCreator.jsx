import { CREATE_CHECKOUT ,GET_CHECKOUT, DELETE_CHECKOUT,UPDATE_CHECKOUT} from "../Sagas/Services/Constants";
export const createCheckout=(data)=>{
return{
    type:CREATE_CHECKOUT,
    payload:data
}
}
export const getCheckout=()=>{
return{
    type:GET_CHECKOUT
}
}
export const deleteCheckout=(data)=>{
return{
    type:DELETE_CHECKOUT,
    payload:data,
}}
export const updateCheckout=(data)=>{
return{
    type:UPDATE_CHECKOUT,
    payload:data,
}
}
