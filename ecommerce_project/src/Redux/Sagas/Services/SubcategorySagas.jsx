import React from 'react'
import { CREATE_SUBCATEGORY, CREATE_SUBCATEGORY_REDUCER, DELETE_SUBCATEGORY, DELETE_SUBCATEGORY_REDUCER, GET_SUBCATEGORY, 
    GET_SUBCATEGORY_REDUCER, UPDATE_SUBCATEGORY, UPDATE_SUBCATEGORY_REDUCER } from './Constants';
import { createRecord, deleteRecord, getRecord, updateRecord } from './index'
import { put, takeEvery } from "redux-saga/effects";
function* createSaga(action)                           //executer,worker saga
{
    let response=yield createRecord('subcategory',action.payload)
    // let response=yield createMultipartRecord('subcategory',action.payload) for backend
    yield put({type:CREATE_SUBCATEGORY_REDUCER,payload:response})
}
function* getSaga()                           
{
    let response=yield getRecord('subcategory')
    yield put({type:GET_SUBCATEGORY_REDUCER,payload:response})
}
function* updateSaga(action)                           
{
    let response=yield updateRecord('subcategory',action.payload)
    yield put({type:UPDATE_SUBCATEGORY_REDUCER,payload:response})
}
function* daleteSaga(action)                           
{
    let response=yield deleteRecord('subcategory',action.payload)
    yield put({type:DELETE_SUBCATEGORY_REDUCER,payload:response})
}


export function* SubcategorySagas() {                     //watcher saga
    yield takeEvery(CREATE_SUBCATEGORY,createSaga)
    yield takeEvery(GET_SUBCATEGORY,getSaga) 
    yield takeEvery(UPDATE_SUBCATEGORY,updateSaga)
    yield takeEvery(DELETE_SUBCATEGORY,daleteSaga)
}
