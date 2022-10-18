import Image from './Image';
import React from "react";

const Images = props => {
    let images;
    let noImages = false;

    if (props.data.length > 0) {
        images = props.data.map(image => {
            console.log('new image')
            let farm = image.farm;
            let server = image.server;
            let id = image.id;
            let secret = image.secret;
            let title = image.title;
            let url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_m.jpg`;
            console.log(title)
            return <Image url={url} alt={title} key={id} />;
        });
    }
    else {
        noImages = true;
    }

    return (
        <div>
            {noImages ? <h1>No Images</h1> : <ul>{images}</ul>}
        </div>
    );
};

export default Images;