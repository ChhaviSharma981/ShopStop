import React from 'react';
import Axios from 'axios';
import '../styles/login.css';
import ReusableNavbar from '../ReusableNavbar';

const styles = {
  background: 'linear-gradient(35deg, rgba(27,22,108,1) 0%, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 79%)',
};

class UserOderHistory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      orderList: []
    }
  }

  async componentDidMount() {
    try {
      const response = await Axios.get('/product/order/' + JSON.parse(localStorage.getItem('user'))._id);
      this.setState({ orderList: response.data })
    } catch (error) {
      return [];
    }
  }

  render() {
    return (
      <div style={{backgroundColor:"white"}}>
        <ReusableNavbar/>
        <h2 style={{ fontSize: "30px", fontWeight: "bold" }} className='text-white mt-5'>Order History</h2>
        <div className='row mt-0 ' style={{ height: "800px" }}>
          <div className="container">
            <div className="col-lg-12 table-responsive">
              <table className="table table-light table-borderless table-hover text-center mb-0">
                <thead className="thead-dark col-12" >
                  <tr>
                    <th>Item Name</th>
                    <th>Total</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th>Option</th>
                  </tr>
                </thead>
                <tbody className="align-middle">
                  {this.state.orderList.map((item) => (
                    <tr>
                      <th>{item._id}</th>
                      <th>{item.total}</th>
                      <th>{item.shipto}</th>
                      <th>{item.status}</th>
                      <th><a href={"/products/OrderView/" + item._id} className='btn btn-success'>View Order</a></th>
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

export default UserOderHistory;
