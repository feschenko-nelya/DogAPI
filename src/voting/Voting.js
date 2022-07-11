import '../.css/base.css';
import '../.css/voting.css';

import React from 'react';

import like from '../.img/like-white.svg';
import favouriteEmpty from '../.img/favourite-transparance.svg';
import favouriteFill from '../.img/favourite-fill-white.svg';
import dislike from '../.img/dislike-white.svg';
import listDislike from '../.img/dislike-yellow.svg';
import listLike from '../.img/like-green.svg';
import favouriteVote from '../.img/favourite-small.svg';

import Search from '../search/Search';
import ButtonBack from '../common/btn-back';

class Voting extends React.Component {

    constructor(props) {
        super(props);

        this.state = {img: {}, 
                      favourites: [],
                      votes: []};

        this.createVote = this.createVote.bind(this);
        this.toggleFavourite = this.toggleFavourite.bind(this);
        this.isFavourite = this.isFavourite.bind(this);
    }

    componentDidMount() {
        this.getImg();
    }

    getImg() {
        let url = 'https://api.thedogapi.com/v1/images/search';

        fetch(url, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-Width, Content-Type, Accept",
            }
        })
        .then(response => response.json())
        .then(response => {
            this.setState({img: response[0]});
            this.getFavourites();
            this.getVotes();
        });
    }

    createVote(value) {
        let url = 'https://api.thedogapi.com/v1/votes';
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "7e06fa96-57d3-4811-bb36-448b149d2484",
            },
            body: JSON.stringify({
                "image_id": this.state.img.id,
                "value": value
              }) ,
        })
        .then(response => response.json())
        .then(response => {
            this.getImg();
            this.getVotes();
        });
    }

    addFavourite() {
        let url = 'https://api.thedogapi.com/v1/favourites';

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "7e06fa96-57d3-4811-bb36-448b149d2484",
            },
            body: JSON.stringify({
                "image_id": this.state.img.id,
            }),
        })
        .then(response => response.json())
        .then(this.getFavourites());
    }

    deleteFavourite() {
        let url = 'https://api.thedogapi.com/v1/favourites/' + (this.isFavourite() ? this.getFavouriteObjs()[0].id : 0);

        fetch(url, {
            method: "DELETE",
            headers: {
                "x-api-key": "7e06fa96-57d3-4811-bb36-448b149d2484",
            },
        })
        .then(response => response.json())
        .then(this.getFavourites());
    }

    isFavourite() {
        return this.getFavouriteObjs().length > 0;
    }

    getFavouriteObjs() {
        return this.state.favourites.filter(elem => elem.image_id == this.state.img.id);
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

    toggleFavourite() {
        if (!this.isFavourite()) {
            this.addFavourite();
        }
        else {
            this.deleteFavourite();
        }
    }

    getVotes() {
        let url = 'https://api.thedogapi.com/v1/votes';

        fetch(url, {
            method: "GET",
            headers: {
                "x-api-key": "7e06fa96-57d3-4811-bb36-448b149d2484",
            }
        })
        .then(response => response.json())
        .then(response => {
            this.setState({votes: response.reverse()}) });
    }

    render () {
        let historyItems = this.state.favourites.concat(this.state.votes).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime() );
        
        return (
            <div className="app-elem voting-container">
                <Search />
                <div className="content">

                    <div className="content-top">
                        <ButtonBack label='Voting' />
                    </div>
                    <div className="voting-middle">
                        <img src={this.state.img.url} alt={this.state.img.name} className="main-image"/>
                        <div className="voting-btns">
                            <button className="voting-like" onClick={ () => { this.createVote(1) } }><img src={like} alt='Dislike'/></button>
                            <button className="voting-favourite" onClick={() => {this.toggleFavourite()} }><img src={this.isFavourite() ? favouriteFill : favouriteEmpty} alt='Favourite'/></button>
                            <button className="voting-dislike"  onClick={ () => { this.createVote(0) } }><img src={dislike} alt='Like'/></button>
                        </div>
                    </div>
                    <div className="voting-actions">
                        <ol className="voting-list">
                            {
                            historyItems.map(
                                (image) => 
                                {
                                    let date = new Date(image.created_at);
                                    let strDate = date.toLocaleTimeString();
                                    let actionName = (("value" in image)
                                                    ? (image.value==0) ? 'dislike' : 'like'
                                                    : 'favourites');
                                    let actionImg = (("value" in image)
                                                    ? (image.value==0) 
                                                    ? <img src={listDislike} alt='Dislike'/>
                                                    : <img src={listLike} alt='Like'/>
                                                    : <img src={favouriteVote} alt='Favourite'/>);

                                    return (
                                    <li className="voting-list-elem">
                                        <div>
                                            <span className="voting-list-time">
                                            {strDate.slice(0, 5)}</span> Image ID: <span className='voting-list-imgID'>{image.image_id}</span> was added to {actionName}.
                                        </div>
                                        <div>
                                            {actionImg}
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

export default Voting;
