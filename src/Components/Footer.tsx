import React from 'react'
import styled from 'styled-components'
const Footer = () => {
    const Footer = styled.footer`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80px;
        background: ${({ theme }) => theme.colors.footer};
        color: ${({ theme }) => theme.colors.color};
        @media ${({ theme }) => theme.media.tab} {
            height: auto;
            
        }
    `
    const Div = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 3rem;
    `
    const Anchor = styled.a`
        color: ${({ theme }) => theme.colors.color};
    `

    return (
        <>
            <Footer>
                <div className="row container">
                    <Div>
                        <Anchor href="#">Web Policies</Anchor>
                        <Anchor href="#">visitior analytics</Anchor>
                        <Anchor href="#">Contact Us</Anchor>
                        <Anchor href="#">Follow Us</Anchor>
                        <Anchor href="#">Copyright</Anchor>
                        <Anchor href="#">Privacy</Anchor>
                        <Anchor href="#">Terms & Conditions</Anchor>
                        <Anchor href="#">Refund</Anchor>
                    </Div>

                </div>
            </Footer>
        </>
    )
}

export default Footer