import '../.css/base.css';
import '../.css/breeds.css';

import Search from '../search/Search';

import React from 'react';
import ButtonBack from '../common/btn-back';
import {Link, useParams} from "react-router-dom";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper';
import 'swiper/css/pagination';
import 'swiper/css';

class BreedSelectedInner extends React.Component {

    constructor(props) {
        super(props);

        this.state = {images: [],
                
                breed: {

                    "bred_for": "",
                    "breed_group": "",
                    "height": {
                    "imperial": "",
                    "metric": ""
                    },
                    "id": 0,
                    "image": {
                    "height": 1199,
                    "id": "",
                    "url": "",
                    "width": 1600
                    },
                    "life_span": "",
                    "name": "",
                    "origin": "",
                    "reference_image_id": "",
                    "temperament": "",
                    "weight": {
                    "imperial": "",
                    "metric": ""
                    }
                }};

        //     "bred_for": "Small rodent hunting, lapdog",
        //     "breed_group": "Toy",
        //     "height": {
        //       "imperial": "9 - 11.5",
        //       "metric": "23 - 29"
        //     },
        //     "id": 2,
        //     "image": {
        //       "height": 1199,
        //       "id": "BJa4kxc4X",
        //       "url": "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
        //       "width": 1600
        //     },
        //     "life_span": "10 - 12 years",
        //     "name": "Affenpinscher",
        //     "origin": "Germany, France",
        //     "reference_image_id": "BJa4kxc4X",
        //     "temperament": "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
        //     "weight": {
        //       "imperial": "6 - 13",
        //       "metric": "3 - 6"
        //     }
        //   };
    }

    componentDidMount() {
        this.getInfo();
        this.getImages();
    }

    getInfo() {
        let url = 'https://api.thedogapi.com/v1/breeds';

        fetch(url, {
              method: 'GET',
              headers: {"x-api-key": "7e06fa96-57d3-4811-bb36-448b149d2484",
                     }
                    }
            )
        .then(response => response.json())
        .then(response => {
                // this.setState({breed: response.filter((elem) => elem.id == this.props.params.breedId)[0]})
                this.setState({breed: response.filter((elem) => elem.id == this.props.params.breedId)[0]})
            });
    }

    getImages() {
        let url = 'https://api.thedogapi.com/v1/images/search?limit=20&breed_id=' + this.props.params.breedId;

        fetch(url, {
              method: 'GET',
              headers: {"x-api-key": "7e06fa96-57d3-4811-bb36-448b149d2484",
                     }
                    }
            )
        .then(response => response.json())
        .then(response => {
                // this.setState({breed: response.filter((elem) => elem.id == this.props.params.breedId)[0]})
                this.setState({images: response})
            });
    }
    

    render () {
        return (
            <div className="app-elem">

            <div className="breeds-container">
                <Search />
                <div className="content">
                    <div className="content-top">
                        <ButtonBack label='Gallery' marked />
                        <button className="label label-marked">{this.state.breed.id}</button>
                    </div>
                    <div className="breeds-middle">
                        <Swiper 
                            modules={[Pagination]}
                            pagination={{ clickable: true }}
                        >
                        {this.state.images.map(
                            elem => 
                            <SwiperSlide>
                                <img src={elem.url} alt={elem.breeds[0].name} className="main-image"/>
                            </SwiperSlide>
                        )}
                        </Swiper>
                    </div>
                    <div className="breed-bottom">
                        <h1 className="breed-header breed-h1">{this.state.breed.name}</h1>
                        <h2 className="breed-header">{this.state.breed.bred_for}</h2>
                        <div className="breed-info">
                            <div className="breed-info-elem">
                                <b>Temperament:</b><br/>
                                {this.state.breed.temperament}
                            </div>
                            <div className="breed-info-elem">
                                <b>Height: </b>{this.state.breed.height.imperial} cm at the withers<br/>
                                <b>Weight: </b>{this.state.breed.weight.imperial} kgs<br/>
                                <b>Life span: </b>{this.state.breed.life_span} years<br/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            </div>
        );
    }
}

const BreedSelected = props => {
    const params = useParams();
    return <BreedSelectedInner params={params}{...props} />
}

export default BreedSelected;
