import React from 'react'
import styled from 'styled-components'
const Notification = () => {
    const Section = styled.section`
        display: flex;
        justify-content: center;
        align-items: center;
        background: #c7ecee;
    `
    const H1 = styled.h1`
    font-size: 2rem;
        
    `

    return (
        <>
            <Section>

                <div className="box">
                    <div className="head">
                        <H1> What's new</H1>
                    </div>
                    <div className="text">
                        <p className='textPara'>No Notification Found!</p>
                    </div>
                </div>

            </Section>
        </>
    )
}

export default Notification