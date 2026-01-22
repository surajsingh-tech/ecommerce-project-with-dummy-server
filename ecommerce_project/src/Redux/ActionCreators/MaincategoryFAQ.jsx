import { CREATE_FAQ ,GET_FAQ,UPDATE_FAQ,DELETE_FAQ} from "../Sagas/Services/Constants";
export const createFAQ=(data)=>{
return{
    type:CREATE_FAQ,
    payload:data
}
}
export const getFAQ=()=>{
return{
    type:GET_FAQ
}
}
export const updateFAQ=(data)=>{
    
    
return{
    type:UPDATE_FAQ,
    payload:data,
}
}
export const deleteFAQ=(data)=>{
return{
    type:DELETE_FAQ,
    payload:data,
}
}   
