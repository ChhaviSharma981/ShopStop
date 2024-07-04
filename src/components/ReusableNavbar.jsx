import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../components/styles/ReusableNavbar.css";
import SearchBar from "./Search/SearchBar";
import { useState } from "react";
import { SearchResults } from "./Search/SearchResultsList";
// import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from 'react-bootstrap/Dropdown';
// import 'bootstrap/dist/css/bootstrap.min.css'; 
// import 'bootstrap/dist/js/bootstrap.bundle.min';
import './navbar.css' 

function ReusableNavbar() {
  const [results, setResults] = useState([]);

  return (
    <Navbar expand="lg" className="bg-body-tertiary" style={{ backgroundColor:"#0056b3" }} >
      <Container fluid>
        <Navbar.Brand href="#" style={{color:"white"}}>ShopStop</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
            align="right"
          >
            <ul>
            <li><Nav.Link href="/" style={{color:"white"}}>Home</Nav.Link></li>
            <li><Nav.Link href="/products" style={{color:"white"}}>Products</Nav.Link></li>
            <li><Nav.Link href="/login" style={{color:"white"}}>Login</Nav.Link></li>
            {/* <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/seller">Register a Seller</Nav.Link> */}
            <li><Nav.Link href="/products/cart" style={{color:"white"}}>Cart</Nav.Link></li>
            <li><Nav.Link href="/user" style={{color:"white"}}>User</Nav.Link></li>
            <li><Dropdown>
            <Dropdown.Toggle variant="light" id="account-dropdown" style={{color:"white", backgroundColor:"#0056b3"  }} >
             Register
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href='/register' style={{ color: "black", fontSize: "14px" }}>Customer Register</Dropdown.Item>
              <Dropdown.Item href='/Seller' style={{ color: "black", fontSize: "14px" }}>Seller Register</Dropdown.Item> 
            </Dropdown.Menu>
          </Dropdown></li>

          <li><SearchBar className="search-bar" setResults={setResults} /></li>
            <li><SearchResults results={results} /></li>
            </ul>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default ReusableNavbar;
