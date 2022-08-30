import React from 'react'
import styled from 'styled-components'
const Footer = () => {
    const Footer = styled.footer`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 500px;
        background: ${({ theme }) => theme.colors.footer};
        color: ${({ theme }) => theme.colors.color};

        @media ${({ theme }) => theme.media.tab} {
            height: auto;
            
        }
    `
    const SubDiv = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 80%;
    `
    const Ul = styled.ul`
        padding-left: 0rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    `
    const Li = styled.li`
        border-bottom: 1px solid ${({ theme }) => theme.colors.color};
        width: 45%;
        cursor: pointer;
    `
    return (
        <>
            <Footer>
                <div className="row container">
                    <div className="col-lg-3 col-md-12">
                        <h2>Indian Government</h2>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt vitae molestiae sunt.</p>
                    </div>
                    <div className="col-lg-3 col-md-12">
                        <h2>Head Office</h2>
                        <p>Beta 1 H150, Noida Uttar Pradesh, 201310</p>

                    </div>
                    <div className="col-lg-3 col-md-12">
                        <h2>Opening Hours</h2>
                        <SubDiv>
                            <p>Monday-Friday:</p>
                            <p>10:00 AM - 5:00 PM</p>
                        </SubDiv>
                        <SubDiv>
                            <p>Saturday-Sunday:</p>
                            <p>Closed</p>
                        </SubDiv>

                    </div>
                    <div className="col-lg-3 col-md-12">
                        <h2>Useful Links</h2>

                        <Ul>
                            <Li>About Us</Li>
                            <Li>Contact Us</Li>
                            <Li>Career</Li>
                            <Li>Gallery</Li>
                            <Li>Login</Li>
                        </Ul>

                    </div>

                </div>
            </Footer>
        </>
    )
}

export default Footer