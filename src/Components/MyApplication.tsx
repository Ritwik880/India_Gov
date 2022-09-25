import React, { useEffect, useState, useRef } from 'react'
import { Button, styled, Box, CircularProgress } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { dispatch, useSelector } from "../redux/store";


const Btn = styled(Button)(({ theme }) => ({
    borderRadius: "3px",
    backgroundColor: '#26335d',
    color: '#fff',
    textTransform: 'capitalize'

}));

const Div = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'

}));
type MyApplicationType = {
    emailId: string,
    applicantName: string,
    mobileNumber: string,
    createdDate: string;
    applicationId: number;
    postName: string;
    paymentStatus: boolean;

};
type PropsType = {
    userId: string;
    applicationId: number;
    id: number

}
const MyApplication = (props: PropsType) => {

    // console.log(props.userId);
    // console.log(props.applicationId);
    // console.log(props.id);

    const [loading, setLoading] = useState(false);
    const [noSuggestion, setNoSuggestion] = useState(false);
    const [applicationId, setApplicationId] = useState([0]);
    const [users, setUsers] = useState<MyApplicationType[]>([]);

    const navigate = useNavigate();
    const isMounted = useRef(false);

    const profileDetails = useSelector((state: any) => state.profileView.value);


    useEffect(() => {
        const getUser = async () => {
            setLoading(true);
            try {
                await axios.post(`/api/application/fetch-application-details`,
                    {
                        applicationId: [20],
                        userId: 5905,

                    }

                ).then((response) => {
                    if (!isMounted.current) {
                        const { body } = response.data;
                        setUsers(body);
                        console.log(body);

                    }
                });
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error(error);
            }
        };
        getUser();
    }, []);







    //handlePayment
    // let order_Id = Math.random().toString(36).substring(2, 9);
    const handlePayment = async (name: string, email: string, phoneNumber: string) => {
        const url = 'https://www.cashfree.com/';
        const amount = 100;
        // const order_Id = Math.random().to(36).substring(2, 9);

        try {
            await axios
                .post(`/api/application/payment-create-order`, {

                    customerEmail: email,
                    customerName: name,
                    customerPhone: 1234567890,
                    orderAmount: amount,
                    orderId: Math.floor(Math.random() * 90000) + 10000,
                    orderNote: "payment",
                    paymentModes: "upi",
                    returnUrl: url

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
            <div className="pb-6 d-flex align-items-center about-page">
                <div className="container d-flex align-items-center">
                    <div className="text-white mx-auto mt-5 upper">
                    </div>
                </div>
            </div>

            {
                loading ? (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            pt: '10%'
                        }}
                    >
                        <CircularProgress />
                    </Box>

                ) : (
                    <section className='myApp'>
                        <div className="row container">
                            <h4 className='myAppHead'>My Application</h4>
                            {
                                users && users.map((item, id) => {
                                    return (
                                        <div className="myAppTable" key={id}>
                                            <table style={{ background: '#f7f7f7', border: '2px solid #26335d', boxShadow: '3px 4px 4px #26335d', padding: '0.5rem' }}>
                                                <tr style={{ border: '1px solid #ddd' }}>

                                                    <th style={{ color: '#26335d' }}>
                                                        <p style={{ textAlign: 'center' }} className='myAppPara'>
                                                            Reg No.
                                                        </p>

                                                    </th>
                                                    <th style={{ color: '#26335d' }}>
                                                        <p style={{ textAlign: 'center' }} className='myAppPara'>
                                                            Post Applied For
                                                        </p>

                                                    </th>
                                                    <th style={{ color: '#26335d' }}>
                                                        <p style={{ textAlign: 'center' }} className='myAppPara'>
                                                            Payment Status
                                                        </p>

                                                    </th>
                                                    <th style={{ color: '#26335d' }}>
                                                        <p style={{ textAlign: 'center' }} className='myAppPara'>
                                                            View Application
                                                        </p>

                                                    </th>

                                                    <th style={{ color: '#26335d' }}>
                                                        <p style={{ textAlign: 'center' }} className='myAppPara'>
                                                            Edit
                                                        </p>

                                                    </th>


                                                </tr>

                                                <tr>



                                                    <td style={{ color: '#26335d' }}>
                                                        <p style={{ textAlign: 'center' }} className='myAppPara'>
                                                            {
                                                                item.applicationId
                                                            }
                                                        </p>
                                                    </td>

                                                    <td style={{ color: '#26335d' }}>
                                                        <p style={{ textAlign: 'center' }} className='myAppPara'>
                                                            {
                                                                item.postName
                                                            }
                                                        </p>
                                                    </td>

                                                    <td>
                                                        {
                                                            users.map((item, id) => {
                                                                return (
                                                                    <>
                                                                        {
                                                                            item.paymentStatus === false ?
                                                                                <Div>
                                                                                    <Btn onClick={() => handlePayment(item.applicantName, item.emailId, item.mobileNumber)}>Proceed to pay</Btn>
                                                                                </Div>
                                                                                :
                                                                                <Div>
                                                                                    <Btn sx={{ marginRight: '1rem' }}>Paid</Btn>
                                                                                    <Btn>Download Receipt</Btn>
                                                                                </Div>
                                                                        }
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </td>
                                                    <td>
                                                        <Div>
                                                            <Btn onClick={() => navigate('/view-application')}>
                                                                View/Download
                                                            </Btn>
                                                        </Div>
                                                    </td>

                                                    <td>
                                                        <Div>
                                                            <Btn onClick={() => navigate('/edit-application')}>
                                                                Edit
                                                            </Btn>
                                                        </Div>
                                                    </td>

                                                </tr>


                                            </table>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </section>
                )
            }
        </>
    )
}

export default MyApplication