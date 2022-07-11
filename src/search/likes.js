import '../.css/base.css';

import React from 'react';
import Search from './Search';
import ButtonBack from '../common/btn-back';
import PhotoItem from '../common/photoItem';
import EmptyResult from '../common/emptyResult';

class SearchLikes extends React.Component {

    constructor(props) {
        super(props);

        this.state = {images: []};
    }

    componentDidMount() {
        this.getImages();
    }

    getImages() {
        let url = 'https://api.thedogapi.com/v1/votes';

        fetch(url, {
            method: "GET",
            headers: {
                "x-api-key": "7e06fa96-57d3-4811-bb36-448b149d2484",
            }
        })
        .then(response => response.json())
        .then(response => {
              this.setState({images: response.reverse().filter(elem => elem.value == 1)}) });
    }

    render() {
        let comp = <EmptyResult/>;
        if (this.state.images.length > 0) {
            comp = 
                    <div className="photos">
                        {this.state.images.map( (image) =>
                            {
                                return (
                                    <PhotoItem imageId={image.image_id} showCaption/>
                                )
                            })
                        }
                    </div>;
        }

        return (
            <div className="app-elem gallery-container">
                <Search />
                <div className="content">
                    <div className="content-top">
                        <ButtonBack label='Likes' />
                    </div>

                    <div className="breeds-middle">
                    {comp}
                    </div>
                </div>
            </div>
            );
        }
    }
    
    export default SearchLikes;
