import React, { useState, useRef, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {
    CircularProgress,
    Box,
} from "@mui/material";
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
//object
import { profileView } from "../redux/slices/profileView";

//redux
import { useDispatch, useSelector } from "../redux/store";

type ProfileValuesProps = {
    password: string;
    userId: string;


};

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [userId, setUserId] = useState('');

    const ProfileSchema = Yup.object().shape({
        password: Yup.string().required('Password is required'),
    });

    const defaultValues = {
        password: '',

    };
    const methods = useForm<ProfileValuesProps>({
        resolver: yupResolver(ProfileSchema),
        defaultValues,
    });

    const { handleSubmit, reset } = methods;

    const navigate = useNavigate();

    const dispatch = useDispatch();



    const onSubmit = async (data: ProfileValuesProps) => {

        try {
            const res = await axios.post('/api/application/login', {
                userId: parseInt(userId),
                password: data.password,

            }
            );
            const { body } = res.data;
            if (!body.loginSuccess) {
                toast.error("Bad Credentials");

            }
            else {
                toast.success('Success');
                reset();
                navigate('/my-application')

            }





        } catch (error: any) {

            toast.error("Something went wrong!");
        }


    }
    const handleProfile = (id: number) => {
        dispatch(
            profileView({
                id: id,
            })
        );
        navigate('/my-application');
    };


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
                                    Enter Your Number</Form.Label>

                                <RHFTextField type='number' value={userId} onChange={(e) => setUserId(e.target.value)} name="userId" label="" placeholder='Enter your number*' inputProps={{ maxLength: 10 }} required />
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
                                {/* <div>
                                    <button onClick={() => handleProfile(parseInt(userId))}>
                                        My Application
                                    </button>
                                </div> */}

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