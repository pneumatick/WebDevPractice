import React from 'react';

const Image = ({ url, title }) => {
    return (
        <li>
            <img src={url} alt={title} />
        </li>
    );
};

export default Image;