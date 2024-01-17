import React, { useState } from 'react'
import { BiCoffee } from 'react-icons/bi';

const DashboardComponents = () => {
    const [dropdownState, setDropdownState] = useState({ open: false });
    const handleDropdownClick = () =>
 setDropdownState({ open: !dropdownState.open });

 
  return (
    <>
    <div className='dashboard_header'>
        <div className='dashboard_title'>
            <h1>Dashboard</h1>
            <p>Welcome to Davur Admin!</p>
        </div>
        <div className='dropdown_T'>
            <button type="button" className="button"
            onClick={handleDropdownClick}
            >
                Filter Period
            <p>
                {'4 june 2023 - 4 july 2023'}
            </p>
            </button>
            {
                dropdownState.open && (
                    <div className='items_ul'>
                        <ul>
                            <li>{'4 july 2023 - 4 Aug 2023'}</li>
                            <li>{'4 Aug 2023 - 4 Sep 2023'}</li>
                
                        </ul>
                    </div>         
            )}
        </div>
    </div>

    <div className='cards_container'>
        <div className='card'>
            <BiCoffee size={70} className='card__icon'/>
            <div className='numbers'>
                <span>{"47"}</span>
                <p>Total menus</p>
            </div>
        </div>
        <div className='card'>
            <BiCoffee size={70} className='card__icon'/>
            <div className='numbers'>
                <span>{"12K"}</span>
                <p>Total Revenue</p>
            </div>
        </div>
        <div className='card'>
            <BiCoffee size={70} className='card__icon'/>
            <div className='numbers'>
                <span>{"20"}</span>
                <p>Total Orders</p>
            </div>
        </div>
        <div className='card'>
            <BiCoffee size={70} className='card__icon'/>
            <div className='numbers'>
                <span>{"40"}</span>
                <p>Total Clients</p>
            </div>
        </div>

    </div>
    </>

  )
}

export default DashboardComponents
