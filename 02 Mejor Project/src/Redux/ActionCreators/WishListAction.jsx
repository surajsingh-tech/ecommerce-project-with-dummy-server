import { CREATE_WISHLIST ,GET_WISHLIST,DELETE_WISHLIST} from "../Sagas/Services/Constants";
export const createWishlist=(data)=>{
return{
    type:CREATE_WISHLIST,
    payload:data
}
}
export const getWishlist=()=>{
return{
    type:GET_WISHLIST
}
}
export const deleteWishlist=(data)=>{
return{
    type:DELETE_WISHLIST,
    payload:data,
}
}
