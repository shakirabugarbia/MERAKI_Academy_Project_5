import { addOrder, setItems } from "../../redux/reducers/order";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import React, { useState, useEffect } from "react";
const UserOrder = () => {
  const [show, setShow] = useState(false);
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
    };
  });

  const getOrders = () => {
    axios
      .get("http://localhost:5000/order", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(addOrder(result.data.result));
        console.log(result.data.result);
        setShow(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getOrders();
  }, []);
  console.log("test", orderState.order);
  return (
    <div>
      <h2>user history</h2>
      <div>
        {show &&
          orderState.order[0].map((element, index) => {
            return (
              <div key={index}>
                <div>{element.orderdate}</div>
                <div>
                  {JSON.parse(element.ORDERhisory).map((elements, indexs) => {
                    return <div id={indexs}>{elements.productName}</div>;
                  })}
                </div>
                ----------
              </div>
            );
          })}
      </div>
      <div>{/* {orderState.items} */}</div>
    </div>
  );
};
export default UserOrder;
// "orderdate":
