import React from 'react'
import styled from 'styled-components';
import { BUTTONDATA as data } from '../../utils/constants';
const Notification = () => {
    const H1 = styled.h1`
    font-size: 2rem;
        
    `

    return (
        <>

            <section className='noti'>
                {/* <ButtonMap /> */}
                <div className='mapButtons'>
                    {
                        data.map((item, i) => {
                            return (
                                <button key={i} className='mapData'>
                                    {item.title}
                                </button>
                            )
                        })
                    }

                </div>

                <div className="box">
                    <div className="head">
                        <H1> What's new</H1>
                    </div>
                    <div className="text">
                        <p className='textPara'>No Notification Found!</p>
                    </div>
                </div>

            </section>
        </>
    )
}

export default Notification