
import { CREATE_NEWSLETTER, CREATE_NEWSLETTER_REDUCER, GET_NEWSLETTER, 
    GET_NEWSLETTER_REDUCER} from './Constants';
import { createRecord, updateRecord,getRecord, } from './index'
import { put, takeEvery } from "redux-saga/effects";
function* createSaga(action)                           //executer,worker saga
{
    let response=yield createRecord('newsletter',action.payload)
    // let response=yield createMultipartRecord('newsletter',action.payload) for backend
    yield put({type:CREATE_NEWSLETTER_REDUCER,payload:response})
}
function* getSaga()                           
{
    let response=yield getRecord('newsletter')
    yield put({type:GET_NEWSLETTER_REDUCER,payload:response})
}



export function* NewsletterSagas() {                     //watcher saga
    yield takeEvery(CREATE_NEWSLETTER,createSaga)
    yield takeEvery(GET_NEWSLETTER,getSaga) 
}
