import { CREATE_SUBCATEGORY ,GET_SUBCATEGORY,UPDATE_SUBCATEGORY,DELETE_SUBCATEGORY} from "../Sagas/Services/Constants";
export const createSubcategory=(data)=>{
return{
    type:CREATE_SUBCATEGORY,
    payload:data
}
}
export const getSubcategory=()=>{
return{
    type:GET_SUBCATEGORY
}
}
export const updateSubcategory=(data)=>{
return{
    type:UPDATE_SUBCATEGORY,
    payload:data,
}
}
export const deleteSubcategory=(data)=>{
return{
    type:DELETE_SUBCATEGORY,
    payload:data,
}
}
