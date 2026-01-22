import React from 'react'
import { CREATE_CART, CREATE_CART_REDUCER, DELETE_CART, DELETE_CART_REDUCER, GET_CART, 
    GET_CART_REDUCER} from './Constants';
import { createRecord, deleteRecord, getRecord, } from './index'
import { put, takeEvery } from "redux-saga/effects";
function* createSaga(action)                           //executer,worker saga
{
    let response=yield createRecord('cart',action.payload)
    // let response=yield createMultipartRecord('cart',action.payload) for backend
    yield put({type:CREATE_CART_REDUCER,payload:response})
}
function* getSaga()                           
{
    let response=yield getRecord('cart')
    yield put({type:GET_CART_REDUCER,payload:response})
}

function* daleteSaga(action)                           
{
    let response=yield deleteRecord('cart',action.payload)
    yield put({type:DELETE_CART_REDUCER,payload:response})
}


export function* CartSagas() {                     //watcher saga
    yield takeEvery(CREATE_CART,createSaga)
    yield takeEvery(GET_CART,getSaga) 
    yield takeEvery(DELETE_CART,daleteSaga)
}
