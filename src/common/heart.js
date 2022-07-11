import '../.css/base.css';

import favouriteEmpty from '../.img/favourite-small.svg';
import favouriteFill from '../.img/favourite-fill-red.svg';

import React from 'react';

class Heart extends React.Component {

    constructor(props) {
        super(props);

        this.toggleFavourite = this.toggleFavourite.bind(this);
    }

    addFavourite(imageId) {
        let url = 'https://api.thedogapi.com/v1/favourites';

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "7e06fa96-57d3-4811-bb36-448b149d2484",
            },
            body: JSON.stringify({
                "image_id": imageId,
            }),
        })
        .then(response => response.json());
    }

    toggleFavourite(imageId) {
        if (!this.props.isFavourite) {
            this.addFavourite(imageId);
        }
        else {
            this.props.deleteFavourite(imageId);

        }
    }

    render() {
        return (
            <button className="button-white button-small gallery-btn-favourite"  onClick={() => {this.toggleFavourite(this.props.imageId)} }>
                <img src={this.props.isFavourite ? favouriteFill : favouriteEmpty} alt='Favourite'/>
            </button>
        );
    }
}

export default Heart;
