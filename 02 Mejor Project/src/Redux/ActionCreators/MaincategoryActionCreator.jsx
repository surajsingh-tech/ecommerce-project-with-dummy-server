import { CREATE_MAINCATEGORY ,GET_MAINCATEGORY,UPDATE_MAINCATEGORY,DELETE_MAINCATEGORY} from "../Sagas/Services/Constants";
export const createMaincategory=(data)=>{
return{
    type:CREATE_MAINCATEGORY,
    payload:data
}
}
export const getMaincategory=()=>{
return{
    type:GET_MAINCATEGORY
}
}
export const updateMaincategory=(data)=>{
return{
    type:UPDATE_MAINCATEGORY,
    payload:data,
}
}
export const deleteMaincategory=(data)=>{
return{
    type:DELETE_MAINCATEGORY,
    payload:data,
}
}
