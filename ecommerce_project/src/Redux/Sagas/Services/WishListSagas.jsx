
import { CREATE_WISHLIST, CREATE_WISHLIST_REDUCER, DELETE_WISHLIST, DELETE_WISHLIST_REDUCER, GET_WISHLIST, 
    GET_WISHLIST_REDUCER } from './Constants';
import { createRecord, deleteRecord, getRecord } from './index'
import { put, takeEvery } from "redux-saga/effects";
function* createSaga(action)                           //executer,worker saga
{
    let response=yield createRecord('wishlist',action.payload)
    yield put({type:CREATE_WISHLIST_REDUCER,payload:response})
}
function* getSaga()                           
{
    let response=yield getRecord('wishlist')
    yield put({type:GET_WISHLIST_REDUCER,payload:response})
}

function* daleteSaga(action)                           
{
    console.log("action",action);
    let response=yield deleteRecord('wishlist',action.payload)
    yield put({type:DELETE_WISHLIST_REDUCER,payload:response})
}


export function* WishlistSagas() {                     //watcher saga
    yield takeEvery(CREATE_WISHLIST,createSaga)
    yield takeEvery(GET_WISHLIST,getSaga) 
    yield takeEvery(DELETE_WISHLIST,daleteSaga)
}
