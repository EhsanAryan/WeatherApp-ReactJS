import React, { useState } from "react";
import { useEffect } from "react";
import moment from "moment-jalaali";


const daysOfWeek = [
    "یکشنبه" ,
    "دوشنبه" ,
    "سه شنبه" ,
    "چهارشنبه" ,
    "پنجشنبه" ,
    "جمعه" ,
    "شنبه" 
]

const monthsOfYear = [
    "فروردین" ,
    "اردیبهشت" ,
    "خرداد",
    "تیر" ,
    "مرداد" ,
    "شهریور" ,
    "مهر" ,
    "آبان" ,
    "آذر" ,
    "دی" ,
    "بهمن" ,
    "اسفند" ,
]


const DateAndHour = () => {

    const [date , setDate] = useState("");
    const [time , setTime] = useState("");

    const setDateAndTime = () => {
        let m = moment();
        const finalDate = `${daysOfWeek[m.day()]} ${m.jDate()} ${monthsOfYear[m.jMonth()]} ماه ${m.jYear()}`;
        setDate(finalDate);
        const finalTime = m.format("HH:mm:ss");
        setTime(finalTime);
    }

    useEffect(() => {
        setDateAndTime();
        setInterval(setDateAndTime , 1000);
    } , []);

    return (
        <>
            <div>{date}</div>
            <div>{time}</div>
        </>
    );
}

export default DateAndHour;