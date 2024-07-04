import React from 'react';
import '../styles/singleProduct.css';
import Axios from 'axios';
import ReusableNavbar from '../ReusableNavbar';
var cartItem = [];

const styles = {
    background: 'linear-gradient(35deg, rgba(27,22,108,1) 0%, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 79%)',
};

class AffiliateSingleProduct extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            productObject: Object,
            productID: window.location.href.split('/')[5],
            affiliateID: window.location.href.split('/')[6],
            reviewList: []
        }
        const response_aff = Axios.get('/product/affiliate/count/' + this.state.affiliateID);
    }

    async componentDidMount() {
        const response = await Axios.get('/product/' + this.state.productID);
        this.setState({ productObject: response.data })

        try {
            const responseReview = await Axios.get('/product/review/' + this.state.productID);
            this.setState({ reviewList: responseReview.data })
        } catch (error) {
            this.setState({ reviewList: [] })
        }
        cartItem = JSON.parse(localStorage.getItem('cart'));
        if (cartItem == null) {
            cartItem = [];
        }
    }



    async addToCart(id, qtyValue) {
        try {
            const response = await Axios.get('/product/' + id);

            if (this.checkArray(response.data)) {
                var index = this.checkIndexInArray(response.data);
                cartItem[index] = { product: response.data, qty: (cartItem[index].qty + 1) }
            } else {
                cartItem.push({ product: response.data, qty: qtyValue })
            }
            localStorage.setItem('cart', JSON.stringify(cartItem));
        } catch (error) {
            return [];
        }
        window.location = '/products/cart';
    }

    checkArray(productOBJ) {
        var status = false;
        cartItem = JSON.parse(localStorage.getItem('cart'));
        if (cartItem == null) {
            cartItem = [];
        }
        for (var i = 0; i < cartItem.length; i++) {
            if (cartItem[i].product._id == productOBJ._id) {
                status = true;
                break;
            }
        }
        return status;
    }

    checkIndexInArray(productOBJ) {
        var i = 0;
        var index = 0;
        cartItem = JSON.parse(localStorage.getItem('cart'));
        if (cartItem == null) {
            cartItem = [];
        }
        console.log(cartItem);
        for (var i = 0; i < cartItem.length; i++) {
            if (cartItem[i].product._id == productOBJ._id) {
                index = i;
                break;
            }
        }
        return index;
    }

    render() {
        return (
            <div style={{backgroundColor:"white"}}>
                <ReusableNavbar/>
                

                <center><span className='text-white' style={{ fontSize: "40px", fontWeight: "bold", }}>{this.state.productObject.name}</span></center>
                <hr style={{ backgroundColor: "white" }} />
                <div className="container" >
                    <div className="row d-flex justify-content-center " >
                        <div className="col-md-10">
                            <div className="card">
                                <div className="row">
                                    <div className="col-md-6">
                                        <img src="https://i.imgur.com/Dhebu4F.jpg" className='col-12 mt-5' />
                                    </div>
                                    <div className="col-md-6">
                                        <div className="product p-4">

                                            <div className="mt-4 mb-3">
                                                <h5 className="text-uppercase">{this.state.productObject.name}</h5>
                                                <center> <span className="act-price align-items-center" style={{ textAlign: "center" }}>Available stock : {this.state.productObject.qty}</span>
                                                </center>
                                            </div>
                                            <p className="about">Shop from a wide range of t-shirt from orianz. Pefect for your everyday use, you could pair it with a stylish pair of jeans or trousers complete the look.</p>
                                            <div className="sizes mt-3">
                                                <br /><h4 class="price">Price: <span>Rs.{this.state.productObject.price}.00</span></h4>
                                            </div>
                                            <div className="cart mt-4 align-items-center"> <button className="btn btn-danger text-uppercase mr-2 px-4" onClick={async () => { await this.addToCart(this.state.productObject._id, 1); }} >Buy Now</button> <i className="fa fa-heart text-muted"></i> <i className="fa fa-share-alt text-muted"></i> </div>
                                        </div>
                                    </div>
                                    <h3 class="product-title2 mt-5 mb-2">Reviews</h3>
                                    {this.state.reviewList.map((review) => (
                                        <div class="details col-12 mb-3" style={{ backgroundColor: "#fff", fontSize: "18px", marginTop: "10px", marginBottom: "10px" }}>
                                            <spam className="mt-2 mb-2">{review.review}</spam>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div >
        );
    }

}

export default AffiliateSingleProduct;
