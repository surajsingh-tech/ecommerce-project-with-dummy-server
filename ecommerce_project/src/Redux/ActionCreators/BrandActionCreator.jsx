import { CREATE_BRAND ,GET_BRAND,UPDATE_BRAND,DELETE_BRAND} from "../Sagas/Services/Constants";
export const createBrand=(data)=>{
return{
    type:CREATE_BRAND,
    payload:data
}
}
export const getBrand=()=>{
return{
    type:GET_BRAND
}
}
export const updateBrand=(data)=>{
return{
    type:UPDATE_BRAND,
    payload:data,
}
}
export const deleteBrand=(data)=>{
return{
    type:DELETE_BRAND,
    payload:data,
}
}
