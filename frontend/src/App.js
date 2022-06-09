import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Register } from "./component/register";
import { Login } from "./component/login";

import NavBar from "./component/navbar";
import Homepage from "./component/homepage";
import Basket from "./component/basket";
import SearchResult from "./component/searchResult";
import Admin from "./component/AdminPanale";
import Contact from "./component/contactUs";
import Footer from "./component/Footer";

import ProductsAdminSide from "./component/ProdusctsAdmin";
import UserAdminSide from "./component/UserAdmin";
import UserOrder from "./component/orderHistoryPerUser";

import Map from "./component/Map/map";
import PayPal from "./component/PayPal/PayPal";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import ViewTable from "./component/viewTable";


function App() {
  
  const initialOptions = {
    "client-id": "test",
    currency: "USD",
    intent: "capture",
    "data-client-token": "abc123xyz==",
};
  const [checkout, setCheckout] = useState(false);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path={"/register"} element={<Register />} />
        <Route path={"/"} element={<Homepage />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/search"} element={<SearchResult />} />
        <Route path={"/adminPanel"} element={<Admin />} />

        <Route path={"/basket"} element={<Basket />} />
        <Route path={"/contactUS"} element={<Contact />} />

        <Route path={"/ProductAdminPanel"} element={<ProductsAdminSide />} />
        <Route path={"/UserAdminPanel"} element={<UserAdminSide />} />
        <Route path={"/Userorder"} element={<UserOrder />} />

        <Route path={"/location"} element={<Map />} />

        <Route path={"/viewTable"} element={<ViewTable />} />

      </Routes>

      {checkout ? (
         <PayPalScriptProvider options={{ "client-id": "test" }}>
         <PayPalButtons style={{ layout: "horizontal" }} />
     </PayPalScriptProvider>
      ) : (
        <button
          onClick={() => {
            setCheckout(true);
          }}
        >
          Checkout
        </button>
      )}
      
      <Footer />
    </div>
  );
}

export default App;
