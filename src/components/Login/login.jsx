import React from "react";
import "../styles/login.css";
import Axios from "axios";
import NavBar from "../ReusableNavbar";

const styles = {
  background:
    "linear-gradient(35deg, rgba(27,22,108,1) 0%, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 79%)",
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pass: "",
    };
  }

  async loginForm() {
    Axios.post("/login", {
      email: this.state.email,
      password: this.state.pass,
    })
      .then(function (response) {
        if (
          response.data.role === "customer" &&
          response.data.state === "active"
        ) {
          localStorage.setItem("isLogedIn", true);
          localStorage.setItem("user", JSON.stringify(response.data));
          window.location = "/User";
        }
        if (
          response.data.role === "seller" &&
          response.data.state === "active"
        ) {
          localStorage.setItem("isLogedIn", true);
          localStorage.setItem("user", JSON.stringify(response.data));
          window.location = "/SalesManager/sales";
        }
      })
      .catch(function (error) {
        console.log(error.data);
      });
  }

  render() {
    return (
      <div style={{backgroundColor:"white"}}>
        <NavBar />

        <div className="login-container mt-5 mb-5 col-3">
          <h2>Login to Your Account</h2>
          <div className="mb-3">
            {/* <center>
              <img style={{ width: "50%" }} src="user.png" alt="example" />
            </center> */}
          </div>

          <form className="form">
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="name@example.com"
                required
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="*****"
                required
                onChange={(e) => this.setState({ pass: e.target.value })}
              />
            </div>
            <br />
            <button
              type="button"
              className="login-button"
              onClick={async () => {
                await this.loginForm();
              }}
            >
              Login
            </button>
          </form>
          <p>
            Don't have an account? <a href="/register">Create an account</a>
          </p>
        </div>
      </div>
    );
  }
}

export default Login;
