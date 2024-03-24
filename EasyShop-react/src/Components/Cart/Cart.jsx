import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./Cart.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import TableRow from "./TableRow";
import { removeAllFromCart } from "../../redux/Actions/action";

export async function getCart() {
    const response = await axios.get(`http://127.0.0.1:8000/api/get-cart`);
    return response.data;
}

export default function Cart() {
    const cartItems = useSelector((state) => state.cartItems); // Accessing cart items from Redux store

    let subtotal = 0;
    // Calculate subtotal
    cartItems.forEach((item) => {
        subtotal += item.price * item.quantity;
    });
    const [cartProduct, setCartProduct] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const storedCart = JSON.parse(sessionStorage.getItem("cartState"));
        if (storedCart) {
            setCartProduct(storedCart.cartItems);
        }
    }, []);

    const handleRemoveAll = () => {
        dispatch(removeAllFromCart());
    };

    return (
        <>
            (
            <Fragment>
                <div className="container text-center">
                    <h1 className="mt-5 mb-5">My Shopping Cart</h1>
                    <div className="row">
                        <div className="col-md-7">
                            <div className="card">
                                <table>
                                    <thead className="text-start border">
                                        <tr>
                                            <th
                                                style={{
                                                    width: "40%",
                                                    paddingLeft: "100px",
                                                }}
                                            >
                                                PRODUCT
                                            </th>
                                            <th
                                                style={{
                                                    paddingLeft: "70px",
                                                }}
                                            >
                                                PRICE
                                            </th>
                                            <th
                                                style={{
                                                    paddingLeft: "50px",
                                                }}
                                            >
                                                QUANTITY
                                            </th>
                                        </tr>
                                    </thead>
                                    {cartItems.map((cartItem, index) => (
                                        <TableRow
                                            cartItem={cartItem}
                                            key={index}
                                        />
                                    ))}
                                </table>
                                <div
                                    className={`${style.cartFooter} card-footer d-flex justify-content-between`}
                                >
                                    <Link
                                        to="/products"
                                        className={`${style.cartButton} rounded-5`}
                                    >
                                        Return to shop
                                    </Link>
                                    <button
                                        className={`${style.cartButton} rounded-5`}
                                        onClick={handleRemoveAll}
                                    >
                                        Clear Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="text-start mb-4">
                                        Cart Total
                                    </h5>
                                    <div
                                        className={`${style.cartText} text-start d-flex justify-content-between`}
                                    >
                                        <h6>Subtotal:</h6>
                                        <h6>{subtotal}$</h6>
                                    </div>
                                    <hr />
                                    {/* TODO: set shipping fee dynamically */}
                                    <div
                                        className={`${style.cartText} text-start d-flex justify-content-between`}
                                    >
                                        <h6>Shipping:</h6>
                                        <h6>Free</h6>
                                    </div>
                                    <hr />
                                    <div
                                        className={`${style.cartText} text-start d-flex justify-content-between`}
                                    >
                                        <h5>Total:</h5>
                                        <h5>{subtotal}$</h5>
                                    </div>
                                    <button
                                        className={`${style.mainColor} btn btn-primary w-100 rounded-5 mt-3`}
                                    >
                                        Proceed to checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7 mt-3">
                            <div className="card">
                                <div className="card-body mt-3">
                                    <form>
                                        <div className="input-group mb-3">
                                            <h5 className="mt-2">
                                                Coupon Code
                                            </h5>
                                            <input
                                                type="text"
                                                className="form-control rounded-5 ms-2 "
                                                placeholder="Enter coupon code"
                                                name="coupon"
                                            />
                                            <input
                                                type="text"
                                                hidden
                                                name="total_price"
                                            />
                                            <button
                                                className={`${style.coupon} rounded-5 text-white ms-2 p-2`}
                                                type="submit"
                                            >
                                                Apply coupon
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
            ) ;
        </>
    );
}
