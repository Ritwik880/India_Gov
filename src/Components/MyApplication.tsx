import React, { useEffect, useState, useRef } from 'react'
import { Button, styled, Box, CircularProgress, Typography } from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { InputAdornment, IconButton } from '@mui/material';
import FormProvider from './hook-form/FormProvider';
import RHFTextField from './hook-form/RHFTextField';
import { Form } from 'react-bootstrap';
import { BiLock } from 'react-icons/bi';
import { IoCallOutline } from 'react-icons/io5';
import Iconify from './Iconify';
import { useDispatch } from '../redux/store';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from "react-toastify";

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
    category: string;
    creationTs: string;
    paymentStatus: boolean;

};
const MyApplication = () => {
    const [loading, setLoading] = useState(false);
    const [hide, setHide] = useState(true);
    const [users, setUsers] = useState<MyApplicationType[]>([]);

    const { state }: { state: any } = useLocation();

    const navigate = useNavigate();
    const isMounted = useRef(false);
    const [showPassword, setShowPassword] = useState(false);
    const [userId, setUserId] = useState('');
    // const [userProfileId, setUserProfileId] = useState<MyApplicationType>({
    //     applicationId: ''
    // });
    const dispatch = useDispatch();

    const ProfileSchema = Yup.object().shape({
        applicationId: Yup.string().required('Registration Number is required'),
    });

    const defaultValues = {
        applicationId: '',

    };
    const methods = useForm<ProfileValuesProps>({
        resolver: yupResolver(ProfileSchema),
        defaultValues,
    });




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




    const handlePayment = async (name: string, email: string, phoneNumber: string, applicationId: string) => {
        const order_Id = Math.random().toString(36).substring(2, 9);
        const url = '';
        var amount;
        switch (state?.category) {
            case 'General':
                amount = 690
                break;
            case 'OBC':
                amount = 350
                break;
            case 'SC':
                amount = 350
                break;
            case 'ST':
                amount = 350
                break;
            case 'EWS':
                amount = 350
                break;
            default:
                amount = 350;
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
                    navigate('/thankyou', { state: { applicationId, phoneNumber, order_Id } })
                    window.open(`${body}`);
                    setLoading(false);


                });
        } catch (error) {
            setLoading(false);
            console.log(error);

        }
    };

    const handleQRCodePayment = async (applicationId: string, userId: string, category: string) => {
        navigate('/qr-payment', { state: { applicationId, userId, category } })

    }


    const handleView = (id: string, userId: string) => {
        navigate('/view-application', { state: { id, userId } })

    }
    const handleEdit = (id: string, userId: string, postName: string) => {
        navigate('/edit-application', { state: { id, userId, postName } })
    }
    const handleDownloadReceipt = async (applicationId: string, userId: string, category: string) => {
        navigate('/download-receipt', { state: { applicationId, userId, category } })

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
                                                const extractedCreatedDate = item.creationTs
                                                    .split("T")[0]
                                                    .split("-")
                                                    .reverse()
                                                    .join("-");
                                                return (
                                                    <div className="myAppTable" key={id}>
                                                        <table style={{ background: '#f7f7f7', border: '2px solid #26335d', boxShadow: '3px 4px 4px #26335d', padding: '0.5rem' }}>
                                                            <tr style={{ border: '1px solid #ddd' }}>
                                                                <th style={{ color: '#26335d' }}>
                                                                    <p style={{ textAlign: 'center' }} className='myAppPara'>
                                                                        Created Date
                                                                    </p>

                                                                </th>
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
                                                                            extractedCreatedDate
                                                                        }
                                                                    </p>
                                                                </td>

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
                                                                                        item.paymentStatus === false ? (
                                                                                            <>
                                                                                                <Div style={{ marginBottom: '1rem' }}>
                                                                                                    <button className='paidDownload' onClick={() => handlePayment(item.applicantName, item.emailId, item.mobileNumber, item.applicationId)}>Pay through gateway</button>
                                                                                                </Div>
                                                                                                <Div>
                                                                                                    <button className='paidDownload' onClick={() => handleQRCodePayment(item.applicationId, item.mobileNumber, item.category)}>Pay through QR Code</button>
                                                                                                </Div>
                                                                                            </>

                                                                                        )
                                                                                            :
                                                                                            <Div>
                                                                                                <button className='paidDownload' style={{ marginRight: '1rem' }}>Paid</button>
                                                                                                <button onClick={() => handleDownloadReceipt(item.applicationId, item.mobileNumber, item.category)} className='paidDownload'>Download Receipt</button>
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

export default MyApplication