const weatherState = {
    loading: false,
    data: {},
    error: "",
    bgMode: "usual"
}

const weatherReducer = (prevState = weatherState, action) => {
    switch (action.type) {
        case "send-weather-request":
            return { ...prevState, loading: true };

        case "get-weather-response":
            return { ...prevState, loading: false, data: action.payload, error: "" };

        case "get-weather-error":
            return { loading: false, data: {}, error: action.payload, bgMode: "usual" };

        case "change-bg-mode":
            return { ...prevState, bgMode: action.payload };

        default:
            return prevState;
    }
}

export default weatherReducer;