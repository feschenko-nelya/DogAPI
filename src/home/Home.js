import React from 'react';

import logo from './img/Logo.png';
import voting from './img/vote-table.png';
import breeds from './img/pet-breeds.png';
import search from './img/images-search.png';

import '../.css/base.css';
import '../.css/home.css';

import {Link} from "react-router-dom";

class Home extends React.Component {

    render() {
        return (
            <div className="app-elem app-elem-left">

            <div className="home-container">
                <div className="logo"><img src={logo} alt="Pets Paw"/></div>
                <h1>Hi intern</h1>
                <h2>Welcome to MSI 2022 Front-end test</h2>

                <h3>Lets start using The Dogs API</h3>

                <div className="home-cards">
                    <div className="home-card">
                        <Link to="/voting" className="home-a-img a-voting"><img src={voting} alt="Pet Voting"/></Link>
                        <Link to="/voting" className="home-a a-text">VOTING</Link>
                    </div>
                    <div className="home-card">
                        <Link to="/breeds" className="home-a-img a-breeds"><img src={breeds} alt="Pet Breeds"/></Link>
                        <Link to="/breeds" className="home-a a-text">BREEDS</Link>
                    </div>
                    <div className="home-card">
                        <Link to="/gallery" className="home-a-img a-gallery"><img src={search} alt="Images Search"/></Link>
                        <Link to="/gallery" className="home-a a-text">GALLERY</Link>
                    </div>
                </div>
            </div>

            </div>
        );
    };
}

export default Home;