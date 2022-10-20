import Image from './Image';
import React, { useContext } from "react";
import { PictureContext } from './PictureContext';

const Images = props => {
    let pictures;
    let noImages;
    const { images } = useContext(PictureContext);

    if (images.length > 0) {
        pictures = images.map(image => {
            console.log('new image')
            let farm = image.farm;
            let server = image.server;
            let id = image.id;
            let secret = image.secret;
            let title = image.title;
            let url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_m.jpg`;
            return <Image url={url} alt={title} key={id} />;
        });
    }
    else {
        noImages = true
    }

    return (
        <div>
            {noImages ? <h1>No Images</h1> : <ul>{pictures}</ul>}
        </div>
    );
};

export default Images;