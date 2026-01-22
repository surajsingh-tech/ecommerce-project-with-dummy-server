import { configureStore } from "@reduxjs/toolkit";
import RootReducer from "./Reducers/RootReducer";
import RootSagas from "./Sagas/RootSagas";
import createSagaMiddleware from "redux-saga";

const Saga = createSagaMiddleware();

const store=configureStore(
    {
    reducer:RootReducer,
    middleware:()=>[Saga],
    });
Saga.run(RootSagas);
 export default store;