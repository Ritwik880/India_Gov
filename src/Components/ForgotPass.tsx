import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { InputAdornment, IconButton } from '@mui/material';
import { Form } from 'react-bootstrap';
import { BiLock } from 'react-icons/bi';
import * as Yup from 'yup';
import { ToastContainer, toast } from "react-toastify";
import axios from '../utils/axios';
import FormProvider from './hook-form/FormProvider';
import RHFTextField from './hook-form/RHFTextField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Iconify from './Iconify';
import { IoCallOutline } from 'react-icons/io5'
import '../login.css'
import Cta from './Cta';

type ProfileValuesProps = {
    currentPassword: string;
    newPassword: string;

};

const ForgotPass = () => {
    const isMounted = useRef(false);
    const [currentPassword, setCurrentPassword] = useState(false);
    const [newPassword, setNewPassword] = useState(false);

    const ProfileSchema = Yup.object().shape({
        currentPassword: Yup.string().required('Current password is required'),
        newPassword: Yup.string().required('New password is required'),
    });

    const defaultValues = {
        currentPassword: '',
        newPassword: '',

    };
    const methods = useForm<ProfileValuesProps>({
        resolver: yupResolver(ProfileSchema),
        defaultValues,
    });

    const { handleSubmit, setValue } = methods;



    const onSubmit = async (data: ProfileValuesProps) => {
        const profileForm = new FormData();
        profileForm.append('currentPassword', data.currentPassword);
        profileForm.append('newPassword', data.newPassword);

        try {

            const response = await axios.get('/api/application/forget-password', {
                params: {
                    profileForm
                }
            });
            const { message } = response.data;
            toast.success(message);
        } catch (error: any) {
            toast.error("Something went wrong!");
        }
    }



    useEffect(() => {
        const getProfileDetails = async () => {
            try {
                const response = await axios.post('/api/application/login');
                const { data } = response.data;
                if (!isMounted.current) {
                    console.log(data);


                }
            } catch (error) {
                console.error(error);
                toast.error("Something went wrong!");
            }
        };
        getProfileDetails();

        return () => {
            isMounted.current = true;
        };
    }, []);

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
                                    Current Password</Form.Label>
                                <RHFTextField
                                    name="currentPassword"
                                    label=""
                                    type={currentPassword ? "text" : "password"}
                                    placeholder='Enter your current password'
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setCurrentPassword(!currentPassword)}
                                                    edge="end"
                                                >
                                                    <Iconify
                                                        icon={
                                                            currentPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                                                        }
                                                    />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Form.Group>


                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label className='formLabel'> <BiLock className='signupIcon' />
                                    New Password</Form.Label>
                                <RHFTextField
                                    name="newPassword"
                                    label=""
                                    type={newPassword ? "text" : "password"}
                                    placeholder='Enter your new password'
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setNewPassword(!newPassword)}
                                                    edge="end"
                                                >
                                                    <Iconify
                                                        icon={
                                                            newPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                                                        }
                                                    />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
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