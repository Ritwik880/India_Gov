import React, { useState } from 'react'
import { Button, styled, Box, CircularProgress, Typography } from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import FormProvider from './hook-form/FormProvider';
import RHFTextField from './hook-form/RHFTextField';
import { Form } from 'react-bootstrap';
import { BiLock } from 'react-icons/bi';
import { IoCallOutline } from 'react-icons/io5';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from "react-toastify";



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
type ProfileValuesProps = {
    userId: string;
    applicationId: string;
    id: number;


};
type MyApplicationType = {
    emailId: string,
    applicantName: string,
    mobileNumber: string,
    createdDate: string;
    applicationId: string;
    postName: string;
    paymentStatus: boolean;

};

const MyApplicationOther = () => {
    const [loading, setLoading] = useState(false);
    const [applicationId, setApplicationId] = useState('');
    const [users, setUsers] = useState<MyApplicationType[]>([]);
    const { state }: { state: any } = useLocation();
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');

    // let history = useHistory();

    const ProfileSchema = Yup.object().shape({
        // applicationId: Yup.string().required('Registration Number is required'),
    });

    const defaultValues = {
        // applicationId: '',


    };
    const methods = useForm<ProfileValuesProps>({
        resolver: yupResolver(ProfileSchema),
        defaultValues,
    });

    const { handleSubmit, reset } = methods;

    const onSubmit = async () => {
        setLoading(true);
        try {
            const res = await axios.post('/api/application/fetch-application-details', {
                userId: userId,
                applicationId: [applicationId],
            }
            );
            const { body } = res.data;
            toast.success('Success');
            reset();
            setUsers(body);
            setLoading(false);

        } catch (error: any) {
            setLoading(false);
            toast.error("Something went wrong!");
        }



    }


    const handleMobileNumber = (e: any) => {
        if (userId.length >= 10) {
            toast.error('Mobile Number should be of 10 digit!');

        }
        else if (userId.length < 0) {
            toast.error('Invalid Mobile Number!');

        }
        else {
            setUserId(e.target.value)
        }

    }


    const handlePayment = async (name: string, email: string, phoneNumber: string, applicationId: string) => {
        const order_Id = Math.random().toString(36).substring(2, 9);
        const url = '';
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
                amount = 690;
                break;
        }

        setLoading(true);
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
                    navigate('/thankyou', { state: { applicationId, phoneNumber } })
                    window.open(`${body}`);
                    setLoading(false);



                });
        } catch (error) {
            setLoading(false);
            console.log(error);

        }
    };

    setTimeout(() => {

    }, 8000);




    const handleView = (id: string, userId: string) => {
        navigate('/view-application', { state: { id, userId } })

    }
    const handleEdit = (id: string, userId: string, postName: string) => {
        navigate('/edit-application', { state: { id, userId, postName } })
    }

    const handleDownloadReceipt = async () => {
        alert('hii')

    }





    return (
        <>
            <div className="pb-6 d-flex align-items-center about-page">
                <div className="container d-flex align-items-center">
                    <div className="text-white mx-auto mt-5 upper">
                    </div>
                </div>
            </div>
            <section className='myAppform'>
                <div className="row container">
                    <h5 className='redText'>Please Enter your User Name and Registered Mobile Number</h5>
                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className='formLabel'> <IoCallOutline className='signupIcon' />
                                Enter Your Number</Form.Label>

                            <RHFTextField type='number' value={userId} onChange={handleMobileNumber} name="userId" label="" placeholder='Enter your number*' inputProps={{ maxLength: 10 }} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className='formLabel'> <BiLock className='signupIcon' />
                                Registration Number</Form.Label>

                            <RHFTextField name="applicationId" value={applicationId} onChange={(e) => setApplicationId(e.target.value)} label="" placeholder='Enter your Registration Number*' required />
                        </Form.Group>
                        <button className='signupBtn' type='submit'>Submit</button>
                    </FormProvider>
                </div>
            </section>

            {
                loading ? (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: '50vh'
                        }}
                    >
                        <CircularProgress />
                    </Box>

                ) : (
                    <>



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
                                                                                                <button className='paidDownload' onClick={() => handlePayment(item.applicantName, item.emailId, item.mobileNumber, item.applicationId)}>Proceed to pay</button>
                                                                                            </Div>
                                                                                            :
                                                                                            <Div>
                                                                                                <button className='paidDownload' style={{ marginRight: '1rem' }}>Paid</button>
                                                                                                <button onClick={handleDownloadReceipt} className='paidDownload'>Download Receipt</button>
                                                                                            </Div>
                                                                                    }
                                                                                </>
                                                                            )
                                                                        })
                                                                    }
                                                                </td>
                                                                <td>
                                                                    <Div>
                                                                        <button className='paidDownload' onClick={() => handleView(item.applicationId, item.mobileNumber)}>
                                                                            View/Download
                                                                        </button>
                                                                    </Div>
                                                                </td>

                                                                <td>
                                                                    <Div>
                                                                        <button className='paidDownload' onClick={() => handleEdit(item.applicationId, item.mobileNumber, item.postName)}>
                                                                            Edit
                                                                        </button>
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
                    </>
                )
            }
        </>
    )
}

export default MyApplicationOther