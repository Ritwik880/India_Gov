import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isValidPhoneNumber } from 'react-phone-number-input';
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
    password: string;
    userId: string;


};

const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);

    const ProfileSchema = Yup.object().shape({
        userId: Yup.string().required('Name is required'),
        password: Yup.string().required('Password is required'),
    });

    const defaultValues = {
        password: '',

    };
    const methods = useForm<ProfileValuesProps>({
        resolver: yupResolver(ProfileSchema),
        defaultValues,
    });

    const { handleSubmit, setValue } = methods;



    const onSubmit = async (data: ProfileValuesProps) => {
        try {
            await axios.post('/api/application/login', {
                userId: parseInt(data.userId),
                password: data.password
            }
            );
            toast.success('Success');
        } catch (error: any) {
            toast.error("Something went wrong!");
        }


    }


    return (
        <>
            <section className='signupForm'>
                <div className="row container">
                    <ToastContainer position="top-center" />
                    <div className="formLayout">
                        <p className='signupHeader'>Welcome</p>

                        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className='formLabel'> <IoCallOutline className='signupIcon' />
                                    Email Your Number</Form.Label>

                                <RHFTextField type='number' name="userId" label="" placeholder='Enter your name*' inputProps={{ maxLength: 10 }} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label className='formLabel'> <BiLock className='signupIcon' />
                                    Password</Form.Label>
                                <RHFTextField
                                    name="password"
                                    label=""
                                    type={showPassword ? "text" : "password"}
                                    placeholder='Enter your password'
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                >
                                                    <Iconify
                                                        icon={
                                                            showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                                                        }
                                                    />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Form.Group>
                            <button className='signupBtn' type='submit'>Login</button>
                            <div className="twoText">

                                <Link className='forgotPassword' to='/forgot-password'>
                                    Forgot password ?
                                </Link>

                            </div>
                        </FormProvider>



                    </div>

                </div>
            </section>
            <Cta />
        </>
    )
}

export default Login