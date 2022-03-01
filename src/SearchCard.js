import { NavLink } from 'react-router-dom';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import $ from 'jquery';

function Search() {
    let [CountryandCity, setName] = useState('');
    let navigate = useNavigate();
    const search = () => {
        if (!CountryandCity) {
            document.getElementById('noCity/Country').style.visibility = "visible";
            if (CountryandCity.includes(',')) {
                CountryandCity = CountryandCity.split(',');
                CountryandCity = CountryandCity.map(k => k.trim()).join(',');
            }
        }

        else {
            navigate(`../?name=${CountryandCity}`, { replace: true });
        }

        $(function () {
            $('form').each(function () {
                $(this).find('input').key(function (e) {
                    if (e.which == 10 || e.which == 13) {
                        this.form.submit();
                    }
                });
    
                $(this).find('input[type=submit]').hide();
            });
        });
    
    }

    return (
        <>
            <div className="row">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="#"><i className="cloud-and-sun" style={{ marginRight: '8px', fontSize: '25px', marginLeft: '12px' }}></i>Online Weather Updates</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink to='/' className="nav-link" href="#">Home</NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <form><div className="body">
               <div className="card">
                    <h3>Please enter a city or a country to get the weather.</h3>
                    <div className="row">
                        <div className="col-10 mt-2">
                            <input type="text" id="city" className="search-bar" value={CountryandCity} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="col-2">
                            <button onClick={search} className='searchBtn'><i className="bi bi-search"></i></button>
                        </div>
                        <div class="alert alert-warning" id='noCity/Country' role="alert" style={{ visibility: "hidden" }}>
                            Nothing is typed in the search bar! Please enter a Coutry or a city!
                        </div>
                    </div> 
                </div> 
            </div> </form> 
        </>
        
    );
}

export default Search;