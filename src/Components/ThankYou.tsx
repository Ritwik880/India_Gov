import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';



const ThankYou = () => {
    const navigate = useNavigate();
    const { state }: { state: any } = useLocation();
    const applicationId = state?.applicationId;
    const userId = state?.phoneNumber;


    const handleReturn = async () => {
        try {
            await axios
                .post(`/api/application/update-payment-status`, {
                    applicationId: state?.applicationId,
                    userId: state?.phoneNumber,
                    orderId: state?.order_Id,

                })
                .then((response) => {
                    const { body } = response.data;
                    navigate('/my-application', { state: { applicationId, userId } });


                });
        } catch (error) {
            console.log(error);

        }
    };

    return (
        <>
            <section className='thankyou_page'>
                <div className="row container">
                    <h1 className='thankyou_heading'>Thank You</h1>
                    <div className="thankyou_button_parent_div">
                        <button onClick={handleReturn} className='thankyou_button'>Go Back</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ThankYou