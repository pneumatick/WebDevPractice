import React from 'react';
import { apiKey } from "../api/apiInfo";
export const PictureContext = React.createContext();

class PictureContextCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            loading: true
        }
    }

    search(query) {
        fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
            .then(response => {
                this.setState({
                    images: response.data.photos.photo,
                    loading: false
                });
            })
            .catch(error => {
                console.log(`Error encountered while fetching/parsing data: {error}`);
            });
    }

    render() {
        let images = this.state.images;
        let loading = this.state.loading;
        let search = this.search;
        return (
            <PictureContext.Provider value={{images, loading, search}}>
                {this.props.children}
            </PictureContext.Provider>
        );
    }
}

export default PictureContextCom;