/*********************************************************************************
* BTI425 – Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Rupin Sharma ID: 106212202 Date: 2022/02/28
* Heroku Link: https://tranquil-taiga-58654.herokuapp.com/
*
********************************************************************************/
import axios from "axios";
import { useState, useEffect } from "react";
import React from 'react';
import useGeolocation from 'react-hook-geolocation';
import $ from 'jquery';
import { NavLink } from 'react-router-dom';

function Main() {
    const geolocation = useGeolocation();
    let [data, setData] = useState([]);
    let [bol, setBol] = useState(false);
    let [error, setError] = useState('');
    let [allRecentlyViewed, setallRecentlyViewed] = useState(JSON.parse(localStorage.getItem('allRecentlyViewed')) || []);

    useEffect(() => {
        if(window.location.href.includes('name=')) {
            let name = window.location.href.split('name=').pop(); 
            GetCity(name); 
        }
        else {
            $.ajax({ 
                url: "https://geolocation-db.com/jsonp",
                jsonpCallback: "callback",
                dataType: "jsonp",
                success: function (location) {
                    GetCity(location.city);  
                }
            });
        }
    }, [])

    const GetCity = (city) => {
        let url = '';
        if(city.includes(',')) { 
            url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=57f6d89bfbbd535d883435ad946d2fe4`;
        } else {   
            url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=57f6d89bfbbd535d883435ad946d2fe4`;
        }
        axios.get(url)
            .then((response) => {
                setData(response.data); 
                saveData(response.data);  
                setBol(true);   
            }, (error) => {
                setError(error);
            });
    }

    const saveData = (obj) => { 
        if(allRecentlyViewed.length > 5) allRecentlyViewed.splice(allRecentlyViewed.length-1, 1);
        let idx = allRecentlyViewed.findIndex(elem => elem.name === obj.name);
        if(idx >= 0) allRecentlyViewed = allRecentlyViewed.filter(elem => elem.name !== obj.name);
        allRecentlyViewed.splice(0, 0, obj);
        setallRecentlyViewed(allRecentlyViewed);
        localStorage.setItem('allRecentlyViewed', JSON.stringify(allRecentlyViewed));
    }
 
    const show = () => {    
        let html = document.getElementById('toShow');
        if(html.style.display === 'none') html.style.display = 'block';
        else html.style.display = 'none';
    }

    const handleChange = () => {    
        let name = document.getElementById('history').value;
        let obj = allRecentlyViewed.find(elem => elem.name === name);
        setData(obj);
    }

    return (
        <div className="container-fluid mainBody">
            <div className="row">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="#"><i className="cloud-sun" style={{marginRight: '8px', fontSize: '25px'}}></i>Online Weather Updates</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#NavigateBar" aria-controls="NavigateBar" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="NavigateBar">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink to='/' className="nav-link" href="#">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='search' className="nav-link" href="#">Search</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <select onChange={handleChange} id='history' className="nav-link" style={{backgroundColor: '#212529', border: 'none'}}>
                                    <option>Visited Cities</option>
                                    {allRecentlyViewed.map((elem,idx) => {
                                        return <option key={idx} value={elem.name}>{elem.name}</option>
                                    })}
                                </select>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <h2 className="mt-4">{new Date().toString()}</h2>
            <h4>{error}</h4>
            <div className="row mt-2">
                {bol && <div className="col-11 ml-5">
                    <h2>{data.name}, {data.sys.country}, <img style={{ width: '50px', height: '30px', objectFit: 'cover' }} src={`http://openweathermap.org/images/flags/${data.sys.country.toLowerCase()}.png`} /></h2>
                    <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`} />
                    <p className='city'>{data.weather[0].description}</p>
                    <p className='temperature'><strong>Temperature</strong>: {data.main.temp}&deg;C</p>
                    <span style={{display: 'none'}} id='toShow'>
                        <p><strong>Pressure</strong>:       {data.main.pressure}hPa</p>
                        <p><strong>Wind Speed</strong>:     {data.wind.speed}m/s</p>
                        <p><strong>Min Temperature</strong>: {data.main.temp_min}&deg;C</p>
                        <p><strong>Max Temperature</strong>: {data.main.temp_max}&deg;C</p>
                        <p><strong>Sunset</strong>: {(new Date(data.sys.sunset * 1000)).toLocaleTimeString()}</p>
                        <p><strong>Sunrise</strong>: {(new Date(data.sys.sunrise * 1000)).toLocaleTimeString()}</p>
                        <p><strong>Longitude</strong>: {data.coord.lon}</p>
                        <p><strong>Latitude</strong>: {data.coord.lat}</p>
                    </span><br />
                </div>}
                <div className="col-1">
                    <span id="plusbutton" onClick={show}>+</span>
                </div>
            </div>
        </div>
    );
}

export default Main;