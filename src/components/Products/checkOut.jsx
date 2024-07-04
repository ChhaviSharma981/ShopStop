import React from "react";
import "../styles/login.css";
import Axios from "axios";
import { json } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import NavBar from "../ReusableNavbar";

const styles = {
  background:
    "linear-gradient(35deg, rgba(27,22,108,1) 0%, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 79%)",
};

class CheckOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: "",
      address: "",
      orderID: "",
    };
    if (localStorage.getItem("isLogedIn") === "false") {
      window.location = "/login";
    }
  }

  async handleToken(token) {
    Axios.put("/product/order/" + localStorage.getItem("orderItem"), {
      status: "paid",
    }).then(function (response) {
      if (response.data._id === localStorage.getItem("orderItem")) {
        window.location = "/";
      }
    });
  }

  async addOrder() {
    Axios.post("/product/order/add", {
      ordered: "true",
      shipped: "false",
      shipto: this.state.address,
      status: "orderd",
      total: localStorage.getItem("cartTotal"),
      userid: JSON.parse(localStorage.getItem("user"))._id,
      contact: this.state.contact,
    })
      .then(function (response) {
        var orderid = response.data._id;
        localStorage.setItem("orderItem", orderid);

        var cartItem = JSON.parse(localStorage.getItem("cart"));
        cartItem.map((item) =>
          Axios.post("/product/order/item/add", {
            productid: item.product._id,
            productName: item.product.name,
            productPrice: item.product.price,
            quantity: item.qty,
            orderid: response.data._id,
          }).then(function (response) {
            console.log("order item : " + response.data._id);
          })
        );
        localStorage.removeItem("cart");
      })
      .catch(function (error) {
        console.log(error.data);
      });
  }

  render() {
    return (
      <div style={{backgroundColor:"white"}}>
        <NavBar />
        <div className="row mt-5 ">
          <div className="col-5 offset-1 mt-5">
            <h1
              style={{ fontSize: "30px", fontWeight: "bold" }}
              className="mb-4 text-white"
            >
              Billing Details
            </h1>
            <div class="mb-3">
              <label
                for="exampleFormControlInput1"
                class="form-label text-white"
              >
                Contact{" "}
              </label>
              <input
                type="email"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="mobile number"
                onChange={(e) => this.setState({ contact: e.target.value })}
                required
              />
            </div>
            <div class="mb-3">
              <label
                for="exampleFormControlTextarea1"
                class="form-label text-white"
              >
                Address
              </label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                onChange={(e) => this.setState({ address: e.target.value })}
                required
              ></textarea>
            </div>
          </div>
          <div className="col-6 mt-5">
            <center>
              <h2
                style={{ fontSize: "30px", fontWeight: "bold" }}
                className="text-white mt-3"
              >
                Your order
              </h2>
              <div className="col-5 mt-4" style={{ backgroundColor: "#fff" }}>
                <form>
                  <div className="mb-3 mt-3">
                    <span
                      style={{ fontSize: "20px", fontWeight: "bold" }}
                      className="form-label"
                    >
                      Oder Number: <span>0999324</span>{" "}
                    </span>
                  </div>
                  <div className="mb-3">
                    <span
                      style={{ fontSize: "20px", fontWeight: "bold" }}
                      className="form-label"
                    >
                      Customer:{" "}
                      <span>
                        {JSON.parse(localStorage.getItem("user")).name}
                      </span>
                    </span>
                  </div>
                  <div className="mb-3">
                    <span
                      style={{ fontSize: "20px", fontWeight: "bold" }}
                      className="form-label"
                    >
                      Total: Rs.<span>{localStorage.getItem("cartTotal")}</span>
                      .00
                    </span>
                  </div>
                </form>
              </div>
            </center>
          </div>
          <div className="col-4 offset-2" style={{ height: "20px" }}>
            <button
              type="button"
              className="btn btn-dark col-12 mt-5"
              style={{ height: "50px" }}
              onClick={async () => {
                await this.addOrder();
              }}
            >
              Check Out
            </button>
          </div>
          <div
            className="col-2 offset-1"
            style={{ height: "200px", marginLeft: "265px" }}
          >
            <StripeCheckout
              token={this.handleToken}
              stripeKey="pk_test_51IBdKaBOyFl9U9l78286DSJiQmmLYBHJdXVJCnoAfk8oipppXJ0zbyqjfBkn6ZpD6Cphz5YR8yYSTIyGFOPPga8E00QpoaNb4G"
              amount={localStorage.getItem("cartTotal") + "00"} // Amount in cents
              currency="LKR"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CheckOut;
