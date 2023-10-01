import React from "react";
import { useSelector } from "react-redux";
import Weather from "./Weather";
import SwDev from "../SwDev";
import "./App.css";


const App = () => {
    const { bgMode } = useSelector(state => state);

    return (
        <>
            <div className={`bg-weather-image-container ${bgMode === "cold" ? "d-block" : "d-none"}`}>
                <img
                    className="bg-weather-image"
                    src="./assets/images/background/cold.jpg"
                    alt="Cold Weather"
                />
            </div>
            <div className={`bg-weather-image-container ${bgMode === "usual" ? "d-block" : "d-none"}`}>
                <img
                    className="bg-weather-image"
                    src="./assets/images/background/usual.jpg"
                    alt="Usual Weather"
                />
            </div>
            <div className={`bg-weather-image-container ${bgMode === "warm" ? "d-block" : "d-none"}`}>
                <img
                    className="bg-weather-image"
                    src="./assets/images/background/warm.jpg"
                    alt="Warm Weather"
                />
            </div>
            <div className={`bg-weather-image-container ${bgMode === "hot" ? "d-block" : "d-none"}`} >
                <img
                    className="bg-weather-image"
                    src="./assets/images/background/hot.jpg"
                    alt="Hot Weather"
                />
            </div>
            <SwDev />
            <Weather />
        </>
    );
}

export default App;