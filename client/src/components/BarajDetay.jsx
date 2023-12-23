import axios from "axios";
import React, { useEffect, useState, useMemo } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { useParams } from 'react-router';

function BarajDetay(){
    const {baraj_adi} = useParams();
    const [data,setData] = useState([]);

    const handleData = async()=>{
        await axios.get(`/baraj/year/${baraj_adi}`).then(res =>{
            const indexedData = res.data.map((item, index) => ({ ...item, index: index + 1 }));
            setData(indexedData); // res.data içinde doğrudan barajlar bulunuyor.
        }).catch(err => console.log(err));
    }

    useEffect(()=>{
        handleData();
    },[])

    return (
        <div>{data[0]}</div>
    );
}

export default BarajDetay;