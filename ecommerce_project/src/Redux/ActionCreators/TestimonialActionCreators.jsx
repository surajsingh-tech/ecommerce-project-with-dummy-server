import { CREATE_TESTIMONIAL ,GET_TESTIMONIAL,UPDATE_TESTIMONIAL} from "../Sagas/Services/Constants";
export const createTestimonial=(data)=>{
return{
    type:CREATE_TESTIMONIAL,
    payload:data
}
}
export const getTestimonial=()=>{
return{
    type:GET_TESTIMONIAL
}
}
export const updateTestimonial=(data)=>{
return{
    type:UPDATE_TESTIMONIAL,
    payload:data,
}
}
