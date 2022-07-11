import '../.css/base.css';

import React from 'react';
import Search from './Search';
import ButtonBack from '../common/btn-back';
import PhotoItem from '../common/photoItem';

class SearchFavourites extends React.Component {

    constructor(props) {
        super(props);

        this.state = {images: [],
                      historyItems: [],
                    };

        this.deleteFavourite = this.deleteFavourite.bind(this);
    }

    componentDidMount() {
        this.getImages();
    }

    getImages() {
        let url = 'https://api.thedogapi.com/v1/favourites';

        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "7e06fa96-57d3-4811-bb36-448b149d2484",
            }
        })
        .then(response => response.json())
        .then(response => {
            this.setState({images: response.filter(elem => 'url' in elem.image)}) });
    }

    isFavourite(imageId) {
        return this.getFavouriteObjs(imageId).length > 0;
    }

    getFavouriteObjs(imageId) {
        return this.state.images.filter(elem => elem.image_id == imageId);
    }

    deleteFavourite(imageId) {
        let url = 'https://api.thedogapi.com/v1/favourites/' + (this.isFavourite(imageId) ? this.getFavouriteObjs(imageId)[0].id : 0);

        console.log(url);

        fetch(url, {
            method: "DELETE",
            headers: {
                "x-api-key": "7e06fa96-57d3-4811-bb36-448b149d2484",
            },
        })
        .then(response => response.json())
        .then(this.getImages())
        .then(console.log('deleteFavourite: ' + imageId))
        .then(this.setState({historyItems: this.state.historyItems.concat({time: new Date().toLocaleTimeString(),
                                                                           imageId: imageId})}));
    }

    render() {
        return (
            <div className="app-elem gallery-container">
                <Search />
                <div className="content">
                    <div className="content-top">
                        <ButtonBack label='Favourites' />
                    </div>

                    <div className="breeds-middle">
                        <div className="photos">
                            {this.state.images.map( (image) =>
                                {
                                    return (
                                        <PhotoItem imageId={image.image_id} deleteFavourite={this.deleteFavourite} isFavourite={this.isFavourite(image.image_id)}/>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className="voting-actions">
                        <ol className="voting-list">
                            {
                            this.state.historyItems.map(
                                (elem) => 
                                {
                                    return (
                                    <li className="voting-list-elem">
                                        <div>
                                            <span className="voting-list-time">
                                            {elem.time.slice(0, 5)}</span> Image ID: <span className='voting-list-imgID'>{elem.imageId}</span> was removed from Favourites
                                        </div>
                                    </li>
                                    )
                                }
                            )}
                        </ol>
                    </div>

                </div>
            </div>
            );
        }
    }
    
    export default SearchFavourites;
