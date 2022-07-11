import '../.css/base.css';
import '../.css/breeds.css';

import sortAsc from '../.img/btn-sort-asc.svg';
import sortDesc from '../.img/btn-sort-desc.svg';

import Search from '../search/Search';
import ButtonBack from '../common/btn-back';

import React from 'react';
import {Link} from "react-router-dom";

class Breeds extends React.Component {

    constructor(props) {
        super(props);

        this.state = {breeds: [],
                      sortType: 0};

        this.setSortType = this.setSortType.bind(this);
        this.filterByBreed = this.filterByBreed.bind(this);
    }

    componentDidMount() {
        this.getBreeds();
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

    setSortType(value) {
        this.setState({sortType: value});
    }

    filterByBreed(event) {
        this.setState({filteredId: event.target.value});
    }

    render() {

        let sortedImages = this.state.breeds;
        if (this.state.sortType == 1) {
            sortedImages.reverse();
        }

        if (this.state.filteredId) {
            sortedImages = sortedImages.filter( (elem) => elem.id == this.state.filteredId);
        }

        return (
        <div className="app-elem">

        <div className="breeds-container">
            <div className="breeds-search">
                <Search />
            </div>
            <div className="content">
                <div className="content-top">
                    <ButtonBack label='Breeds' />
                    <select className="breeds-btn breeds-select" onChange={this.filterByBreed}>
                        <option value=''>All breeds</option>
                        {
                            this.state.breeds.map(
                                (breed) => 
                                         {
                                            return (<option value={breed.id}>{breed.name}</option>)
                                         }
                            )
                        }
                    </select>
                    <select className="breeds-btn breeds-select breeds-select-limit">
                        <option>Limit: 5</option>
                        <option selected>Limit: 10</option>
                        <option>Limit: 15</option>
                        <option>Limit: 20</option>
                    </select>
                    <button className="breeds-btn breeds-btn-sort" onClick={ () => this.setSortType(0) }>
                    <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4 0.195262C4.26035 -0.0650874 4.68246 -0.0650874 4.94281 0.195262L8.94281 4.19526L8 5.13807L5.13807 2.27614V20H3.80474V2.27614L0.942809 5.13807L0 4.19526L4 0.195262ZM15.1381 1.33333C14.0335 1.33333 13.1381 2.22876 13.1381 3.33333V5.33333H17.1381V3.33333C17.1381 2.22876 16.2426 1.33333 15.1381 1.33333ZM17.1381 6.66667V9.33333H18.4714V3.33333C18.4714 1.49238 16.979 9.93411e-09 15.1381 9.93411e-09C13.2971 9.93411e-09 11.8047 1.49238 11.8047 3.33333V9.33333H13.1381V6.66667H17.1381ZM11.8047 10.6667H15.8047C17.2775 10.6667 18.4714 11.8606 18.4714 13.3333C18.4714 14.1298 18.1222 14.8447 17.5686 15.3333C18.1222 15.822 18.4714 16.5369 18.4714 17.3333C18.4714 18.8061 17.2775 20 15.8047 20H11.8047V10.6667ZM15.8047 14.6667C16.5411 14.6667 17.1381 14.0697 17.1381 13.3333C17.1381 12.597 16.5411 12 15.8047 12H13.1381V14.6667H15.8047ZM13.1381 16H15.8047C16.5411 16 17.1381 16.597 17.1381 17.3333C17.1381 18.0697 16.5411 18.6667 15.8047 18.6667H13.1381V16Z" fill="#8C8C8C"/>
                    </svg>

                    </button>
                    <button className="breeds-btn breeds-btn-sort" onClick={ () => this.setSortType(1) }><img src={sortDesc} alt="Descending"/></button>
                    
                </div>
                <div className="breeds-middle">
                    <div className="photos">
                        {sortedImages.map( (image) =>
                            {
                                return (
                                <div className="photo">
                                    <img className="photo-img" src={image.image.url} alt={image.bred_for}/>
                                    <div className="photo-caption">
                                        <Link to={'./' + image.id}>
                                            <h3 className="breeds-h3">{image.name}</h3>
                                        </Link>
                                    </div>
                                </div>)
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
        
        </div>
        );
    }
}

export default Breeds;