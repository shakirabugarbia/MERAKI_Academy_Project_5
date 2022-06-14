import {
  addOrder,
  setItems,
  setId,
  setrecipteId,
} from "../../redux/reducers/order";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import "./style.css";

import ReactToPrint from "react-to-print";

const UserOrder = () => {
  const componentRef = useRef();
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const navigate = useNavigate();

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

  const getOrders = async () => {
    await axios
      .get("http://localhost:5000/order", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result.data.result);
        setShow(true);
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
    <div className="USER-HISTORY">
      <h2 className="userss">user history</h2>
      <div>
        <ReactToPrint
          trigger={() => <button>Print this out!</button>}
          content={() => componentRef.current}
        />
        <table className="tabells" ref={componentRef}>
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
                      <tr key={indexs}>
                        <td
                          className="orderdate"
                          onClick={() => {
                            console.log(element.id);
                            navigate("/myrecepits");
                            dispatch(setrecipteId(element.id));
                          }}
                        >
                          {element.orderdate}
                        </td>

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
      <button
        onClick={() => {
          navigate("/basket");
        }}
      >
        Back
      </button>
    </div>
  );
};
export default UserOrder;
