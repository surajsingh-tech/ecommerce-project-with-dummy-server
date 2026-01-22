import { CREATE_PRODUCT ,GET_PRODUCT,UPDATE_PRODUCT,DELETE_PRODUCT} from "../Sagas/Services/Constants";
export const createProduct=(data)=>{
return{
    type:CREATE_PRODUCT,
    payload:data
}
}
export const getProduct=()=>{
return{
    type:GET_PRODUCT
}
}
export const updateProduct=(data)=>{
return{
    type:UPDATE_PRODUCT,
    payload:data,
}
}
export const deleteProduct=(data)=>{
return{
    type:DELETE_PRODUCT,
    payload:data,
}
}

