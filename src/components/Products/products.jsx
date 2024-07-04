import React from "react";
import "../styles/product.css";
import Axios from "axios";
import ReusableNavbar from "../ReusableNavbar";

const styles = {
  background:
    "linear-gradient(35deg, rgba(27,22,108,1) 0%, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 79%)",
};

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
    };
  }

  async componentDidMount() {
    this.setState({ dataList: await this.getAllProduct() });
  }

  async getAllProduct() {
    try {
      const response = await Axios.get("/product");
      return response.data;
    } catch (error) {
      return [];
    }
  }

  renderProducts() {
    return this.state.dataList.map((product) => (
      <div className="product-card" key={product.id}>
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <center>
          <p style={{ width: "70%" }}>Available Stock: {product.qty}</p>
        </center>
        <p>Price: Rs.{product.price}.00</p>
        <div className="row">
          <a
            href={"/products/singleProduct/" + product._id}
            className="buy-now-button col-12 text-white mt-3"
          >
            View Product
          </a>
        </div>
      </div>
    ));
  }

  render() {
    return (
      <div style={{ backgroundColor: "white" }}>
        <ReusableNavbar />

        <div style={{ height: "800px" }}>
          <div className="container-fluid mt-5">
            <center>
              <span
                className="text-black"
                style={{ fontSize: "40px", fontWeight: "bold" }}
              >
                Product
              </span>
            </center>
            <hr style={{ backgroundColor: "white" }} />{" "}
            <div className="search-bar"></div>
            <div className="product-list">{this.renderProducts()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Products;
