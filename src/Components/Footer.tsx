import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const Footer = () => {




    return (
        <>
            <footer className='footer'>
                <div className="row container">
                    <div className='footerItems'>
                        <a className='footerLinkTag' href="#">Web Policies</a>
                        <a className='footerLinkTag' href="#">visitior analytics</a>
                        <a className='footerLinkTag' href="#">Contact Us</a>
                        <a className='footerLinkTag' href="#">Follow Us</a>
                        <a className='footerLinkTag' href="#">Copyright</a>
                        <a className='footerLinkTag' href="#">Privacy</a>
                        <a className='footerLinkTag' href="#">Terms & Conditions</a>
                        <a className='footerLinkTag' href="#">
                            <Link to='/refund-policy'>
                                Refund
                            </Link>
                        </a>
                    </div>

                </div>
            </footer>
        </>
    )
}

export default Footer