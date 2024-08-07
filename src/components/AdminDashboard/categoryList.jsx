import React from 'react';
import '../styles/login.css';
import Axios from 'axios';

class CategoryList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataList: []
        }
    }

    async componentDidMount() {
        this.setState({ dataList: await this.getAllCato() });
    }

    async getAllCato() {
        try {
            const response = await Axios.get('/product/cato/all');
            return response.data;
        } catch (error) {
            return [];
        }
    }

    render() {
        return (

            <div>
                <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow" style={{ height: "65px" }}>
                    <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">Admin Dashboard</a>
                    <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="navbar-nav">
                        <div className="nav-item text-nowrap">
                            <a className="nav-link px-3" href="#=/">Sign out</a>
                        </div>
                    </div>
                </header>
                <div className="container-fluid">
                    <div className="row">
                        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-body-tertiary sidebar collapse" style={{ backgroundColor: "rgb(242 243 244)" }}>
                            <div className="position-sticky pt-3 sidebar-sticky">
                                <ul className="nav flex-column" style={{ height: "800px" }}>
                                    <li className="nav-item" >
                                        <a className="nav-link active text-dark" aria-current="page" href="/AdminDashboard/addStores">
                                            <span data-feather="home" className="align-text-bottom"></span>
                                            Verify Stores
                                        </a>
                                        <hr style={{ color: "white" }} />
                                    </li>

                                    <li className="nav-item" >
                                        <a className="nav-link active text-dark" aria-current="page" href="/AdminDashboard/user">
                                            <span data-feather="home" className="align-text-bottom"></span>
                                            Users List
                                        </a>
                                        <hr style={{ color: "white" }} />
                                    </li>

                                    <li className="nav-item" >
                                        <a className="nav-link active text-dark" aria-current="page" href="/AdminDashboard/admin">
                                            <span data-feather="home" className="align-text-bottom"></span>
                                            Verify Product
                                        </a>
                                        <hr style={{ color: "white" }} />
                                    </li>

                                    <li className="nav-item" >
                                        <a className="nav-link active text-dark" aria-current="page" href="/AdminDashboard/addCato">
                                            <span data-feather="home" className="align-text-bottom"></span>
                                            Add Category
                                        </a>
                                        <hr style={{ color: "white" }} />
                                    </li>

                                    <li className="nav-item" >
                                        <a className="nav-link active text-dark" aria-current="page" href="/AdminDashboard/catoList">
                                            <span data-feather="home" className="align-text-bottom"></span>
                                            Category List
                                        </a>
                                        <hr style={{ color: "white" }} />
                                    </li>
                                </ul>
                            </div>
                        </nav>

                        <div class="container">
                            <center>
                                <h1 className='mt-4' style={{ fontWeight: "bold" }}>Category List</h1>
                            </center>
                            <div class="col-lg-12 table-responsive">
                                <table class="table table-light table-borderless table-hover text-center mb-0">
                                    <thead class="thead-dark col-12" >
                                        <tr>
                                            <th>Category ID</th>
                                            <th>Category Name</th>
                                        </tr>
                                    </thead>
                                    <tbody class="align-middle">
                                        {this.state.dataList.map((cato) => (
                                            <tr>
                                                <td>{cato._id} </td>
                                                <td>{cato.name}</td>
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

export default CategoryList;

