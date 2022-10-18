import SearchBar from "./SearchBar";
import DefaultCategories from "./DefaultCategories";
import React from "react";

//const Header = ({ handleSubmit, history }) => {
const Header = ({ handleSubmit }) => {
    return (
        <div>
            <h1>Picture This</h1>
            <SearchBar 
            handleSubmit={handleSubmit}
            //history={history}
            />
            <DefaultCategories />
        </div>
    );
};

export default Header;