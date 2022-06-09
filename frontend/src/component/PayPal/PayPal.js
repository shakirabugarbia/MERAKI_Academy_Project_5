import React, { useEffect, useRef } from "react";

export default function PayPal() {
  const paypal = useRef();

  useEffect(() => {
    window.paypal
    .Buttons({
        createOrder : (data,actions,err)=>{
            return actions.order.create({
                intent :"CAPTURE",
                purchase_units:[
                    {
                        desciption :"Thanks For Ordering From BigBit",
                        amount :{
                            currency_code:"CAD",
                            value: 20.00,
                        }
                    }
                ]
            });
            
        },
        onApprove: async (data ,actions)=>{
            const order =await actions.oreder.capture();
            console.log(order);
        },
        onError :(err) =>{
            console.log(err);
        }
    })
    .render(paypal.current);
  }, []);
  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}
