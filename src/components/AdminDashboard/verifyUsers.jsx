import React from "react";
import "../styles/login.css";
import Axios from "axios";

class VerifyUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
    };
  }

  async componentDidMount() {
    this.setState({ dataList: await this.getAllUsers() });
  }

  async getAllUsers() {
    try {
      const response = await Axios.get("/user");
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async updateStatus(id, status) {
    Axios.put("/profile/" + id, {
      state: status,
    })
      .then(function (response) {
        window.location = "/AdminDashboard/user";
      })
      .catch(function (error) {
        console.log(error.data);
      });
  }

  render() {
    return (
      <div>
        <header
          className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow"
          style={{ height: "65px" }}
        >
          <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">
            Admin Dashboard
          </a>
          <button
            className="navbar-toggler position-absolute d-md-none collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#sidebarMenu"
            aria-controls="sidebarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="navbar-nav">
            <div className="nav-item text-nowrap">
              <a className="nav-link px-3" href="/">
                Sign out
              </a>
            </div>
          </div>
        </header>
        <div className="container-fluid">
          <div className="row">
            <nav
              id="sidebarMenu"
              className="col-md-3 col-lg-2 d-md-block bg-body-tertiary sidebar collapse"
              style={{ backgroundColor: "rgb(242 243 244)" }}
            >
              <div className="position-sticky pt-3 sidebar-sticky">
                <ul className="nav flex-column" style={{ height: "800px" }}>
                  <li className="nav-item">
                    <a
                      className="nav-link active text-dark"
                      aria-current="page"
                      href="/AdminDashboard/addStores"
                    >
                      <span
                        data-feather="home"
                        className="align-text-bottom"
                      ></span>
                      Verify Stores
                    </a>
                    <hr style={{ color: "white" }} />
                  </li>

                  <li className="nav-item">
                    <a
                      className="nav-link active text-dark"
                      aria-current="page"
                      href="/AdminDashboard/user"
                    >
                      <span
                        data-feather="home"
                        className="align-text-bottom"
                      ></span>
                      Users List
                    </a>
                    <hr style={{ color: "white" }} />
                  </li>

                  <li className="nav-item">
                    <a
                      className="nav-link active text-dark"
                      aria-current="page"
                      href="/AdminDashboard/admin"
                    >
                      <span
                        data-feather="home"
                        className="align-text-bottom"
                      ></span>
                      Verify Product
                    </a>
                    <hr style={{ color: "white" }} />
                  </li>

                  <li className="nav-item">
                    <a
                      className="nav-link active text-dark"
                      aria-current="page"
                      href="/AdminDashboard/addCato"
                    >
                      <span
                        data-feather="home"
                        className="align-text-bottom"
                      ></span>
                      Add Category
                    </a>
                    <hr style={{ color: "white" }} />
                  </li>

                  <li className="nav-item">
                    <a
                      className="nav-link active text-dark"
                      aria-current="page"
                      href="/AdminDashboard/catoList"
                    >
                      <span
                        data-feather="home"
                        className="align-text-bottom"
                      ></span>
                      Category List
                    </a>
                    <hr style={{ color: "white" }} />
                  </li>
                </ul>
              </div>
            </nav>

            <div class="container">
              <center>
                <h1 className="mt-4" style={{ fontWeight: "bold" }}>
                  Users List
                </h1>
              </center>
              <div class="col-lg-12 table-responsive">
                <table class="table table-light table-borderless table-hover text-center mb-0">
                  <thead class="thead-dark col-12">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Contact</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Option</th>
                    </tr>
                  </thead>
                  <tbody class="align-middle">
                    {this.state.dataList.map((user) => (
                      <tr>
                        <td>{user.name} </td>
                        <td>{user.email}</td>
                        <td>{user.phone} </td>
                        <td>{user.role} </td>
                        <td>{user.state}</td>
                        {user.state === "active" && (
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={async () => {
                                await this.updateStatus(user._id, "deactive");
                              }}
                            >
                              {" "}
                              Deactive User{" "}
                            </button>
                          </td>
                        )}
                        {user.state === "deactive" && (
                          <td>
                            <button
                              className="btn btn-success"
                              onClick={async () => {
                                await this.updateStatus(user._id, "active");
                              }}
                            >
                              {" "}
                              Active User{" "}
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VerifyUsers;
