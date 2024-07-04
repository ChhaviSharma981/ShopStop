import React from "react";
import "../styles/home.css";
import Axios from "axios";
import ReusableNavbar from "../ReusableNavbar";

var cartItem = [];

const styles = {
  background:
    "linear-gradient(35deg, rgba(27,22,108,1) 0%, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 79%)",
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
    };
  }

  async componentDidMount() {
    this.setState({ dataList: await this.getAllProduct() });
    cartItem = JSON.parse(localStorage.getItem("cart"));
    if (cartItem == null) {
      cartItem = [];
    }
    if (localStorage.getItem("isLogedIn") == null) {
      localStorage.setItem("isLogedIn", false);
    }
  }

  async getAllProduct() {
    try {
      const response = await Axios.get("/product");
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async addToCart(id, qtyValue) {
    try {
      const response = await Axios.get("/product/" + id);

      if (this.checkArray(response.data)) {
        var index = this.checkIndexInArray(response.data);
        cartItem[index] = {
          product: response.data,
          qty: cartItem[index].qty + 1,
        };
      } else {
        cartItem.push({ product: response.data, qty: qtyValue });
      }
      localStorage.setItem("cart", JSON.stringify(cartItem));
    } catch (error) {
      return [];
    }
  }

  checkArray(productOBJ) {
    var status = false;
    cartItem = JSON.parse(localStorage.getItem("cart"));
    if (cartItem == null) {
      cartItem = [];
    }
    for (var i = 0; i < cartItem.length; i++) {
      if (cartItem[i].product._id === productOBJ._id) {
        status = true;
        break;
      }
    }
    return status;
  }

  checkIndexInArray(productOBJ) {
    var i = 0;
    var index = 0;
    cartItem = JSON.parse(localStorage.getItem("cart"));
    if (cartItem == null) {
      cartItem = [];
    }
    console.log(cartItem);
    for (i = 0; i < cartItem.length; i++) {
      if (cartItem[i].product._id === productOBJ._id) {
        index = i;
        break;
      }
    }
    return index;
  }

  async delete(id) {
    const response = await Axios.get("/product/" + id);
    var index = this.checkIndexInArray(response.data);
    cartItem.splice(index, 1);
  }

  render() {
    return (
      <>
        <ReusableNavbar />
        <div style={{ backgroundColor: "white" }}>
          <div class="album py-5 bg-body-tertiary">
            <div class="container">
              <center>
                <span
                  className="text-black"
                  style={{ fontSize: "40px", fontWeight: "bold" }}
                >
                  Product
                </span>
              </center>
              <hr style={{ backgroundColor: "white" }} />
              <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {this.state.dataList.map((product) => (
                  <div class="col" key={product._id}>
                    <div class="card shadow-sm">
                      <a class="navbar-brand" href="#">
                        <img src={product.image} alt="" />
                      </a>
                      <h1
                        style={{
                          fontSize: "35px",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        {product.name}
                      </h1>
                      <div class="card-body">
                        <center>
                          <span
                            style={{ fontSize: "25px", fontWeight: "bold" }}
                          >
                            Rs.{product.price}.00
                          </span>
                        </center>
                        <div className="col-12 mt-4">
                          <a href={"/products/singleProduct/" + product._id}>
                            <button className="buy-button col-12">
                              {" "}
                              View Product{" "}
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
