import { CREATE_CONTACT ,GET_CONTACT, DELETE_CONTACT,UPDATE_CONTACT} from "../Sagas/Services/Constants";
export const createContact=(data)=>{
return{
    type:CREATE_CONTACT,
    payload:data
}
}
export const getContact=()=>{
return{
    type:GET_CONTACT
}
}
export const deleteContact=(data)=>{
return{
    type:DELETE_CONTACT,
    payload:data,
}}
export const updateContact=(data)=>{
return{
    type:UPDATE_CONTACT,
    payload:data,
}
}

