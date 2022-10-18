import React, { createContext, useState } from 'react';
import { key } from "../api/apiInfo";
export const PictureContext = createContext();

const PictureContextCom = props => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    const search = query => {
        fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
            .then(response => {
                console.log(response);
                setImages(response.data.photos.photo);
                setLoading(false);
            })
            .catch(error => {
                console.log(`Error encountered while fetching/parsing data: ${error}`);
            });
    }

    return (
        <PictureContext.Provider value={{images, loading, search}}>
            {props.children}
        </PictureContext.Provider>
    );
};

export default PictureContextCom;