import { CREATE_NEWSLETTER ,GET_NEWSLETTER} from "../Sagas/Services/Constants";
export const createNewsletter=(data)=>{
return{
    type:CREATE_NEWSLETTER,
    payload:data
}
}
export const getNewsletter=()=>{
return{
    type:GET_NEWSLETTER
}
}

