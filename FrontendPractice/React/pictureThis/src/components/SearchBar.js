import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';

const SearchBar = ({ handleSubmit }) => {
    const [value, setValue] = useState("")
  
    const handleChange = e => {
      setValue(e.target.value);
    }

    return (
      <form className="search-bar" onSubmit={e => handleSubmit(e, value)}>
        <Form.Control placeholder="Search..." onChange={handleChange}/>
        <Button disabled={!value}>Search</Button>
      </form>
    );
}

export default SearchBar;