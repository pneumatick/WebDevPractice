import React from "react";
import ImageArea from "./ImageArea";

const Item = ({ query }) => {
    return (
        <div>
            <h1>Result loaded</h1>
            <ImageArea query={query} />
        </div>
    );
};

export default Item;