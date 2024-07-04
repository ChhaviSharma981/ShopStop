import React from 'react';
import '../styles/login.css';
import Axios from 'axios';

class UpdateProduct extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            productObject: Object,
            productID: window.location.href.split('/')[5],
            name: "",
            descrption: "",
            image: "",
            qty: "",
            price: "",
            status: "",
            user: JSON.parse(localStorage.getItem('user')),
            store: JSON.parse(localStorage.getItem('store'))
        }
    }

    async componentDidMount() {
        const response = await Axios.get('/product/' + this.state.productID);
        this.setState({
            productObject: response.data,
            name: response.data.name,
            descrption: response.data.descrption,
            image: response.data.image,
            qty: response.data.qty,
            price: response.data.price,
            status: response.data.status,
        })
    }

    async updateProduct() {
        Axios.put('/product/'+this.state.productObject._id, {
            name: this.state.name,
            descrption: this.state.descrption,
            image: this.state.image,
            qty: this.state.qty,
            price: this.state.price,
            status: this.state.status,
            storeid: this.state.store._id,
        })
            .then(function (response) {
                window.location = "/SalesManager/productList";
            })
            .catch(function (error) {
                console.log(error.data);
            });
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
                        <div className='col-8 offset-1'>
                            <center>
                                <h1 className='mt-4' style={{ fontWeight: "bold" }}>Update Product</h1>
                            </center>
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Product Name</label>
                                    <input type="text" class="form-control" id="text" required value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Product description</label>
                                    <textarea name="description" className='form-control' id="" cols="30" rows="5" value={this.state.descrption} onChange={(e) => this.setState({ descrption: e.target.value })}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Quantity</label>
                                    <input type="number" class="form-control" id="text" placeholder="0" required value={this.state.qty} onChange={(e) => this.setState({ qty: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Per Price</label>
                                    <input type="number" class="form-control" id="text" required value={this.state.price} onChange={(e) => this.setState({ price: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Product Image Link</label>
                                    <input type="text" class="form-control" id="text" required value={this.state.image} onChange={(e) => this.setState({ image: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Status</label>
                                    <select name="status" className='form-control' id="" onChange={(e) => this.setState({ status: e.target.value })}>
                                        <option value="active">Active</option>
                                        <option value="deactive">Deactive</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Store</label>
                                    <input type="text" class="form-control" id="text" value={this.state.store.name} readOnly required />
                                </div>
                                <br />
                                <button type="button" className='btn btn-primary col-12' onClick={async () => { await this.updateProduct(); }}>ADD</button>
                                <br></br>
                                <button type="submit" className='btn btn-danger col-12'>Cancel</button>
                            </form>


                        </div>
                    </div>
                </div >
            </div>
        );
    }
}

export default UpdateProduct;

