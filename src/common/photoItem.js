import '../.css/base.css';

import Preloader from '../.img/loader.gif';
import Heart from './heart.js';
import React from 'react';
import {Link} from "react-router-dom";

class Caption extends React.Component {

    render () {
        return (
            <Link to={'../breeds/' + this.props.breedId}>
                <h3 className="breeds-h3">{this.props.breedName}</h3>
            </Link>
        );
    }
}

class PhotoItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {image: {},
                      showCaption: this.props.showCaption};
    }

    componentDidMount() {
        this.getImage();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.imageId != this.props.imageId) {
            this.getImage();
        }
    }

    getImage() {
        let url = 'https://api.thedogapi.com/v1/images/' + this.props.imageId;

        fetch(url, {
            method: "GET",
            headers: {
                "x-api-key": "7e06fa96-57d3-4811-bb36-448b149d2484",
            }
        })
        .then(response => response.json())
        .then(response => {
            this.setState({image: response})});
    }

    render() {

        let preloadStyle = {'object-fit': 'none'};
        let imageUrl = Preloader;
        let breedName = '';
        let breedFor = '';
        let breedId = '';

        if (Object.values(this.state.image).length != 0) {
            preloadStyle = {};
            imageUrl = this.state.image.url;

            if ('breeds' in this.state.image) {
                breedName = this.state.image.breeds[0].name;
                breedFor = this.state.image.breeds[0].bred_for;
                breedId = this.state.image.breeds[0].id;
            }
        }

        let comp;
        if (this.state.showCaption==true) {
            comp = <Caption breedId={breedId} breedName={breedName}/>;
        }
        else {
            comp = <Heart imageId={this.state.image.id} deleteFavourite={this.props.deleteFavourite} isFavourite={this.props.isFavourite} />
        }

        return(
            <div className="photo">
                {breedName}
                <img className="photo-img" style ={preloadStyle} src={imageUrl} alt={breedFor}/>
                <div className="photo-caption">
                    {comp}
                </div>
            </div>);
    }
}

                    


export default PhotoItem;
