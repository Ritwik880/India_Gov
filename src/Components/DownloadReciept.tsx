import React, { useState, useEffect, useRef } from 'react'
import { Button, styled, Box, CircularProgress, Typography } from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import FormProvider from './hook-form/FormProvider';
import RHFTextField from './hook-form/RHFTextField';
import { ProfileValues } from '../@types/object';



const DownloadReceipt = () => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<ProfileValues[]>([]);
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

    const handlePrint = (event: any) => {
        event.preventDefault();
        window.print();
    }

    const handleGoBack = (applicationId: string, userId: string) => {
        navigate('/my-application-others', { state: { applicationId, userId } })
    }


    //amount
    var amount: any;
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

    const transaction_id = 'CRN' + Math.random().toString().slice(2, 11);
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
                    {
                        loading ? (
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: '100vh',
                                }}
                            >
                                <CircularProgress />
                            </Box>

                        ) : (
                            <>


                                {

                                    users.map((item, id) => {
                                        const extractedDate = item.dateOfBirth
                                            .split("T")[0]
                                            .split("-")
                                            .reverse()
                                            .join("-");



                                        return (
                                            <div key={id}>
                                                <h1 className='formHead'>Payment Receipt <span className='dynamic_data'>
                                                    {item.postName}
                                                </span></h1>

                                                <div className="parentForm">

                                                    <div className="formBox">
                                                        <div className="mb-3 col-lg-3 col-md-12">
                                                            <label htmlFor="exampleInputEmail1" className="form-label">Registration Number</label>

                                                            <Typography>
                                                                {
                                                                    item.applicationId
                                                                }
                                                            </Typography>

                                                        </div>
                                                        <div className="mb-3 col-lg-3 col-md-12">
                                                            <label htmlFor="exampleInputEmail1" className="form-label">Transaction Id</label>

                                                            <Typography>
                                                                {
                                                                    transaction_id
                                                                }
                                                            </Typography>

                                                        </div>
                                                        <div className="mb-3 col-lg-3 col-md-12">
                                                            <label htmlFor="exampleInputEmail1" className="form-label">Name</label>

                                                            <Typography>
                                                                {
                                                                    item.applicantName
                                                                }
                                                            </Typography>

                                                        </div>




                                                    </div>

                                                    <div className="formBox">
                                                        <div className="mb-3 col-lg-3 col-md-12">
                                                            <label htmlFor="exampleInputPassword1" className="form-label">Mobile Number</label>

                                                            <Typography>
                                                                {
                                                                    item.mobileNumber
                                                                }
                                                            </Typography>
                                                        </div>
                                                        <div className="mb-3 col-lg-3 col-md-12">
                                                            <label htmlFor="exampleInputPassword1" className="form-label">Email</label>

                                                            <Typography>
                                                                {
                                                                    item.emailId
                                                                }
                                                            </Typography>
                                                        </div>
                                                        <div className="mb-3 col-lg-3 col-md-12">
                                                            <label htmlFor="exampleInputPassword1" className="form-label">Amount</label>

                                                            <Typography>
                                                                Rs. {
                                                                    amount
                                                                }
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                    <div className="formBox">
                                                        <div className="mb-3 col-lg-3 col-md-12">
                                                            <label htmlFor="exampleInputPassword1" className="form-label">Post Name</label>

                                                            <Typography>
                                                                {
                                                                    item.postName
                                                                }
                                                            </Typography>
                                                        </div>

                                                    </div>


                                                </div>



                                                <div className="submitForm">

                                                    <button className="formSubmit" onClick={handlePrint}>Print</button>
                                                    <button className="formSubmit" onClick={() => handleGoBack(item.applicationId, item.mobileNumber)}>Go Back</button>

                                                </div>


                                            </div>

                                        )
                                    })

                                }

                            </>
                        )
                    }


                </div>
            </section>


        </>
    )
}

export default DownloadReceipt