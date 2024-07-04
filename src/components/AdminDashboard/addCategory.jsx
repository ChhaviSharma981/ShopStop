import React from "react";
import "../styles/login.css";
import Axios from "axios";

class AddCato extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      dataList: [],
    };
  }

  async componentDidMount() {
    this.setState({ dataList: await this.getAllCato() });
  }

  async getAllCato() {
    try {
      const response = await Axios.get("/product/cato/all");
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async addCato() {
    Axios.post("/product/cato/", {
      name: this.state.name,
    })
      .then(function (response) {
        window.location = "/AdminDashboard/addCato";
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
            <div className="col-8 offset-1">
              <center>
                <h1 className="mt-4" style={{ fontWeight: "bold" }}>
                  {" "}
                  Add category{" "}
                </h1>
              </center>
              <form>
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    id="text"
                    placeholder=""
                    required
                    onChange={(e) => this.setState({ name: e.target.value })}
                  />
                </div>

                <br />
                <button
                  type="button"
                  className="btn btn-primary col-12"
                  onClick={async () => {
                    await this.addCato();
                  }}
                >
                  ADD
                </button>
                <br></br>
                <button type="reset" className="btn btn-danger col-12">
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddCato;
