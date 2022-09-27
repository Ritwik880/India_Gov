import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { useSelector } from "../redux/store";
import { authType } from '../redux/slices/auth';
// import { profileView } from "../redux/slices/profileView";

//redux
import { useDispatch } from "../redux/store";
import MyApplication from './MyApplication';
import Header from './Header';

type ProfileValuesProps = {
    password: string;
    userId: string;
    id: number;


};
interface MyApplicationType {
    password: string;
    userId: string;
    loginSuccess: boolean;
    applicationDetails: [
        {
            applicationId: string
        }
    ]


}

const Login = () => {
    const [myApp, setMyApp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [userId, setUserId] = useState('');
    const [userProfileId, setUserProfileId] = useState<MyApplicationType[]>([]);

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

    const profileId = useSelector((state) => state.profileView.value);

    const onSubmit = async (data: ProfileValuesProps) => {

        try {
            const res = await axios.post('/api/application/login', {
                userId: userId,
                password: data.password,
            }
            );
            const { body } = res.data;

            if (!body.loginSuccess) {
                toast.error("Bad Credentials");

            }
            else {
                let applicationId = body.applicationDetails[0].applicationId
                setUserProfileId(body);
                toast.success('Success');
                reset();
                navigate('/my-application', { state: { applicationId, userId } });

            }
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
                        <p className='signupHeader'>Welcome</p>

                        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className='formLabel'> <IoCallOutline className='signupIcon' />
                                    Enter Your Number</Form.Label>

                                <RHFTextField type='number' value={userId} onChange={handleMobileNumber} name="userId" label="" placeholder='Enter your number*' inputProps={{ maxLength: 10 }} required />
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


                            <a className='forgotPassword' onClick={() => navigate('/forgot-password')}>
                                Forgot password ?
                            </a>



                        </FormProvider>



                    </div>

                </div>
            </section>


            <Cta />
        </>
    )
}

export default Login