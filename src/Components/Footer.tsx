import React, { useState } from 'react'
import { Link } from 'react-router-dom';


const Footer = () => {
    const [count, setCount] = useState(1400000)

    return (

        <>
            {/* <section className='footerUper'>
                <div className="row container">

                  



                </div>

            </section> */}
            <footer className='footer'>
                <div className='row container'>
                    <div className='footerItems'>
                        <Link to='/' className='linkFooterItem'>
                            Disclaimer
                        </Link>

                        <Link to='/follow-us' className='linkFooterItem'>
                            Follow Us
                        </Link>

                        <Link to='/copyright' className='linkFooterItem'>
                            Copyright Policy
                        </Link>


                        <Link to='/privacy-policy' className='linkFooterItem'>
                            Privacy Policy
                        </Link>


                        <Link to='/terms-condition' className='linkFooterItem'>
                            Terms & Conditions
                        </Link>


                        <Link to='/refund-policy' className='linkFooterItem'>
                            Refund Policy
                        </Link>
                    </div>


                </div>
            </footer>
        </>

    )
}

export default Footer