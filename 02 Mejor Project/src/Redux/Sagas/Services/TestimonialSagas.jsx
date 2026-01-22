import React from 'react'
import { CREATE_TESTIMONIAL, CREATE_TESTIMONIAL_REDUCER, UPDATE_TESTIMONIAL, UPDATE_TESTIMONIAL_REDUCER, GET_TESTIMONIAL, 
    GET_TESTIMONIAL_REDUCER} from './Constants';
import { createRecord, updateRecord,getRecord, } from './index'
import { put, takeEvery } from "redux-saga/effects";
function* createSaga(action)                           //executer,worker saga
{
    let response=yield createRecord('testimonial',action.payload)
    // let response=yield createMultipartRecord('testimonial',action.payload) for backend
    yield put({type:CREATE_TESTIMONIAL_REDUCER,payload:response})
}
function* getSaga()                           
{
    let response=yield getRecord('testimonial')
    yield put({type:GET_TESTIMONIAL_REDUCER,payload:response})
}

function* updateSaga(action)                           
{
    let response=yield updateRecord('testimonial',action.payload)
    yield put({type:UPDATE_TESTIMONIAL_REDUCER,payload:response})
}


export function* TestimonialSagas() {                     //watcher saga
    yield takeEvery(CREATE_TESTIMONIAL,createSaga)
    yield takeEvery(GET_TESTIMONIAL,getSaga) 
     yield takeEvery(UPDATE_TESTIMONIAL,updateSaga)
}
