import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { BiLock } from 'react-icons/bi';
import * as Yup from 'yup';
import { ToastContainer, toast } from "react-toastify";
import axios from '../utils/axios';
import FormProvider from './hook-form/FormProvider';
import RHFTextField from './hook-form/RHFTextField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import '../login.css'
import Cta from './Cta';

type ProfileValuesProps = {
    userId: string;

};

const ForgotPass = () => {
    const [userId, setUserId] = useState('');
    const ProfileSchema = Yup.object().shape({
        // userId: Yup.string().required('UserId is required'),

    });

    const defaultValues = {



    };
    const methods = useForm<ProfileValuesProps>({
        resolver: yupResolver(ProfileSchema),
        defaultValues,
    });

    const { handleSubmit } = methods;



    const onSubmit = async () => {
        try {

            const response = await axios.post('/api/application/forget-password', {
                // userId: state?.userId
                userId: userId

            });
            const { message } = response.data;
            toast.success(message);
        } catch (error: any) {
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

    return (
        <>
            <section className='signupForm'>
                <div className="row container">
                    <ToastContainer position="top-center" />
                    <div className="formLayout">
                        <p className='signupHeader'>Forgot Password</p>

                        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label className='formLabel'> <BiLock className='signupIcon' />
                                    Enter your Registered Mobile Number</Form.Label>
                                <RHFTextField type='number' name="userId" label="" placeholder='Enter your number*' inputProps={{ maxLength: 10 }} required />
                            </Form.Group>



                            <div className="twoText">

                                <Link className='forgotPassword' to='/login'>
                                    Go back
                                </Link>

                            </div>
                            <button className='signupBtn' type='submit'>Submit</button>

                        </FormProvider>



                    </div>

                </div>
            </section>
            <Cta />
        </>
    )
}

export default ForgotPass