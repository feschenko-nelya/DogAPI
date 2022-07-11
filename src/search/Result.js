import '../.css/base.css';
import '../.css/breeds.css'

import React from 'react';
import Search from '../search/Search';
import ButtonBack from '../common/btn-back';
import EmptyResult from '../common/emptyResult';
import PhotoItem from '../common/photoItem';
import {Link, useParams} from "react-router-dom";

class SearchResultInner extends React.Component {

    constructor(props) {
        super(props);

        this.state = {images: []};
    }

    componentDidMount() {
        console.log(this.props);
        this.getResult(this.props.params.text);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.params.text != this.props.params.text) {
            this.getResult(this.props.params.text);
        }
    }

    getResult(text) {
        let url = 'https://api.thedogapi.com/v1/breeds/search?';
        let params = new URLSearchParams({
                                        q: text
                                    });

        fetch(url + params, {
              method: "GET",
              headers: {"x-api-key": "7e06fa96-57d3-4811-bb36-448b149d2484",
                       }
        })
        .then(response => response.json())
        .then(response => {this.setState({images: {}});
                           this.setState({images: response.filter(elem => 'reference_image_id' in elem)})});
    }

    render() {
        let comp = <EmptyResult/>;
        if (this.state.images && this.state.images.length > 0) {
            console.log(this.state.images);

            comp = 
                    <div className="photos">
                        {this.state.images.map( (image) =>
                            {
                                return (
                                    <div>
                                        <PhotoItem imageId={image.reference_image_id} showCaption/>
                                    </div>
                                )
                            })
                        }
                    </div>;
        }

        return (
            <div className="app-elem gallery-container">
                <Search text={this.props.params.text}/>
                <div className="content">
                    <div className="content-top">
                        <ButtonBack label='Search' />
                    </div>
                    <div className="breeds-middle">
                    {comp}
                    </div>

                </div>
            </div>
            );
        }
    }
    
    const SearchResult = props => {
        const params = useParams();
        return <SearchResultInner params={params}{...props} />
    }

    export default SearchResult;
