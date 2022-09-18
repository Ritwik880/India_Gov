import React, { useState, useEffect } from 'react'
import Cta from './Cta'

const Visitor = () => {
    const [count, setCount] = useState(1400000);

    window.onload = (event) => {
        setCount(count + 500);
    };



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
                    <h1 className='refundHead'>Visitor Analytics</h1>
                    <h4 className='count'>
                        {count}
                    </h4>
                </div>

            </section>
            <Cta />
        </>
    )
}

export default Visitor