import React from 'react';
import Axios from 'axios';
import '../styles/register.css';
import ReusableNavbar from '../ReusableNavbar';

const styles = {
  background: 'linear-gradient(35deg, rgba(27,22,108,1) 0%, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 79%)',
};

class SRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      pass: "",
      address: "",
      contact: ""
    }
  }

  async register() {

    var passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (passRegex.test(this.state.pass)) {
      Axios.post('/register', {
        name: this.state.name,
        email: this.state.email,
        password: this.state.pass,
        address: this.state.address,
        phone: this.state.contact,
        state: "deactive",
        role: "seller"
      })
        .then(function (response) {
          alert("you will be redirect to customer dashboard until your seller gets approval.")
          localStorage.setItem('isLogedIn', true);
          localStorage.setItem('user', JSON.stringify(response.data))
          window.location = '/User';
        })
        .catch(function (error) {
          console.log(error.data);
        });
    } else {
      alert("Password does not meet the security requirements");
    }


  }

  render() {
    return (
      <div style={{backgroundColor:"white"}}>
        <ReusableNavbar/>
        <div className="register-container mt-5">
          <h2>Register a Seller Account</h2>
          <div className="mb-3">
            {/* <center>
              <img style={{ width: "50%" }}
                src="user.png"
                alt="example"
              />
            </center> */}
          </div>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input class="form-control" type="text" id="name" name="name" required onChange={(e) => this.setState({ name: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input class="form-control" type="email" id="email" name="email" required onChange={(e) => this.setState({ email: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input class="form-control" type="password" id="password" name="password" required onChange={(e) => this.setState({ pass: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input class="form-control" type="text" id="address" name="address" required onChange={(e) => this.setState({ address: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="contact">Contact:</label>
              <input class="form-control" type="text" id="contact" name="contact" required onChange={(e) => this.setState({ contact: e.target.value })} />
            </div>
            <button type="button" className="register-button mt-4" onClick={async () => { await this.register(); }} >Register</button>
          </form>
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
      </div>
    );
  };

}
export default SRegister;
