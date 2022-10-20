import { PictureContext } from './PictureContext';
import Images from './Images';
import React, { useContext, useEffect, useState } from 'react';

import axios from 'axios';
import { key } from "../api/apiInfo";

const ImageArea = ({query}) => {
  //const { images, loading, search } = useContext(PictureContext);
  const { search } = useContext(PictureContext);
  let loading = false;
  useEffect(() => {
    console.log('it\'s me');
    search(query);
  }, [query]);

  return ( 
    <div>
      {/*loading ? <h1>No Images</h1> : <Images data={images} />*/}
      {loading ? <h1>No Images</h1> : <Images />}
    </div>
  );
};

export default ImageArea;