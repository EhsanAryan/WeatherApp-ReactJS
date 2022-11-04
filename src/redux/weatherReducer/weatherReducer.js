const weatherState = {
    loading : false ,
    data : {} ,
    error : ""
}

const weatherReducer = (prevState = weatherState , action) => {
    switch (action.type) {
        case "send-weather-request":
            return {...prevState , loading : true};
            break;

        case "get-weather-response":
            return {loading : false , data : action.payload , error : ""};
            break;

        case "get-weather-error":
            return {loading : false , data : {} , error : action.payload};
            break;
    
        default:
            return prevState;
            break;
    }
}

export default weatherReducer;