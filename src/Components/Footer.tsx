import React from 'react'
import styled from 'styled-components'
const Footer = () => {
    const Footer = styled.footer`
        

    `
    const Div = styled.div`
       
    `
    const Anchor = styled.a`
        color: ${({ theme }) => theme.colors.color};
    `

    return (
        <>
            <footer className='footer'>
                <div className="row container">
                    <div className='footerItems'>
                        <Anchor href="#">Web Policies</Anchor>
                        <Anchor href="#">visitior analytics</Anchor>
                        <Anchor href="#">Contact Us</Anchor>
                        <Anchor href="#">Follow Us</Anchor>
                        <Anchor href="#">Copyright</Anchor>
                        <Anchor href="#">Privacy</Anchor>
                        <Anchor href="#">Terms & Conditions</Anchor>
                        <Anchor href="#">Refund</Anchor>
                    </div>

                </div>
            </footer>
        </>
    )
}

export default Footer