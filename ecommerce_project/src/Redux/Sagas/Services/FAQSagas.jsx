import React from 'react'
import { CREATE_FAQ, CREATE_FAQ_REDUCER, DELETE_FAQ, DELETE_FAQ_REDUCER, GET_FAQ, 
    GET_FAQ_REDUCER, UPDATE_FAQ, UPDATE_FAQ_REDUCER } from './Constants';
import { createRecord, deleteRecord, getRecord, updateRecord } from './index'
import { put, takeEvery } from "redux-saga/effects";
function* createSaga(action)                           //executer,worker saga
{
    let response=yield createRecord('faq',action.payload)
    // let response=yield createMultipartRecord('faq',action.payload) for backend
    yield put({type:CREATE_FAQ_REDUCER,payload:response})
}
function* getSaga()                           
{
    let response=yield getRecord('faq')
    yield put({type:GET_FAQ_REDUCER,payload:response})
}
function* updateSaga(action)                           
{
    let response=yield updateRecord('faq',action.payload)
    yield put({type:UPDATE_FAQ_REDUCER,payload:response})
}
function* daleteSaga(action)                           
{
    let response=yield deleteRecord('faq',action.payload)
    yield put({type:DELETE_FAQ_REDUCER,payload:response})
}


export function* FaqSagas() {                     //watcher saga
    yield takeEvery(CREATE_FAQ,createSaga)
    yield takeEvery(GET_FAQ,getSaga) 
    yield takeEvery(UPDATE_FAQ,updateSaga)
    yield takeEvery(DELETE_FAQ,daleteSaga)
}
