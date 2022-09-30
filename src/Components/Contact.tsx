import React, { useState } from 'react';
import '../contact.css'
import { Form, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import axios from '../utils/axios';
import FormProvider from './hook-form/FormProvider';
import RHFTextField from './hook-form/RHFTextField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import "react-toastify/dist/ReactToastify.css";
import Cta from './Cta';

type ProfileValuesProps = {
    name: string;
    email: string;
    subject: string;
    message: string;
    number: string;


};
const Contact = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const ProfileSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        subject: Yup.string().required('Subject is required'),
        message: Yup.string().required('Message is required'),

    });

    const defaultValues = {
        name: '',
        email: '',
        subject: '',
        message: '',



    };
    const methods = useForm<ProfileValuesProps>({
        resolver: yupResolver(ProfileSchema),
        defaultValues,
    });

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = async (data: ProfileValuesProps) => {
        try {
            await axios.post("/api/application/contact-us", {
                name: data.name,
                message: data.message,
                subject: data.subject,
                email: data.email,
                number: phoneNumber

            });
            toast.success('Success');
            reset();
        } catch (error: any) {
            toast.error("Something went wrong!");
        }
    };

    const handleChange = (e: any) => {
        if (phoneNumber.length >= 10) {
            toast.error('Mobile Number should be of 10 digit!');

        }
        else if (phoneNumber.length < 0) {
            toast.error('Invalid Mobile Number!');

        }
        else {
            setPhoneNumber(e.target.value)
        }

    };
    return (
        <>
            <div className="pb-6 d-flex align-items-center contact-page">
                <div className="container d-flex align-items-center">
                    <div className="text-white mx-auto mt-5 upper">
                    </div>
                </div>
            </div>
            <section className="section gray-bg" id="contactus">
                <ToastContainer position="top-center" />
                <div className="row container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="section-title">
                                <h2>Get In Touch</h2>

                            </div>
                        </div>
                    </div>
                    <div className="row flex-row-reverse">
                        <div className="col-md-7 col-lg-8 m-15px-tb">
                            <h5>HAVE ANY QUERY?</h5>
                            <div className="contact-form">
                                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                                    <Row>
                                        <Col>


                                            <RHFTextField name="name" label="" placeholder='Enter Name*' />
                                        </Col>
                                        <Col className="inPhone">


                                            <RHFTextField name="email" label="" placeholder='Enter Email*' />
                                        </Col>
                                    </Row>
                                    <Row className="my-2">
                                        <Col>
                                            <RHFTextField name="subject" label="" placeholder='Enter Subject*' />
                                        </Col>
                                        <Col className="inPhone">
                                            <RHFTextField name="number" type='number' value={phoneNumber} onChange={handleChange} label="" placeholder='Enter Phone*' inputProps={{ maxLength: 10 }} required />

                                        </Col>
                                    </Row>

                                    <Row>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <RHFTextField name="message" label="" placeholder='Enter Message*' />
                                        </Form.Group>
                                    </Row>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <LoadingButton
                                            type="submit"
                                            loading={isSubmitting}
                                            sx={{
                                                background: '#434565',
                                                color: '#fff',
                                                border: 'none',
                                                padding: '8px 15px',
                                                borderRadius: '4px',
                                                '&:hover': {
                                                    background: '#434565',
                                                },

                                            }}
                                        >
                                            SEND YOUR MESSAGE

                                        </LoadingButton>
                                    </div>
                                </FormProvider>
                            </div>
                        </div>
                        <div className="col-md-5 col-lg-4 m-15px-tb mobileView">
                            <div className="contact-name">
                                <h5>Mail</h5>
                                <p>contact@fpci.org.in</p>
                            </div>
                            <div className="contact-name">
                                <h5>Visit Our Office</h5>
                                <p>Deen Dayal Upadhyay Marg, New Delhi 110002</p>
                            </div>


                        </div>
                    </div>
                </div>
            </section>
            <Cta />
        </>
    )
}

export default Contact