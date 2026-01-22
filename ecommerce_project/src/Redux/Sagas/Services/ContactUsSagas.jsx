import React from 'react'
import { CREATE_CONTACT, CREATE_CONTACT_REDUCER, DELETE_CONTACT, DELETE_CONTACT_REDUCER, GET_CONTACT, 
    GET_CONTACT_REDUCER,UPDATE_CONTACT,UPDATE_CONTACT_REDUCER} from './Constants';
import { createRecord, deleteRecord, getRecord,updateRecord } from './index';
import { put, takeEvery } from "redux-saga/effects";
function* createSaga(action)                           //executer,worker saga
{
    let response=yield createRecord('contactus',action.payload)
    // let response=yield createMultipartRecord('contact',action.payload) for backend
    yield put({type:CREATE_CONTACT_REDUCER,payload:response})
}
function* getSaga()                           
{
    let response=yield getRecord('contactus')
    yield put({type: GET_CONTACT_REDUCER,payload:response})
}

function* daleteSaga(action)                           
{
    let response=yield deleteRecord('contactus',action.payload)
    yield put({type:DELETE_CONTACT_REDUCER,payload:response})
}
function* updateSaga(action)                           
{
    let response=yield updateRecord('contactus',action.payload)
    yield put({type:UPDATE_CONTACT_REDUCER,payload:response})
}

export function* ContactSagas() {                     //watcher saga
    yield takeEvery(CREATE_CONTACT,createSaga)
    yield takeEvery(GET_CONTACT,getSaga) 
    yield takeEvery(DELETE_CONTACT,daleteSaga)
    yield takeEvery(UPDATE_CONTACT,updateSaga)
}
