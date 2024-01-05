import React from 'react'
import { BsFillCupFill } from "react-icons/bs";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <>
      <div className='dash-bar'>
        <div className='dashboard'>
          <h2>Dashboard</h2>
          Welcome to Brewtopia Admin!
          <div className='Cardno'>
            <div className="card">
              <div className='card-icon'>
                <BsFillCupFill size={30} /></div>
              <div className='cardfield'>
                <div className='head-1'>56</div>
                TOTAL MENUS
              </div></div>
            <div className="card">
              <div className='card-icon'>
                <BsFillCupFill size={30} /></div>
              <div className='cardfield'>
                <div className='head-1'>12k</div>
                TOTAL REVENUE
              </div></div>
            <div className="card">
              <div className='card-icon'>
                <BsFillCupFill size={30} /></div>
              <div className='cardfield'>
                <div className='head-1'>20</div>
                TOTAL ORDERS
              </div></div>
            <div className="card">
              <div className='card-icon'>
                <BsFillCupFill size={30} /></div>
              <div className='cardfield'>
                <div className='head-1'>40</div>
                TOTAL CLIENTS
              </div></div>
          </div>
          <div className='summary'>
            <div className='order-sum'>
              <h2>Order Summary</h2>
              <p>lorem ipsum dolor sit amet, conset</p>
              <div className='order-card'>
                <div className="card">
                  <div className='cardfield'>
                    <div className='head-1'>25</div>
                    On Delivery
                  </div></div>
                <div className="card">

                  <div className='cardfield'>
                    <div className='head-1'>60</div>
                    Delivered
                  </div></div>
                <div className="card">
                  <div className='cardfield'>
                    <div className='head-1'>7</div>
                    Cancelled
                  </div></div>
              </div>
            </div>
            <div className='revenue'>
              <h2>Revenue</h2>
              <p>lorem ipsum dolor sit amet, conset</p>
              <div className='order-card'>
                <div className="card">
                  <div className='cardfield'>
                    <div className='head-1'>25K</div>
                    Last Month
                  </div></div>
                <div className="card">

                  <div className='cardfield'>
                    <div className='head-1'>60K</div>
                    Last 2nd
                  </div></div>
                <div className="card">
                  <div className='cardfield'>
                    <div className='head-1'>7L</div>
                    Last year
                  </div></div>
              </div>
            </div></div></div>
      </div></>
  )
}
