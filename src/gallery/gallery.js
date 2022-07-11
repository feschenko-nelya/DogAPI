import '../.css/base.css';
import '../.css/gallery.css';

import favouriteEmpty from '../.img/favourite-small.svg';
import favouriteFill from '../.img/favourite-fill-red.svg';

import Search from '../search/Search';
import ButtonBack from '../common/btn-back';
import UploadModal from '../common/upload';

import React from 'react';

class Gallery extends React.Component {

    constructor(props) {
        super(props);

        this.state = {images: [],
                      order: '',
                      type: '',
                      breedId: '',
                      itemsPerPage: 5,
                      breeds: [],
                      favourites: [],
                      isUploadModal: false,
                    };

        this.getImages = this.getImages.bind(this);
        this.setOrder = this.setOrder.bind(this);
        this.setType = this.setType.bind(this);
        this.setBreedId = this.setBreedId.bind(this);
        this.setItemsPerPage = this.setItemsPerPage.bind(this);
        this.toggleFavourite = this.toggleFavourite.bind(this);
        this.setUploadModal = this.setUploadModal.bind(this);
    }

    componentDidMount() {
        this.getBreeds();
        this.getFavourites();
    }

    getImages() {
        let url = 'https://api.thedogapi.com/v1/images/search?';
        let params = new URLSearchParams({
                                        order: this.state.order, 
                                        mime_types: this.state.type,
                                        breed_id: this.state.breedId, 
                                        limit: this.state.itemsPerPage
                                    });

        fetch(url + params, {
              method: "GET",
              headers: {"x-api-key": "7e06fa96-57d3-4811-bb36-448b149d2484",
                       }
        })
        .then(response => response.json())
        .then(response => {this.setState({images: response})});
    }

    getBreeds() {
        let url = 'https://api.thedogapi.com/v1/breeds';

        fetch(url, {
              method: "GET",
              headers: {"x-api-key": "7e06fa96-57d3-4811-bb36-448b149d2484",
                       }
        })
        .then(response => response.json())
        .then(response => {this.setState({breeds: response})});
    }

    setOrder(e) {
        this.setState({order: e.target.value});
    }

    setType(e) {
        this.setState({type: e.target.value});
    }

    setBreedId(e) {
        this.setState({breedId: e.target.value});
    }

    setItemsPerPage(e) {
        this.setState({itemsPerPage: e.target.value});
    }
    
    isFavourite(imageId) {
        return this.getFavouriteObjs(imageId).length > 0;
    }

    getFavouriteObjs(imageId) {
        return this.state.favourites.filter(elem => elem.image_id == imageId);
    }

    getFavourites() {
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
            this.setState({favourites: response}) });
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
        .then(response => response.json())
        .then(this.getFavourites());
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
        .then(this.getFavourites())
        .then(console.log('deleteFavourite: ' + imageId));
    }

    toggleFavourite(imageId) {
        if (!this.isFavourite(imageId)) {
            this.addFavourite(imageId);
        }
        else {
            this.deleteFavourite(imageId);
        }
    }

    setUploadModal(isVisible) {
        this.setState({isUploadModal: isVisible});
    }

    render() {
        let upload = '';
        if (this.state.isUploadModal) {
            upload = <UploadModal setUploadModal={this.setUploadModal}/>
        }
        return (
            <div className="app-elem gallery-container">
                <Search />
                <div className="content">
                    <div className="content-top">
                            <ButtonBack label='Gallery' />
                            <button className="button-red gallery-btn-upload"  onClick={ () => { this.setUploadModal(true) } }>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.86601 0L12.2355 4.03339L11.4129 4.92452L8.48919 2.22567V12.3618H7.27645V2.30464L4.67336 4.90772L3.81583 4.05019L7.86601 0ZM1.21274 14.7873V7.51081H0V16H15.7656V7.51081H14.5529V14.7873H1.21274Z" fill="#FF868E"/>
                                </svg>
                                <span>Upload</span>
                            </button>
                    </div>
                    <div className="gallery-filter" >
                        <div className="gallery-filter-elem">
                            <div className="gallery-filter-label">Order</div>
                            <select className="gallery-select" onChange={this.setOrder}>
                                <option value="RANDOM" selected>Random</option>
                                <option value="ASC">Asc</option>
                                <option value="DESC">Desc</option>
                            </select>
                        </div>

                        <div className="gallery-filter-elem">
                            <div className="gallery-filter-label">Type</div>
                            <select className="gallery-select" onChange={this.setType}>
                                <option value="gif,jpg,png">All</option>
                                <option value="jpg,png" selected>Static</option>
                                <option value="gif">Animated</option>
                            </select>
                        </div>

                        <div className="gallery-filter-elem">
                            <div className="gallery-filter-label">Breed</div>
                            <select className="gallery-select" onChange={this.setBreedId}>
                                <option value=''>None</option>
                                {
                                    this.state.breeds.map(
                                        (breed) => 
                                                {
                                                    return (<option value={breed.id}>{breed.name}</option>)
                                                }
                                    )
                                }
                            </select>
                        </div>

                        <div className="gallery-filter-elem">
                            <div className="gallery-filter-label">Limit</div>
                            <div className="gallery-filter-submit">
                                <select className="gallery-select" onChange={this.setItemsPerPage}>
                                    <option value="5">5 items per page</option>
                                    <option value="10">10 items per page</option>
                                    <option value="15">15 items per page</option>
                                    <option value="20">20 items per page</option>
                                </select>
                                <button className="button-white button-small gallery-button-filter" onClick={() => this.getImages('', '', '', 5)}></button>
                            </div>
                        </div>

                    </div>

                    <div className="photos">
                        {
                            this.state.images.map( (image) =>
                            {
                                return (
                                    <div className="photo">
                                        <img className="photo-img" src={image.url}/>
                                        <div className="photo-caption">
                                            <button className="button-white button-small gallery-btn-favourite"  onClick={() => {this.toggleFavourite(image.id)} }>
                                                <img src={this.isFavourite(image.id) ? favouriteFill : favouriteEmpty} alt='Favourite'/>
                                            </button>
                                        </div>
                                    </div>
                                    );
                            })
                        }

                    </div>

                </div>

                {upload}

            </div>

        );
    }
}

export default Gallery;
