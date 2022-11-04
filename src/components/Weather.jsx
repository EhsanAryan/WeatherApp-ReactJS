import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleWeatherAPI , handleWeatherAPILatLon } from "../redux/weatherReducer/weatherDispatch"
import DateAndHour from "./DateAndHour";
import swal from "sweetalert";
import "./Weather.css";


const Weather = () => {

    const [bgMode , setBgMode] = useState("usual");
    const [query , setQuery] = useState("");
    const [mode , setMode] = useState("name");
    const [lat , setLat] = useState("");
    const [lon , setLon] = useState("");

    const checkedRef1 = useRef();
    const checkedRef2 = useRef();

    const {loading , data , error} = useSelector(state => state);
    const dispatch = useDispatch();


    const getWeather = () => {
        if(query==="") {
            swal({
                title : "خطا" ,
                text : "لطفاً فیلد را پر کنید!" ,
                icon : "error" ,
                button : "متوجه شدم"
            });
            return;
        }

        dispatch(handleWeatherAPI(query));
        setQuery("");
    }

    const getWeatherWithKeyboard = (event) => {
        if(event.key==="Enter") {
            getWeather();
        }
    }

    const getWeatherLatLon = () => {
        const numberPattern = /^\d+(\.\d+)?$/;
        if(lat==="" || lon==="") {
            swal({
                title: "خطا" ,
                text : "لطفاً هر 2 فیلد را پر کنید!" ,
                icon : "error" ,
                button : "متوجه شدم"
            })
            return;
        } else if(!numberPattern.test(lat) || !numberPattern.test(lon)){
            swal({
                title: "خطا" ,
                text : "لطفا در فیلدها، فقط عدد وارد کنید!" ,
                icon: "error" ,
                button: "متوجه شدم"
            });
            return;
        }
        
        dispatch(handleWeatherAPILatLon(lat , lon));
        setLat("");
        setLon("");
    }

    const getWeatherLatLonWithKeyboard = (event) => {
        if(event.key==="Enter") {
            getWeatherLatLon();
        }
    }

    
    useEffect(() => {
        if(mode==="name") {
            checkedRef1.current.checked = true;
            checkedRef2.current.checked = false;
        }
        else {
            checkedRef2.current.checked = true;
            checkedRef1.current.checked = false;
        }

        if(!data.main) {
            return;
        }

        const temp = (data.main.temp) - 273.15;

        if(temp < 10) {
            setBgMode("cold");
        } else if (temp < 18) {
            setBgMode("usual");
        } else if(temp < 24) {
            setBgMode("warm");
        } else {
            setBgMode("hot");
        }
    }, [data]);


    return (
        <div className={`app bg-${bgMode} py-4`}>
            <div className="parent-div w-75 mx-auto px-3 py-1">
                
                <div className="row text-center my-4 w-100 mx-auto">
                   <div className="col-12 fs-3">
                        <DateAndHour />
                   </div>
                </div>

                <div className="row text-center mt-5 mb-1 w-100 mx-auto">
                <div className="col-6 col-md-4 col-lg-3 me-auto">
                        <input type="radio" className="btn-check" id="name-mode" name="mode" ref={checkedRef1}
                        onClick={() => setMode("name")} />
                        <label className="btn btn-outline-dark w-100 fs-4" htmlFor="name-mode">نام</label>
                    </div>
 
                    <div className="col-6 col-md-4 col-lg-3 ms-auto">
                        <input type="radio" className="btn-check" id="lat-lon-mode" name="mode" ref={checkedRef2}
                        onClick={() => setMode("lat-lon")} />
                        <label className="btn btn-outline-dark w-100 fs-4" htmlFor="lat-lon-mode">مختصات جغرافیایی</label>
                    </div>
                </div>

                <div className="row text-center w-100 mx-auto">
                    {mode==="name" ? (
                        <div className="col-12 col-md-6 col-lg-5 mx-auto mt-3">
                            <input type="text" className="w-100 mt-1 city-input" 
                            placeholder={data.name ? data.name : "نام شهر یا کشور"} onKeyDown={getWeatherWithKeyboard}
                            value={query} onChange={(event) => setQuery(event.target.value)} />
                        </div>
                    ) : (
                        <>
                            <div className="col-6 col-md-4 me-auto mt-3">
                                <input type="text" className="w-100 mt-1 city-input" 
                                placeholder={data.coord ? data.coord.lat :  "طول جغرافیایی"} onKeyDown={getWeatherLatLonWithKeyboard}
                                value={lat} onChange={(event) => setLat(event.target.value)} />
                            </div>
                            <div className="col-6 col-md-4 ms-auto mt-3">
                                <input type="text" className="w-100 mt-1 city-input" 
                                placeholder={data.coord ? data.coord.lon : "عرض جغرافیایی"} onKeyDown={getWeatherLatLonWithKeyboard}
                                value={lon} onChange={(event) => setLon(event.target.value)} />
                            </div>
                        </>
                    )}
                    <div className="col-12 mx-auto my-4">
                        <button type="button" className="btn btn-secondary px-4 fs-4"
                        onClick={mode==="name" ? getWeather : getWeatherLatLon}>
                            دریافت
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="w-100 text-center">
                        <div className="spinner-border text-dark my-spinner my-5">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : data.main ? (
                    <>
                        <div className="row text-center mt-5 mb-3 w-100 mx-auto">
                            <div className="col-10 col-md-8 col-lg-6 col-xl-5 mx-auto show-temp">
                                <span className="temp">{(data.main.temp - 273.15).toFixed(1)}</span>°C
                            </div>
                        </div>

                        <div className="row text-center mb-5 w-100 mx-auto">
                            <div className="col-10 col-md-8 col-lg-6 col-xl-5 mx-auto weather">
                                {data.weather[0].main}
                            </div>
                        </div>
                    </>
                ) : error ? (
                    <div className="text-center fs-1 my-5">
                        {mode==="name" ? "لطفاً نام شهر یا کشور را به صورت صحیح وارد کنید!" : "چنین مختصاتی وجود ندارد!"}
                    </div>
                ) : (
                    <div className="text-center fs-2 my-5">
                        {mode==="name" ? "با وارد کردن نام شهر یا کشور، از وضعیت آب و هوای آن مطلع شوید." : "با وارد کردن مختصات جغرافیایی یک منطقه، از وضعیت آب و هوای آن مطلع شوید."}
                    </div>
                )}

            </div>
        </div>
    );
} 

export default Weather;