import { CREATE_SETTING ,GET_SETTING,UPDATE_SETTING,DELETE_SETTING} from "../Sagas/Services/Constants";
export const createSetting=(data)=>{
return{
    type:CREATE_SETTING,
    payload:data
}
}
export const getSetting=()=>{
return{
    type:GET_SETTING,
}
}
export const updateSetting=(data)=>{
return{
    type:UPDATE_SETTING,
    payload:data,
}
}

