import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import {
  setBasket,
  updateBasket,
  deleteFromBasket,
  addToBasket,
  setAmount,
  zeroPrice,
  setPrice,
  decreasePrice,
  zero,
  decrease,
  erase,
  erasePrice,
  renderPrice,
  renderamount,
} from "../../redux/reducers/basket/index";
import {
  addProductts,
  deleteproductts,
  updateproductts,
  setProducts,
  setProductName,
} from "../../redux/reducers/products/index";

// This values are the props in the UI

const currency = "USD";
const style = { layout: "vertical" };

function refreshPage() {
  window.location.reload(false);
}

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ currency, showSpinner }) => {
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  

  const { token, isLoggedIn } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
    };
  });

  const basketState = useSelector((state) => {
    return {
      basket: state.basket.basket,
      amount: state.basket.amount,
      price: state.basket.price,
    };
  });

  const productsState = useSelector((state) => {
    return {
      products: state.products.products,
      productName: state.products.productName,
    };
  });

  const viewBasket = () => {
    axios
      .get(`http://localhost:5000/basket/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        if (result.data.success) {
          dispatch(setProducts(result.data.result));
          
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const emptyBasket = () => {
    axios
      .delete(`http://localhost:5000/basket/empty`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        viewBasket();

        dispatch(zero());
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const orderToHistory = () => {
    const orderhisory = JSON.stringify(productsState.products);
    axios
      .post(
        "http://localhost:5000/order",
        { orderhisory },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        console.log(productsState.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, []);

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}

      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[basketState.price, currency, style]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: basketState.price,
                  },
                },
              ],
            })
            .then((orderId) => {
              // Your code here after create the order
              return orderId;
            });
        }}
        onApprove={function (data, actions) {
          return actions.order.capture().then(function () {
            // Your code here after capture the order
            emptyBasket();
            dispatch(zeroPrice());
            orderToHistory();
            refreshPage();
          });
        }}
      />
    </>
  );
};

export default function PayPal() {
  return (
    <div style={{ maxWidth: "750px", minHeight: "200px" }}>
      <PayPalScriptProvider
        options={{
          "client-id":
            "AS4P2ZWyXBSyVtK5f0LCagYT7wiCXGWb9X1bbCw4RNxi56eCmX5Ko42wYzFGy-mC6sIHfOnw59hb9cKZ",
          components: "buttons",
          currency: "USD",
        }}
      >
        <ButtonWrapper currency={currency} showSpinner={false} />
      </PayPalScriptProvider>
    </div>
  );
}
// export default ButtonWrapper;
