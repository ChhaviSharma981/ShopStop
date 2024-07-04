import React from 'react';
import '../styles/login.css';
import Axios from 'axios';

class ViewStat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user')),
            dataList: []
        }
    }

    async componentDidMount() {
        this.setState({ dataList: await this.getAlllinks() });
    }

    async getAlllinks() {
        try {
            const response = await Axios.get('/product/affiliate/search/' + this.state.user.name);
            return response.data;
        } catch (error) {
            return [];
        }
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


                        <div class="container">
                            <center>
                                <h1 className='mt-4' style={{ fontWeight: "bold" }}>View Affliate Links</h1>
                            </center>
                            <div class="col-lg-12 table-responsive">
                                <table class="table table-light table-borderless table-hover text-center mb-0">
                                    <thead class="thead-dark col-12" >
                                        <tr>
                                            <th>Product Name</th>
                                            <th>Affiliate Code</th>
                                            <th>View Count</th>
                                        </tr>
                                    </thead>
                                    <tbody class="align-middle">

                                        {this.state.dataList.map((link) => (
                                            <tr>
                                                <td>{link.product_name} </td>
                                                <td>{link.affiliate_code}</td>
                                                <td>{link.count} </td>
                                            </tr>
                                        ))}

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

export default ViewStat;

