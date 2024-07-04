import React from "react";
import "../styles/SearchResultsList.css";
import { SearchResultComponent } from "./SearchResultComponent";

export const SearchResults = ({ results }) => {
  return (
    <div className="results-list">
      {results.map((result, id) => {
        return <SearchResultComponent result={result} key={id} />;
      })}
    </div>
  );
};
