import { PictureContext } from './PictureContext';
import Images from './Images';
import React, { useContext, useEffect, useState } from 'react';

import axios from 'axios';
import { key } from "../api/apiInfo";

const ImageArea = ({query}) => {
  //const { images, loading, search } = useContext(PictureContext);
  /*useEffect(() => {
    search(query);
  }, [query, search]);*/

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const search = query => {
        axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
            .then(response => {
                console.log(response);
                setImages(response.data.photos.photo);
                setLoading(false);
            })
            .catch(error => {
                console.log(`Error encountered while fetching/parsing data: ${error}`);
            });
    };

    search(query);
  }, [setImages, setLoading]);


  return ( 
    <div>
      {loading ? <h1>No Images</h1> : <Images data={images} />}
    </div>
  );
};

export default ImageArea;