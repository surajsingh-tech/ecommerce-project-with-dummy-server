
import { CREATE_SETTING, CREATE_SETTING_REDUCER, GET_SETTING, 
    GET_SETTING_REDUCER, UPDATE_SETTING, UPDATE_SETTING_REDUCER } from './Constants';
import { createRecord, getRecord, updateRecord } from './index'
import { put, takeEvery } from "redux-saga/effects";
function* createSaga(action)                           //executer,worker saga
{
    let response=yield createRecord('setting',action.payload)
    // let response=yield createMultipartRecord('setting',action.payload) for backend
    yield put({type:CREATE_SETTING_REDUCER,payload:response})
}
function* getSaga()                           
{
    let response=yield getRecord('setting')
    
    yield put({type:GET_SETTING_REDUCER,payload:response})
}
function* updateSaga(action)                           
{
    let response=yield updateRecord('setting',action.payload)
    yield put({type:UPDATE_SETTING_REDUCER,payload:response})
}


export function* SettingSagas() {                     //watcher saga
    yield takeEvery(CREATE_SETTING,createSaga)
    yield takeEvery(GET_SETTING,getSaga) 
    yield takeEvery(UPDATE_SETTING,updateSaga)
}
