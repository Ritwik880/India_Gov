import React from 'react'
import { Link } from 'react-router-dom';
const Footer = () => {
    return (

        <footer className='footer'>
            <div className="row container">
                <div className='footerItems'>

                    <Link to='/web-policy' className='linkFooterItem'>
                        Web Policies
                    </Link>

                    <Link to='/visitor-analytics' className='linkFooterItem'>
                        Visitior Analytics

                    </Link>

                    <Link to='/contact' className='linkFooterItem'>
                        Contact Us
                    </Link>

                    <Link to='/follow-us' className='linkFooterItem'>
                        Follow Us
                    </Link>

                    <Link to='/copyright' className='linkFooterItem'>
                        Copyright
                    </Link>


                    <Link to='/privacy-policy' className='linkFooterItem'>
                        Privacy
                    </Link>


                    <Link to='/terms-condition' className='linkFooterItem'>
                        Terms & Conditions
                    </Link>


                    <Link to='/refund-policy' className='linkFooterItem'>
                        Refund
                    </Link>

                </div>

            </div>
        </footer>

    )
}

export default Footer