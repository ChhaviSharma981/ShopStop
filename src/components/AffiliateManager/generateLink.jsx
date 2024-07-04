import React from 'react';
import '../styles/login.css';
import Axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

class GenerateLink extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            name: "",
            code: "",
            link: "",
            product_name: "",
            user: JSON.parse(localStorage.getItem('user'))
        }
    }

    async componentDidMount() {
        this.setState({ products: await this.getAllproducts() });
    }

    async generateaffLink() {
        var codegen = uuidv4();
        var url = window.location.origin.toString() + "/products/AffliateSingleProduct/" + this.state.name + "/" + codegen;
        this.setState({ link: url });
        this.setState({ code: codegen });
    }

    async getAllproducts() {
        try {
            const response = await Axios.get('/product');
            return response.data;
        } catch (error) {
            return [];
        }
    }

    async getProductDetails(id) {
        try {
            console.log(id);
            const response = await Axios.get('/product/' + id);
            return response.data;
        } catch (error) {
            return [];
        }
    }


    async addCode() {
        var temp = await this.getProductDetails(this.state.name);
        console.log(temp);

        Axios.post('/product/affiliate', {
            product_id: this.state.name,
            product_name: temp.name,
            username: this.state.user.name,
            affiliate_code: this.state.code,
            count: 0
        })
            .then(function (response) {
                alert("link added")
            })
            .catch(function (error) {
                console.log(error.data);
            });
    }


    render() {
        return (

            <div>
                <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow" style={{ height: "65px" }}>
                    <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">Affiliate Dashboard</a>
                    <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="navbar-nav">
                        <div className="nav-item text-nowrap">
                            <a className="nav-link px-3" href="#">Sign out</a>
                        </div>
                    </div>
                </header>
                <div className="container-fluid">
                    <div className="row">
                        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-body-tertiary sidebar collapse" style={{ backgroundColor: "rgb(242 243 244)" }}>
                            <div className="position-sticky pt-3 sidebar-sticky">
                                <ul className="nav flex-column" style={{ height: "800px" }}>

                                    <li className="nav-item" >
                                        <a className="nav-link active text-dark" aria-current="page" href="/AffiliateDashboard/generateLinks">
                                            <span data-feather="home" className="align-text-bottom"></span>
                                            Create Affliate Link
                                        </a>
                                        <hr style={{ color: "white" }} />
                                    </li>

                                    <li className="nav-item" >
                                        <a className="nav-link active text-dark" aria-current="page" href="/AffiliateDashboard/view">
                                            <span data-feather="home" className="align-text-bottom"></span>
                                            View Affliate Link
                                        </a>
                                        <hr style={{ color: "white" }} />
                                    </li>

                                    <li className="nav-item" >
                                        <a className="nav-link active text-dark" aria-current="page" href="/user">
                                            <span data-feather="home" className="align-text-bottom"></span>
                                            Back to User Dashboard
                                        </a>
                                        <hr style={{ color: "white" }} />
                                    </li>

                                </ul>
                            </div>
                        </nav>
                        <div className='col-8 offset-1'>
                            <center>
                                <h1 className='mt-4' style={{ fontWeight: "bold" }}>Generate Affiliate Link</h1>
                            </center>
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Product Name</label>
                                    <select name="status" className='form-control' id="" onChange={(e) => this.setState({ name: e.target.value })}>
                                        {this.state.products.map((product) => (
                                            <option value={product._id}>{product.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <label className="form-label">Generated Link</label>
                                <p> <pre> {this.state.link} </pre></p>

                                <br />
                                <button type="button" className='btn btn-warning col-12 ' onClick={async () => { await this.generateaffLink(); }}>Generate Link</button>

                                <button type="button" className='btn btn-primary col-12 mt-3' onClick={async () => { await this.addCode(); }}>Save</button>
                                <br></br>
                                <button type="reset" className='btn btn-danger col-12'>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div >
            </div>
        );
    }
}

export default GenerateLink;

