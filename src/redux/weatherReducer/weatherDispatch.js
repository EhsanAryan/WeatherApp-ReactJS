import axios from "axios"

export const handleWeatherAPI = (query) => {
    return (dispatch) => {
        dispatch({type : "send-weather-request"});
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=c2fe170db43574838e6adf54622988b9`)
        .then(response => {
            dispatch({type : "get-weather-response" , payload : response.data});
        })
        .catch(error => {
            dispatch({type : "get-weather-error" , payload : error.message});
        });
    }
}

export const handleWeatherAPILatLon = (lat , lon) => {
    return (dispatch) => {
        dispatch({type : "send-weather-request"});
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c2fe170db43574838e6adf54622988b9`)
        .then(response => {
            dispatch({type : "get-weather-response" , payload : response.data});
        })
        .catch(error => {
            dispatch({type : "get-weather-error" , payload : error.message});
        });
    }
}