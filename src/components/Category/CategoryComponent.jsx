import React from "react";
import Axios from "axios";

export const CategoryComponent = ({ setResults }) => {
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
  return <></>;
};
