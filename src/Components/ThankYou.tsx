import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

type Props = {
    applicationId: string;
    mobile: string;
}

const ThankYou = () => {
    const navigate = useNavigate();
    const handleReturn = async (name: string, email: string, phoneNumber: string) => {
  

        try {
            await axios
                .post(`/api/application/update-payment-status`, {

                    applicationId: "1",
                    orderId: "",
                    userId: ""

                })
                .then((response) => {
                    const { body } = response.data;
                    // console.log(data);

                    window.open(body)


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
                        <button onClick={()=> handleReturn()} className='thankyou_button'>Go Back</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ThankYou