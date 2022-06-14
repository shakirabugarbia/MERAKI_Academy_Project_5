import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactToPrint from "react-to-print";
import axios from "axios";
import "./style.css";

import {
  addOrder,
  setItems,
  setId,
  setrecipteId,
} from "../../redux/reducers/order";

const Recepit = () => {
  const navigate = useNavigate();
  const componentRef = useRef();
  const dispatch = useDispatch();

  const { token, isLoggedIn } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
    };
  });

  const orderState = useSelector((state) => {
    return {
      order: state.order.order,
      items: state.order.items,
      id: state.order.id,
      recipteId: state.order.recipteId,
    };
  });

  const getOrderHistoryById = () => {
    axios
      .get(`http://localhost:5000/order/orderid/11`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result.data.result);
        dispatch(addOrder(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getOrderHistoryById();
    console.log(orderState.recipteId);
  }, []);

  return (
    <div>
      <table className="tabells" ref={componentRef}>
        {" "}
        <tr>
          <th>ProductName</th>
          <th>Price</th>
          <th>Amount</th>
        </tr>
        {orderState.order.length &&
          orderState.order.map((element, index) => {
            return (
              <>
                {JSON.parse(element.ORDERhisory).map((elements, indexs) => {
                  return (
                    <tr key={indexs}>
                      <td>{elements.productName} </td>
                      <td>{elements.price} JD</td>
                      <td>{elements.amount}</td>
                    </tr>
                  );
                })}
              </>
            );
          })}
      </table>
    </div>
  );
};

export default Recepit;
