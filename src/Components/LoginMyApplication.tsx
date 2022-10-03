import React, { useEffect, useState, useRef } from 'react'
import { Button, styled, Box, CircularProgress, Typography } from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import Header from './Header';



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
const ContentWrapper = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.grey[200],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: "5%",
    padding: '1rem'
}));
type MyApplicationType = {
    emailId: string,
    applicantName: string,
    mobileNumber: string,
    createdDate: string;
    applicationId: string;
    postName: string;
    paymentStatus: boolean;

};

const LoginMyApplication = () => {
    const [loading, setLoading] = useState(false);
    const [header, setHeader] = useState(false);
    const [users, setUsers] = useState<MyApplicationType[]>([]);

    const { state }: { state: any } = useLocation();

    const navigate = useNavigate();
    const isMounted = useRef(false);



    useEffect(() => {
        const getUser = async () => {
            setLoading(true);

            try {
                await axios.post(`/api/application/fetch-application-details`,
                    {
                        applicationId: [state?.applicationId],
                        userId: state?.userId,

                    }

                ).then((response) => {
                    if (!isMounted.current) {
                        const { body } = response.data;
                        setUsers(body);

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
    const handlePayment = async (name: string, email: string, phoneNumber: string, applicationId: string) => {
        const url = `https://fpci-fe.netlify.app/thankyou`;
        const order_Id = Math.random().toString(36).substring(2, 9);
        var amount;
        switch (state?.category) {
            case 'General':
                amount = 990
                break;
            case 'OBC':
                amount = 690
                break;
            case 'SC':
                amount = 690
                break;
            case 'ST':
                amount = 690
                break;
            case 'EWS':
                amount = 690
                break;
            default:
                break;
        }

        try {
            await axios
                .post(`/api/application/payment-create-order`, {

                    customerEmail: email,
                    customerName: name,
                    customerPhone: phoneNumber,
                    orderAmount: amount,
                    orderId: order_Id,
                    orderNote: "payment",
                    paymentModes: "upi",
                    returnUrl: url

                })
                .then((response) => {
                    const { body } = response.data;
                    window.open(body)


                });
        } catch (error) {
            console.log(error);

        }
    };


    const handleView = (id: string, userId: string) => {
        navigate('/view-application', { state: { id, userId } })

    }
    const handleEdit = (id: string, userId: string, postName: string) => {
        navigate('/edit-application', { state: { id, userId, postName } })
    }





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
                            height: '100vh'
                        }}
                    >
                        <CircularProgress />
                    </Box>

                ) : (
                    <section className='myApp'>
                        <div className="row container">
                            <h4 className='myAppHead'>My Application</h4>
                            {users.length > 0 ? (
                                <>
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
                                                                                            <Btn onClick={() => handlePayment(item.applicantName, item.emailId, item.mobileNumber, item.applicationId)}>Proceed to pay</Btn>
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
                                                                    <Btn onClick={() => handleView(item.applicationId, item.mobileNumber)}>
                                                                        View/Download
                                                                    </Btn>
                                                                </Div>
                                                            </td>

                                                            <td>
                                                                <Div>
                                                                    <Btn onClick={() => handleEdit(item.applicationId, item.mobileNumber, item.postName)}>
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

                                </>
                            ) : (
                                <ContentWrapper>
                                    <Typography textAlign="center" variant="h5">
                                        No Application Found!
                                    </Typography>
                                </ContentWrapper>
                            )}
                        </div>


                    </section>
                )
            }
        </>
    )
}

export default LoginMyApplication