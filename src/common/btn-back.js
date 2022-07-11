import '../.css/base.css';
import '../.css/buttonBack.css';

import React from 'react';
import {Link} from "react-router-dom";

class ButtonBack extends React.Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        let style = "label";
        if (!('marked' in this.props)) {
            style += " label-marked";
        }

        return(
            <div className="btn-back-container">
                <Link className="button-small button-red btn-back" to={-1}/>
                <button className={style} >{this.props.label}</button>
            </div>
        );
    }
}

export default ButtonBack;
