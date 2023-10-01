import weatherReducer from "./weatherReducer/weatherReducer";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: weatherReducer,
    middleware: [thunk]
})

export default store;
