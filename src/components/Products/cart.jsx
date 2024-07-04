import React from "react";
import "../styles/cart.css";
import Axios from "axios";
import NavBar from "../ReusableNavbar";

var cartItem = [];

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartList: [],
      total: 0,
    };
  }

  componentDidMount() {
    var tot = 0;

    cartItem = JSON.parse(localStorage.getItem("cart"));
    if (cartItem === null) {
      cartItem = [];
    } else {
      cartItem.map((item) => {
        return (tot = tot + item.product.price * item.qty);
      });

      localStorage.setItem("cartTotal", tot);
      this.setState({ total: tot });
      this.setState({ cartList: cartItem });
    }
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
    console.log(index);
    cartItem.splice(index, 1);
    this.setState({ cartList: cartItem });
    var tot = 0;

    cartItem.map((item) => {
      return (tot = tot + item.product.price * item.qty);
    });

    this.setState({ total: tot });
    localStorage.setItem("cartTotal", tot);
    localStorage.setItem("cart", JSON.stringify(cartItem));
  }

  render() {
    return (
      <div style={{backgroundColor:"white"}}>
        <NavBar />

        <h2>Cart</h2>
        <div class="container">
          <div class="col-lg-12 table-responsive">
            <table class="table table-light table-borderless table-hover text-center mb-0">
              <thead class="thead-dark col-12">
                <tr>
                  <th>Item Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Option</th>
                </tr>
              </thead>
              <tbody class="align-middle">
                {this.state.cartList.map((product) => (
                  <tr>
                    <td> {product.product.name} </td>
                    <td>Rs. {product.product.price} </td>
                    <td> {product.qty} </td>
                    <td>Rs. {product.qty * product.product.price} </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={async () => {
                          await this.delete(product.product._id);
                        }}
                      >
                        {" "}
                        X{" "}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div class="col-lg-12 ">
            <div class="bg-light p-30 mb-5">
              <div class="border-bottom pb-2"></div>
              <div class="pt-2">
                <div class="d-flex justify-content-between mt-2">
                  <h4>Total</h4>
                  <h5>Rs.{this.state.total}.00</h5>
                </div>
              </div>
            </div>
            <a href="/products" class="btn btn-outline-secondary col-3">
              {" "}
              Continue Shopping{" "}
            </a>
            <a
              href="/products/checkout"
              className="btn btn-primary offset-6 col-3 "
            >
              {" "}
              Checkout{" "}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
