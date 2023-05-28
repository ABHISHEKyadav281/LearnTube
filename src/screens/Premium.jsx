import React, { useState } from 'react';
import Logoi from '../utils/logo1.png';
import axios from 'axios'
import { useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';

export default function Premium() {
  const nevigate=useNavigate()
  // const {currentuser}=useSelector(state=>state.user);
  const [book, setbook] = useState({
    amount: 12900,
    currency: 'INR',
    name: 'LearnTube Premium',
    description: 'Premium Subscription',
    image: Logoi,
  })
  const initPayment = (data) => {
    const options = {
      key: 'rzp_test_r6EJwrxJbscSV9',
      amount: 12900,
      currency: 'INR',
      name: 'LearnTube Premium',
      description: 'Premium Subscription',
      image: Logoi,
      order_id: data.order_id,
      handler: async function (response) {
        try {
          // console.log(response)
          const verifyUrl = "http://localhost:8080/api/payment/verify";
          const { data } = await axios.post(verifyUrl, response);
        } catch (error) {
          console.log(error)
        }
      },
      theme: { color: '#5b4adb' },
    };
    const rzp = new window.Razorpay(options);
    rzp.open()
      nevigate('/trend')
    

  }


  const handelpayment = async () => {
    try {
      const orderUrl = "http://localhost:8080/api/payment/order";
      const { data } = await axios.post(orderUrl, { amount: book.price });
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div style={{ textAlign: "center" }}>
      <br /><br />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>

        <img src={Logoi} alt="" style={{ width: "55px", height: "55px", objectFit: "cover" }} />
        <h1 style={{ fontSize: "38px" }}>
          LearnTube Premium</ h1>
      </ div>
      <br />
      <p style={{ fontSize: "28px" }}>
        LearnTube adfree content,
        <br /> offline, and in the background</ p><br /><button style={{ borderRadius: "30px", border: "none", padding: "12px 25px", fonWeight: "500", fontSize: "20px", cursor: "pointer", backgroundColor: "#5b4adb", color: "white" }}
          onClick={handelpayment}> LearnTube premium</ button>
      <br /><p style={{ fontSize: "24px" }}> Prepaid and subscription plans available.Prices start at ₹129.00 / month.
        <br />Free trials available with subscription plans only.</ p>
      <br />
      <p style={{ fontSize: "18px" }}> Or save money with an annual, <span style={{ color: "blue" }}> family or student plan</ span></ p>
      <br /><span style={{ color: "blue" }}> Restrictions apply.Learn more here.</ span><br />

      {/* <div style={{display:"flex",alignItems:"center",justifyContent:"space-around"}}>
        <span>h</span>
        <span>h</span>
        <span>h</span>
       </div> */}
    </ div>)
}