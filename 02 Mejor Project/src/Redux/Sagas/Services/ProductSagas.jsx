import React from 'react'
import { CREATE_PRODUCT, CREATE_PRODUCT_REDUCER, DELETE_PRODUCT, DELETE_PRODUCT_REDUCER, GET_PRODUCT, 
    GET_PRODUCT_REDUCER, UPDATE_PRODUCT, UPDATE_PRODUCT_REDUCER } from './Constants';
import { createRecord, deletePIC, deleteRecord, getRecord, updateRecord } from './index'
import { put, takeEvery } from "redux-saga/effects";
function* createSaga(action)                           //executer,worker saga
{
    let response=yield createRecord('product',action.payload)
    
    // let response=yield createMultipartRecord('product',action.payload) for backend
    yield put({type:CREATE_PRODUCT_REDUCER,payload:response})
}
function* getSaga()                           
{
    let response=yield getRecord('product')
    yield put({type:GET_PRODUCT_REDUCER,payload:response})
}
function* updateSaga(action)                           
{
    let response=yield updateRecord('product',action.payload)
    yield put({type:UPDATE_PRODUCT_REDUCER,payload:response})

    yield put({type:GET_PRODUCT})
}
function* daleteSaga(action)                           
{
    let response=yield deleteRecord('product',action.payload)
    yield put({type:DELETE_PRODUCT_REDUCER,payload:response})
}


export function* ProductSagas() {                     //watcher saga
    yield takeEvery(CREATE_PRODUCT,createSaga)
    yield takeEvery(GET_PRODUCT,getSaga) 
    yield takeEvery(UPDATE_PRODUCT,updateSaga)
    yield takeEvery(DELETE_PRODUCT,daleteSaga)
    
}
