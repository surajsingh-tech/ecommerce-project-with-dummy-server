import { CREATE_FEATURE ,GET_FEATURE,UPDATE_FEATURE,DELETE_FEATURE} from "../Sagas/Services/Constants";
export const createFeature=(data)=>{
return{
    type:CREATE_FEATURE,
    payload:data
}
}
export const getFeature=()=>{
return{
    type:GET_FEATURE
}
}
export const updateFeature=(data)=>{
return{
    type:UPDATE_FEATURE,
    payload:data,
}
}
export const deleteFeature=(data)=>{
return{
    type:DELETE_FEATURE,
    payload:data,
}
}
