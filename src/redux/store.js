import { applyMiddleware , createStore } from "redux";
import weatherReducer from "./weatherReducer/weatherReducer";
import thunk from "redux-thunk";

const store = createStore(weatherReducer , applyMiddleware(thunk));

export default store;
