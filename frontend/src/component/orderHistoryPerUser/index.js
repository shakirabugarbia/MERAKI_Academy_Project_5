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
    return()=>{
      dispatch(addOrder([]))
    }
  }, []);

  return (
    <div>
      <h2>user history</h2>
      <div>
        {orderState.order.length &&
          orderState.order.map((element, index) => {
            return (
              <div key={index}>
                <div>order date : {element.orderdate}</div>
                <div>
                  {console.log(JSON.parse(element.ORDERhisory))}
                  {JSON.parse(element.ORDERhisory).map((elements, indexs) => {
                    return (
                      <div key={indexs} id={indexs}>
                        food class:{elements.productName} , price:{" "}
                        {elements.price}, amount : {elements.amount}
                      </div>
                    );
                  })}
                </div>
                ----------
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default UserOrder;
// "orderdate":
