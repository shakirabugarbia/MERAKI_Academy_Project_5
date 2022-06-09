import { useNavigate } from "react-router-dom";
import { addOrder, setItems, setId } from "../../redux/reducers/order";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

const ViewTable = () => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => {
    return {
      order: state.order.order,
      items: state.order.items,
      id: state.order.id,
    };
  });
  const navigate = useNavigate();
  const getOrders = () => {
    axios
      .get(`http://localhost:5000/order/users/${orderState.id}`)
      .then((result) => {
        console.log(result.data.result);
        dispatch(addOrder(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getOrders();
    return () => {
      dispatch(addOrder([]));
    };
  }, []);
  return (
    <div className="views">
      <div>
        <table>
          {" "}
          <tr>
            <th>order date</th>
            <th>productName</th>
            <th>price</th>
            <th>amount</th>
          </tr>
          {orderState.order.length &&
            orderState.order.map((element, index) => {
              return (
                <>
                  {JSON.parse(element.ORDERhisory).map((elements, indexs) => {
                    return (
                      <tr key={index}>
                        <td>{element.orderdate}</td>
                        <td>{elements.productName} </td>
                        <td> {elements.price}JD</td>
                        <td> {elements.amount}</td>
                      </tr>
                    );
                  })}
                </>
              );
            })}
        </table>
      </div>
      <button className="back"
        onClick={() => {
          navigate("/UserAdminPanel");
        }}
      >
        Back to user AdminPanel
      </button>
    </div>
  );
};

export default ViewTable;
