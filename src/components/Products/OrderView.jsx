import React from 'react';
import '../styles/login.css';
import Axios from 'axios';
import ReusableNavbar from '../ReusableNavbar';

const styles = {
    background: 'linear-gradient(35deg, rgba(27,22,108,1) 0%, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 79%)',
};

class OrderView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orderItemList: [],
            orderID: window.location.href.split('/')[5],
            order: Object
        }
    }

    async componentDidMount() {
        try {
            const responseList = await Axios.get('/product/order/item/' + this.state.orderID);
            //console.log(responseList.data);
            this.setState({ orderItemList: responseList.data })
            console.log(this.state.orderItemList);

            const response = await Axios.get('/product/orderDetails/' + this.state.orderID);
            this.setState({ order: response.data })

        } catch (error) {
            return [];
        }
    }

    render() {
        return (
            <div style={{backgroundColor:"white"}}>
                <ReusableNavbar/>
                <div className='row mt-5 ' >

                    <div className='col-12 mt-0' >
                        <center>
                            <h2 style={{ fontSize: "30px", fontWeight: "bold" }} className='text-white mt-3'>View Order</h2>
                            <div className="col-5 mt-4" style={{ backgroundColor: "#fff" }}>
                                <form>
                                    <div className="mb-3 mt-3">
                                        <span style={{ fontSize: "20px", fontWeight: "bold" }} className="form-label">Order Number: <span>{this.state.order._id}</span> </span>
                                    </div>
                                    <div className="mb-3">
                                        <span style={{ fontSize: "20px", fontWeight: "bold" }} className="form-label">Status: <span>{this.state.order.status}</span></span>
                                    </div>
                                    <div className="mb-3">
                                        <span style={{ fontSize: "20px", fontWeight: "bold" }} className="form-label">Total: Rs.<span>{this.state.order.total}</span>.00</span>
                                    </div>
                                </form>
                            </div>
                        </center>
                    </div>
                    <div class="container" style={{ height: "800px" }}>
                        <div class="col-lg-12 table-responsive">
                            <table class="table table-light table-borderless table-hover text-center mb-0">
                                <thead class="thead-dark col-12" >
                                    <tr>
                                        <th>Item Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total Price</th>
                                        <th>Option</th>
                                    </tr>
                                </thead>
                                <tbody class="align-middle">


                                    {this.state.orderItemList.map((item) => (
                                        <tr>
                                            <td>{item.productName} </td>
                                            <td>{item.productPrice} </td>
                                            <td> {item.quantity} </td>
                                            <td>Rs. {item.productPrice * item.quantity} </td>
                                            <td><a href={'/products/UserAddReview/' + item.productid} className='btn btn-success'>Add Review </a></td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>


                    </div>

                </div>

            </div>
        );
    }
}

export default OrderView;
