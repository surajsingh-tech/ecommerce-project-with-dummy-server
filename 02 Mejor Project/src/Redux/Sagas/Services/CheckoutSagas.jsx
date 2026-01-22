import React from 'react'
import { CREATE_CHECKOUT, CREATE_CHECKOUT_REDUCER, DELETE_CHECKOUT, DELETE_CHECKOUT_REDUCER,UPDATE_CHECKOUT, UPDATE_CHECKOUT_REDUCER,GET_CHECKOUT, 
    GET_CHECKOUT_REDUCER} from './Constants';
import { createRecord, deleteRecord, updateRecord,getRecord, } from './index'
import { put, takeEvery } from "redux-saga/effects";
function* createSaga(action)                           //executer,worker saga
{
    let response=yield createRecord('checkout',action.payload)
    // let response=yield createMultipartRecord('checkout',action.payload) for backend
    yield put({type:CREATE_CHECKOUT_REDUCER,payload:response})
}
function* getSaga()                           
{
    let response=yield getRecord('checkout')
    yield put({type: GET_CHECKOUT_REDUCER,payload:response})
}

function* daleteSaga(action)                           
{
    let response=yield deleteRecord('checkout',action.payload)
    yield put({type:DELETE_CHECKOUT_REDUCER,payload:response})
}
function* updateSaga(action)                           
{
    let response=yield updateRecord('checkout',action.payload)
    yield put({type:UPDATE_CHECKOUT_REDUCER,payload:response})
}


export function* CheckoutSagas() {                     //watcher saga
    yield takeEvery(CREATE_CHECKOUT,createSaga)
    yield takeEvery(GET_CHECKOUT,getSaga) 
    yield takeEvery(DELETE_CHECKOUT,daleteSaga)
    yield takeEvery(UPDATE_CHECKOUT,updateSaga)
}
