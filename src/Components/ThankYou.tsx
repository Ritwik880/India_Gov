import React from 'react'
import { useNavigate } from 'react-router-dom'

const ThankYou = () => {
    const navigate = useNavigate();
    return (
        <>
            <section className='thankyou_page'>
                <div className="row container">
                    <h1 className='thankyou_heading'>Thank You</h1>
                    <div className="thankyou_button_parent_div">
                        <button onClick={() => navigate('/')} className='thankyou_button'>Go Back</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ThankYou