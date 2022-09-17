import React from 'react'
import Cta from './Cta'
import { BsFacebook } from 'react-icons/bs';
import { AiFillInstagram } from 'react-icons/ai';
import { AiFillTwitterCircle } from 'react-icons/ai'
const Follow = () => {
    return (
        <>
            <div className="pb-6 d-flex align-items-center refund-page">


                <div className="container d-flex align-items-center">
                    <div className="text-white mx-auto mt-5 upper">
                    </div>
                </div>
            </div>
            <section className='refundSection'>
                <div className="row container">
                    <h1 className='refundHead'>Follow Us</h1>
                    <div>
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
            </section>
            <Cta />
        </>
    )
}

export default Follow