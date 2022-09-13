import React, { useState } from 'react'
import PhoneInput from 'react-phone-number-input';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { InputAdornment, IconButton, styled } from '@mui/material';
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
import TPhoneComponent from './TPhoneComponent';

type ProfileValuesProps = {
    userName: string;
    userPassword: string;

};
const Phone = styled(PhoneInput)(({ theme }) => ({
    '& input': {
        background: 'transparent',
        color: theme.palette.common.white,
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        fontSize: 14,
        borderBottom: `1px solid ${theme.palette.grey[500_56]}`,
        padding: theme.spacing(1),
        marginBottom: theme.spacing(1),
        borderRadius: 0,
        '&:focus-visible': {
            outline: 'none',
        },
        '&:disabled ': {
            color: theme.palette.grey[600],
        },
        '&::placeholder ': {
            opacity: 1,
            color: theme.palette.grey[100],
            fontStyle: 'italic',
            fontSize: '13px',
            fontWeight: 200,
        },
    },
}));
const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);

    const ProfileSchema = Yup.object().shape({
        userName: Yup.string().required('Username is required'),
        userPassword: Yup.string().required('Password is required'),
    });

    const defaultValues = {
        userName: '',
        userPassword: '',

    };
    const methods = useForm<ProfileValuesProps>({
        resolver: yupResolver(ProfileSchema),
        defaultValues,
    });

    const { handleSubmit, setValue } = methods;

    const onSubmit = async (data: ProfileValuesProps) => {
        const profileForm = new FormData();
        profileForm.append('userPassword', data.userPassword);
        if (phoneNumber) {
            profileForm.append('phone_number', phoneNumber);
            if (isValidPhoneNumber(phoneNumber)) {
                try {

                    const response = await axios.get('/api/application/login', profileForm);
                    const { message } = response.data;
                    toast.success(message);
                } catch (error: any) {
                    toast.error("Something went wrong!");
                }
            } else {
                toast.error('Please enter a valid phone number!');
            }
        }
        else {
            profileForm.append('phone_number', '');
            try {
                const response = await axios.get('/api/application/login', profileForm);
                const { message } = response.data;
                toast.success(message);
            } catch (error) {
                toast.error('Something went wrong!');
            }
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
                                    Email Mobile Number</Form.Label>

                                <Phone
                                    name="phone_number"
                                    value={phoneNumber}
                                    defaultCountry="IN"
                                    onChange={(phone: any) => setPhoneNumber(phone)}
                                    error={
                                        phoneNumber
                                            ? isValidPhoneNumber(phoneNumber)
                                                ? undefined
                                                : 'Invalid phone number'
                                            : 'Phone number required'
                                    }
                                />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label className='formLabel'> <BiLock className='signupIcon' />
                                    Password</Form.Label>
                                <RHFTextField
                                    name="userPassword"
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
                                <a className='forgotPassword' href="#">Forgot password ?</a>

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