import React from 'react'
import { CREATE_MAINCATEGORY, CREATE_MAINCATEGORY_REDUCER, DELETE_MAINCATEGORY, DELETE_MAINCATEGORY_REDUCER, GET_MAINCATEGORY, 
    GET_MAINCATEGORY_REDUCER, UPDATE_MAINCATEGORY, UPDATE_MAINCATEGORY_REDUCER } from '../Services/Constants';
import { createRecord, deleteRecord, getRecord, updateRecord } from '../Services/index'
import { put, takeEvery } from "redux-saga/effects";
function* createSaga(action)                           //executer,worker saga
{
    let response=yield createRecord('maincategory',action.payload)
    // let response=yield createMultipartRecord('maincategory',action.payload) for backend
    yield put({type:CREATE_MAINCATEGORY_REDUCER,payload:response})
}
function* getSaga()                           
{
    let response=yield getRecord('maincategory')
    yield put({type:GET_MAINCATEGORY_REDUCER,payload:response})
}
function* updateSaga(action)                           
{
    let response=yield updateRecord('maincategory',action.payload)
    yield put({type:UPDATE_MAINCATEGORY_REDUCER,payload:response})
}
function* daleteSaga(action)                           
{
    let response=yield deleteRecord('maincategory',action.payload)
    yield put({type:DELETE_MAINCATEGORY_REDUCER,payload:response})
}


export function* MaincategorySagas() {                     //watcher saga
    yield takeEvery(CREATE_MAINCATEGORY,createSaga)
    yield takeEvery(GET_MAINCATEGORY,getSaga) 
    yield takeEvery(UPDATE_MAINCATEGORY,updateSaga)
    yield takeEvery(DELETE_MAINCATEGORY,daleteSaga)
}
