import React from 'react'
import { CREATE_BRAND, CREATE_BRAND_REDUCER, DELETE_BRAND, DELETE_BRAND_REDUCER, GET_BRAND, 
    GET_BRAND_REDUCER, UPDATE_BRAND, UPDATE_BRAND_REDUCER } from './Constants';
import { createRecord, deleteRecord, getRecord, updateRecord } from './index'
import { put, takeEvery } from "redux-saga/effects";
function* createSaga(action)                           //executer,worker saga
{
    let response=yield createRecord('brand',action.payload)
    // let response=yield createMultipartRecord('brand',action.payload) for backend
    yield put({type:CREATE_BRAND_REDUCER,payload:response})
}
function* getSaga()                           
{
    let response=yield getRecord('brand')
    yield put({type:GET_BRAND_REDUCER,payload:response})
}
function* updateSaga(action)                           
{
    let response=yield updateRecord('brand',action.payload)
    yield put({type:UPDATE_BRAND_REDUCER,payload:response})
}
function* daleteSaga(action)                           
{
    let response=yield deleteRecord('brand',action.payload)
    yield put({type:DELETE_BRAND_REDUCER,payload:response})
}


export function* BrandSagas() {                     //watcher saga
    yield takeEvery(CREATE_BRAND,createSaga)
    yield takeEvery(GET_BRAND,getSaga) 
    yield takeEvery(UPDATE_BRAND,updateSaga)
    yield takeEvery(DELETE_BRAND,daleteSaga)
}
