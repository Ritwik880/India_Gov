import React from 'react'
import styled from 'styled-components'
const Notification = () => {
    const Section = styled.section`
        display: flex;
        justify-content: center;
        align-items: center;
    `
    const Heading = styled.h1`
        font-weight: 400;
    `
    const Ul = styled.ul`
    padding-left: 0rem;
    `
    return (
        <>
            <Section>
                <div className="row container">
                    <div className="p-5 mb-4 bg-light rounded-3">
                        <div className="container-fluid py-5">
                            <Heading className="display-5 fw-bold">Notifications</Heading>
                            <Ul>
                                <li>Guidelines for Cluster Development Programme of NHB & List of Clusters Identified</li>
                                <li>Guidelines for Cluster Development Programme of NHB & List of Clusters Identified</li>
                                <li>Guidelines for Cluster Development Programme of NHB & List of Clusters Identified</li>
                                <li>Guidelines for Cluster Development Programme of NHB & List of Clusters Identified</li>
                            </Ul>
                        </div>
                    </div>
                </div>
            </Section>
        </>
    )
}

export default Notification