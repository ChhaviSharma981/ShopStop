import React from 'react';
import '../styles/login.css';
import Axios from 'axios';

class ProductList extends React.Component {

    constructor(props) {
        if (localStorage.getItem('isLogedIn') === 'false') {
            window.location = '/login';
        }

        super(props);
        this.state = {
            dataList: []
        }
    }

    async componentDidMount() {
        this.setState({ dataList: await this.getAllProduct() });
    }

    async getAllProduct() {
        try {
            const response = await Axios.get('/product');
            return response.data;
        } catch (error) {
            return [];
        }
    }

    render() {
        return (

            <div>
                <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow" style={{ height: "65px" }}>
                    <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">Seller Dashboard</a>
                    <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="navbar-nav">
                        <div className="nav-item text-nowrap">
                            <a className="nav-link px-3" href="/">Sign out</a>
                        </div>
                    </div>
                </header>
                <div className="container-fluid">
                    <div className="row">
                        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-body-tertiary sidebar collapse" style={{ backgroundColor: "rgb(242 243 244)" }}>
                            <div className="position-sticky pt-3 sidebar-sticky">
                                <ul className="nav flex-column" style={{ height: "800px" }}>
                                    <li className="nav-item" >
                                        <a className="nav-link active text-dark" aria-current="page" href="/SalesManager/SellerAddProduct">
                                            <span data-feather="home" className="align-text-bottom"></span>
                                            Add Product
                                        </a>
                                        <hr style={{ color: "white" }} />
                                    </li>
                                    <li className="nav-item" >
                                        <a className="nav-link active text-dark" aria-current="page" href="/SalesManager/productList">
                                            <span data-feather="home" className="align-text-bottom"></span>
                                            Product List
                                        </a>
                                        <hr style={{ color: "white" }} />
                                    </li>
                                    <li className="nav-item" >
                                        <a className="nav-link active text-dark" aria-current="page" href="/SalesManager/sales">
                                            <span data-feather="home" className="align-text-bottom"></span>
                                            Store Register
                                        </a>
                                        <hr style={{ color: "white" }} />
                                    </li>
                                    <li className="nav-item" >
                                        <a className="nav-link active text-dark" aria-current="page" href="/SalesManager/updateStore">
                                            <span data-feather="home" className="align-text-bottom"></span>
                                            Update Store
                                        </a>
                                        <hr style={{ color: "white" }} />
                                    </li>

                                </ul>
                            </div>
                        </nav>

                        <div class="container">
                            <center>
                                <h1 className='mt-4' style={{ fontWeight: "bold" }}>Product List</h1>
                            </center>
                            <div class="col-lg-12 table-responsive">
                                <table class="table table-light table-borderless table-hover text-center mb-0">
                                    <thead class="thead-dark col-12" >
                                        <tr>
                                            <th>Item Name</th>
                                            <th>Description</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Status</th>
                                            <th>Option</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody class="align-middle">

                                        {this.state.dataList.map((product) => (
                                            <tr>
                                                <td>{product.name} </td>
                                                <td>{product.descrption} </td>
                                                <td>{product.price} </td>
                                                <td> {product.qty} </td>
                                                <td>{product.status}</td>
                                                <td><a className='btn btn-danger' href={'/SalesManager/UpdateProduct/' + product._id}> Update </a></td>
                                                <td><a className='btn btn-danger' href={'/products/singleProduct/' + product._id}> View </a></td>
                                            </tr>
                                        ))
                                        }

                                    </tbody>
                                </table>
                            </div>


                        </div>
                    </div>
                </div >
            </div>
        );
    }
}

export default ProductList;

