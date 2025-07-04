import axios from "axios";
import React from "react";
import BASE_URL from "../utils/constansts";

function Premium() {
  const handleBuyClick = async (type) => {
    try {
      const order = await axios.post(
        BASE_URL + "/payment/create",
        {
          membershipType: type,
        },
        { withCredentials: true }
      );
      console.log("order is", order)
      const { orderId, amount, currency, notes} = order.data.data;
      console.log(notes)

      const options = {
        key: 'rzp_test_6Mf2ERmSrv7Su2', 
        amount, 
        currency,
        name: 'DevTinder',
        description: 'transaction to get premium membership',
        order_id: orderId, // This is the order_id created in the backend
        prefill: {
          name: notes.firstName ,
          email:notes.email,
          contact: '6306456347'
        },
        theme: {
          color: '#F37254'
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error) {}
  };
  return (
    <div className="p-[8%]">
      <div className="flex w-full">
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
          <h1 className="text-3xl font-bold">Gold Membership</h1>
          <ul>
            <li>- Chat with other people</li>
            <li>- 100 connection Requests per day</li>
            <li>- Blue Tick</li>
            <li>- 3 months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("Silver")}
            className="btn btn-secondary"
          >
            Buy Silver
          </button>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
          <h1 className="text-3xl font-bold">Gold Membership</h1>
          <ul>
            <li>- Chat with other people</li>
            <li>- Inifinye connection Requests per day</li>
            <li>- Blue Tick</li>
            <li>- 6 months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("Silver")}
            className="btn btn-primary"
          >
            Buy Gold
          </button>
        </div>
      </div>
    </div>
  );
}

export default Premium;
