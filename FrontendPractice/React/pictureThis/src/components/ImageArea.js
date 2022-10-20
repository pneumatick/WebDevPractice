import { PictureContext } from './PictureContext';
import Images from './Images';
import React, { useContext, useEffect } from 'react';

const ImageArea = ({query}) => {
  const { search, loading } = useContext(PictureContext);
  useEffect(() => {
    search(query);
  }, [query]);

  return ( 
    <div>
      {loading ? <h1>No Images</h1> : <Images />}
    </div>
  );
};

export default ImageArea;