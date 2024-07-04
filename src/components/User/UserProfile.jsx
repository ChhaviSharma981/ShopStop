import React from 'react';
import Axios from 'axios';
import '../styles/register.css';
import ReusableNavbar from '../ReusableNavbar';

const styles = {
    background: 'linear-gradient(35deg, rgba(27,22,108,1) 0%, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 79%)',
};

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user')),
            name: JSON.parse(localStorage.getItem('user')).name,
            email: JSON.parse(localStorage.getItem('user')).email,
            pass: JSON.parse(localStorage.getItem('user')).password,
            address: JSON.parse(localStorage.getItem('user')).address,
            contact: JSON.parse(localStorage.getItem('user')).phone
        }
    }

    async update() {

        Axios.put('/profile/' + this.state.user._id, {
            name: this.state.name,
            email: this.state.email,
            password: this.state.pass,
            address: this.state.address,
            phone: this.state.contact,
            state: "active",
            role: "customer"
        })
            .then(function (response) {
                if (response.data.role == "customer") {
                    localStorage.setItem('user', JSON.stringify(response.data));
                    window.location = '/User';
                }
            })
            .catch(function (error) {
                console.log(error.data);
            });

    }

    render() {
        return (
            <div style={{backgroundColor:"white"}}>
                <ReusableNavbar/>
                <div className="register-container mt-5">
                    <h2>Update Your Account</h2>

                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input class="form-control" type="text" id="name" name="name" value={this.state.name} required onChange={(e) => this.setState({ name: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input class="form-control" type="email" id="email" name="email" value={this.state.email} required onChange={(e) => this.setState({ email: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input class="form-control" type="password" id="password" name="password" value={this.state.pass} required onChange={(e) => this.setState({ pass: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address:</label>
                            <input class="form-control" type="text" id="address" name="address" required value={this.state.address} onChange={(e) => this.setState({ address: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contact">Contact:</label>
                            <input class="form-control" type="text" id="contact" name="contact" required value={this.state.contact} onChange={(e) => this.setState({ contact: e.target.value })} />
                        </div>
                        <button type="button" className="register-button mt-4" onClick={async () => { await this.update(); }} >Update</button>
                    </form>
                </div>
            </div>
        );
    };

}
export default UserProfile;
