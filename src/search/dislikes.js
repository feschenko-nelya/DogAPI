import '../.css/base.css';

import React from 'react';
import Search from './Search';
import ButtonBack from '../common/btn-back';
import PhotoItem from '../common/photoItem';

class SearchDislikes extends React.Component {

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
            this.setState({images: response.reverse().filter(elem => elem.value == 0)}) });
    }

    render() {
        return (
            <div className="app-elem gallery-container">
                <Search />
                <div className="content">
                    <div className="content-top">
                        <ButtonBack label='Dislikes' />
                    </div>

                    <div className="breeds-middle">
                    <div className="photos">
                        {this.state.images.map( (image) =>
                            {
                                return (
                                    <PhotoItem imageId={image.image_id} showCaption/>
                                )
                            })
                        }
                    </div>
                </div>
                </div>
            </div>
            );
        }
    }
    
    export default SearchDislikes;