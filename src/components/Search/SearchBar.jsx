import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "../styles/SearchBar.css";
import Axios from "axios";

const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    Axios.get("/product")
      .then(
        (response) => response.data
        //   console.log(JSON.stringify(response.data, null, 2));
      )
      .then((responseData) => {
        const results = responseData.filter((product) => {
          return value && product && product.name.toLowerCase().includes(value);
        });
        setResults(results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <input
        type="search"
        placeholder="Search"
        className="mr-2"
        aria-label="Search"
        value={input}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      ></input>
      <Button variant="outline-danger">Search</Button>
    </div>
  );
};

export default SearchBar;
