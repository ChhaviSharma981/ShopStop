import React from "react";
import "../styles/SearchResultComponent.css";
import { useNavigate } from "react-router-dom";

export const SearchResultComponent = ({ result }) => {
  const navigate = useNavigate();
  return (
    <div
      className="search-component"
      onClick={(e) => {
        navigate(`../products/singleProduct/${result._id}`, { replace: true });
      }}
    >
      {result.name}
    </div>
  );
};
