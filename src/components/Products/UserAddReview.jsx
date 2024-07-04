import React from 'react';
import '../styles/login.css';
import Axios from 'axios';
import ReusableNavbar from '../ReusableNavbar';

const styles = {
    background: 'linear-gradient(35deg, rgba(27,22,108,1) 0%, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 79%)',
};

class UserAddReview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            productID: window.location.href.split('/')[5],
            review: ""
        }
    }

    async addReview() {
        Axios.post('/review/add', {
            productid: this.state.productID,
            review: this.state.review,
            userid: JSON.parse(localStorage.getItem('user'))._id,
            userName: JSON.parse(localStorage.getItem('user')).name
        }).then(function (response) {
            window.location = '/products/UserOderHistory';
        }).catch(function (error) {
            console.log(error.data);
        });
    }

    render() {
        return (
            <div style={{backgroundColor:"white"}}>
                <ReusableNavbar/>
                <h2 style={{ fontSize: "30px", fontWeight: "bold" }} className='text-white mt-5'>Order Review</h2>
                <div className='col-8 offset-2 mt-5' style={{ height: "700px" }} >
                    <h1 style={{ fontSize: "30px", fontWeight: "bold" }} className='mb-4 text-white'>Details</h1>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label text-white">Product Name </label>
                        <input type="email" class="form-control" id="exampleFormControlInput1" readOnly placeholder="product number" value={this.state.productID} />
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label text-white">Review</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e) => this.setState({ review: e.target.value })}></textarea>
                    </div>
                    <button type="submit" className='btn btn-dark col-12 mt-5' style={{ height: "50px" }} onClick={async () => { await this.addReview(); }} >Submit</button>
                </div>

            </div>
        );
    }
}

export default UserAddReview;
