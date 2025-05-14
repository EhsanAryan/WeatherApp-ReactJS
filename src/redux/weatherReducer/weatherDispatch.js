import axios from "axios"

export const handleWeatherAPI = (query) => {
    return (dispatch) => {
        dispatch({type : "send-weather-request"});
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${process.env.REACT_APP_API_KEY}`)
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
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`)
        .then(response => {
            dispatch({type : "get-weather-response" , payload : response.data});
        })
        .catch(error => {
            dispatch({type : "get-weather-error" , payload : error.message});
        });
    }
}