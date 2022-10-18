import { PictureContext } from './PictureContext';
import Images from './Images';
import React, { useContext, useEffect } from 'react';

const ImageArea = ({query}) => {
  const { images, loading, search } = useContext(PictureContext);
  useEffect(() => {
    search(query);
  }, [query, search]);

  return ( 
    <div>
      {loading ? <h1>No Images</h1> : <Images data={images} />}
    </div>
  );
};

export default ImageArea;