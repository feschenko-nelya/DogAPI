import React from 'react';

import '../.css/presentation.css';
import '../.css/base.css'
import image from '../.img/girl-and-pet.png';

class Presentation extends React.Component {

    render() {
        return (
            <div className="app-elem">

            <div className="presentation-container">
                <div className="presentation-back">
                    <img src={image} alt="girl and pet" className="presentation-img" />
                </div>
            </div>

            </div>
        );
    }
}

export default Presentation;
