import React from 'react'
import { CREATE_FEATURE, CREATE_FEATURE_REDUCER, DELETE_FEATURE, DELETE_FEATURE_REDUCER, GET_FEATURE, 
    GET_FEATURE_REDUCER, UPDATE_FEATURE, UPDATE_FEATURE_REDUCER } from './Constants';
import { createRecord, deleteRecord, getRecord, updateRecord } from './index'
import { put, takeEvery } from "redux-saga/effects";
function* createSaga(action)                           //executer,worker saga
{
    let response=yield createRecord('feature',action.payload)
    // let response=yield createMultipartRecord('feature',action.payload) for backend
    yield put({type:CREATE_FEATURE_REDUCER,payload:response})
}
function* getSaga()                           
{
    let response=yield getRecord('feature')
    yield put({type:GET_FEATURE_REDUCER,payload:response})
}
function* updateSaga(action)                           
{
    let response=yield updateRecord('feature',action.payload)
    yield put({type:UPDATE_FEATURE_REDUCER,payload:response})
}
function* daleteSaga(action)                           
{
    let response=yield deleteRecord('feature',action.payload)
    yield put({type:DELETE_FEATURE_REDUCER,payload:response})
}


export function* FeatureSagas() {                     //watcher saga
    yield takeEvery(CREATE_FEATURE,createSaga)
    yield takeEvery(GET_FEATURE,getSaga) 
    yield takeEvery(UPDATE_FEATURE,updateSaga)
    yield takeEvery(DELETE_FEATURE,daleteSaga)
}
