import React, { useState } from 'react';

import { BsFacebook } from 'react-icons/bs';
import { AiFillInstagram } from 'react-icons/ai';
import { AiFillTwitterCircle } from 'react-icons/ai';
const Cta = () => {
    const [count, setCount] = useState(1400000)

    return (
        <section className='landing-about-section py-3'>



            <div className="outer-grid">
                <div className="inner-grid">
                    <a href="#"><img src='./images/gandhi.png' /></a>

                </div>
                <div className="inner-grid">
                    <a href="#">   <img src='./images/azaadi.png' /></a>

                </div>

            </div>
            <div className="row container">

                <div className="footerPart">
                    <h5 style={{ color: '#000' }}>
                        &copy; 2020 FPCI. All Rights Reserved
                    </h5>


                    <h5 style={{ color: '#000' }}>
                        {count}
                    </h5>
                    {/* <Odometer value={1234} format="(.ddd),dd" />; */}

                    <div className="follow-us">
                        <h4 className='follow-head'>Follow Us</h4>

                        <span className='follow-icon1'>
                            <BsFacebook />
                        </span>
                        <span className='follow-icon'>

                            <AiFillInstagram />
                        </span>
                        <span className='follow-icon'>

                            <AiFillTwitterCircle />
                        </span>
                    </div>
                </div>
            </div>



        </section>
    )
}

export default Cta