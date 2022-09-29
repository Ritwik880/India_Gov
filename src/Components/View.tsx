import React, { useRef, useState, useEffect } from 'react';
import * as Yup from 'yup';
import {
    CircularProgress,
    Box,
} from "@mui/material";
import axios from '../utils/axios';
import { Select, MenuItem, InputLabel, Typography, styled } from '@mui/material';
import FormProvider from './hook-form/FormProvider';
import RHFTextField from './hook-form/RHFTextField';
import { useLocation, useNavigate } from 'react-router-dom';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @ts-ignore
import Files from 'react-files';

const ContentWrapper = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.grey[200],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: "5%",
    padding: '1rem'
}));
const AttachmentThumbnail = styled('div')(({ theme }) => ({
    background: theme.palette.grey[200],
    borderRadius: '15px',
    height: '96px',
    width: '147px',
    marginBottom: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
        height: '90px',
        width: '120px',
    },
}));
const ImgStyle = styled('img')(({ theme }) => ({
    borderRadius: '15px',
    height: '80px',
    width: '130px',
    objectFit: 'cover',
}));

const AttachmentWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    marginBottom: theme.spacing(2),
}));

type ProfileValues = {
    uploadPhoto: {
        url: string;
    };
    uploadSignature: {
        url: string;
    };
    aadharNumber: string;
    academicQualification: [
        {
            board: string;
            className: string;
            passingYear: string;
            percentage: string;
            schoolName: string
        }
    ],
    higherQualification: [
        {
            courseName: string;
            courseType: string;
            passingYear: string;
            percentage: string;
            specialization: string;
        }
    ],
    experienceDetails: [
        {
            companyName: string;
            designation: string;
            durationFrom: string;
            durationTo: string;
            experienced: string;
            location: string;
            totalExperience: string,
        }
    ],
    alternateEmailId: string;
    alternateMobileNumber: string;
    applicantName: string;
    category: string;
    dateOfBirth: string;
    emailId: string;
    experienced: string;
    fatherName: string;
    gender: string;
    mobileNumber: string;
    motherName: string;
    pancard: string;
    password: string;
    paymentStatus: boolean;
    permanentAddress: {
        area: string;
        city: string;
        country: string;
        houseNumber: string;
        pincode: string;
        road: string;
        state: string;
    },
    postName: string,
    presentAddress: {
        area: string;
        city: string;
        country: string;
        houseNumber: string;
        pincode: string;
        road: string;
        state: string;
    },
    religion: string,
    applicationId: number;



};
const View = () => {
    const [hideForm, setHideForm] = useState(true);
    const [others, setOthers] = useState(false);
    const [noExperience, setNoexperience] = useState(false);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<ProfileValues[]>([]);

    const { state }: { state: any } = useLocation();
    const isMounted = useRef(false);
    const ProfileSchema = Yup.object().shape({
        applicantName: Yup.string().required('Applicant name is required'),
        fatherName: Yup.string().required('Applicant father name is required'),
        motherName: Yup.string().required('Applicant mother name is required'),
        dateOfBirth: Yup.string().required('DateOfBirth is required'),
        emailId: Yup.string().required('Email is required'),
        pancard: Yup.string().required('Pan is required'),




    });

    const defaultValues = {
        applicantName: '',
        fatherName: '',
        motherName: '',
        others: '',
        dateOfBirth: '',
        emailId: '',
        alternateEmailId: '',
        pancard: '',




    };
    const methods = useForm<ProfileValues>({
        resolver: yupResolver(ProfileSchema),
        defaultValues,
    });


    useEffect(() => {
        const getUser = async () => {
            setLoading(true);
            try {
                await axios.post(`/api/application/fetch-application-details`,
                    {
                        applicationId: [state?.id],
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


    const hanldeNo = () => {
        setHideForm(false);
        setNoexperience(true);

    }

    const hanldeShowOthers = () => {
        setOthers(true);

    }
    return (
        <>


            <section className='formSection'>
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
                                    users.length > 0 ? (
                                        <>

                                            {

                                                users.map((item, id) => {
                                                    const extractedDate = item.dateOfBirth
                                                        .split("T")[0]
                                                        .split("-")
                                                        .reverse()
                                                        .join("-");



                                                    return (
                                                        <>
                                                            <h1 className='formHead'>Application Form for <span className='dynamic_data'>
                                                                {item.postName}
                                                            </span></h1>
                                                            <FormProvider methods={methods}>
                                                                <div className="parentForm" key={id}>
                                                                    <h2 className='footerFormHead'>Personal Details</h2>
                                                                    <div className="formBox">
                                                                        <div className="mb-3 col-lg-3 col-md-12">
                                                                            <label htmlFor="exampleInputEmail1" className="form-label">Name <span className="must-filed">*</span></label>

                                                                            <RHFTextField disabled name="applicantName" label="" placeholder='Enter Name' value={item.applicantName} />

                                                                        </div>
                                                                        <div className="mb-3 col-lg-3 col-md-12">
                                                                            <label htmlFor="exampleInputPassword1" className="form-label">Father Name <span className="must-filed">*</span></label>

                                                                            <RHFTextField disabled name="fatherName" label="" placeholder='Enter Father Name' value={item.fatherName} />
                                                                        </div>
                                                                        <div className="mb-3 col-lg-3 col-md-12">
                                                                            <label htmlFor="exampleInputPassword1" className="form-label">Mother Name <span className="must-filed">*</span></label>

                                                                            <RHFTextField disabled name="motherName" label="" placeholder='Enter Mother Name' value={item.motherName} />
                                                                        </div>

                                                                    </div>

                                                                    <div className="formBox">
                                                                        <div className="mb-3 col-lg-3 col-md-12">
                                                                            <label htmlFor="exampleInputEmail1" className="form-label">Date Of Birth <span className="must-filed">*</span></label>
                                                                            <RHFTextField disabled name="dateOfBirth" label="" placeholder='dd/mm/yyyy' value={extractedDate} />

                                                                        </div>
                                                                        <div className="mb-3 col-lg-3 col-md-12">
                                                                            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                                                            <Select fullWidth size='small' labelId='demo-simple-select-label' label="Gender" name='gender' value={item.gender} disabled className="form-select" required sx={{

                                                                                ".MuiOutlinedInput-notchedOutline": {
                                                                                    border: "none",
                                                                                },
                                                                            }}>
                                                                                <MenuItem value="Male">Male</MenuItem>
                                                                                <MenuItem value="Female">Female</MenuItem>
                                                                            </Select>
                                                                        </div>
                                                                        <div className="mb-3 col-lg-3 col-md-12">
                                                                            <label htmlFor="exampleInputPassword1" className="form-label">Category <span className="must-filed">*</span></label>
                                                                            <Select size='small' value={item.category} name='category' className="form-select" disabled required sx={{

                                                                                ".MuiOutlinedInput-notchedOutline": {
                                                                                    border: "none",
                                                                                },
                                                                            }}>
                                                                                <MenuItem value="General">General</MenuItem>
                                                                                <MenuItem value="OBC">OBC</MenuItem>
                                                                                <MenuItem value="ST">ST</MenuItem>
                                                                                <MenuItem value="SC">SC</MenuItem>
                                                                                <MenuItem value="EWS">EWS</MenuItem>
                                                                                <MenuItem value="Others">Others</MenuItem>
                                                                            </Select>
                                                                        </div>

                                                                    </div>
                                                                    <div className="formBox">
                                                                        <div className="mb-3 col-lg-3 col-md-12">
                                                                            <label htmlFor="exampleInputPassword1" className="form-label">Religion <span className="must-filed">*</span></label>
                                                                            <Select size='small' disabled value={item.religion} name='religion' className="form-select" required sx={{

                                                                                ".MuiOutlinedInput-notchedOutline": {
                                                                                    border: "none",
                                                                                },
                                                                            }}>
                                                                                <MenuItem value="Hindu">Hindu</MenuItem>
                                                                                <MenuItem value="Sikh">Sikh</MenuItem>
                                                                                <MenuItem value="Christian">Christian</MenuItem>
                                                                                <MenuItem value="Muslim">Muslim</MenuItem>
                                                                                <MenuItem value="Jain">Jain</MenuItem>
                                                                                <MenuItem value="Buddhist">Buddhist</MenuItem>
                                                                                <MenuItem value="Others" onClick={hanldeShowOthers}>Others</MenuItem>
                                                                            </Select>
                                                                        </div>

                                                                    </div>
                                                                    <h2 className='footerFormHead'>Permanent Address</h2>
                                                                    <div className="formBox">
                                                                        <div className="mb-3 col-lg-3 col-md-12">
                                                                            <label htmlFor="exampleInputEmail1" className="form-label">House No./Apartment Name/Block No. <span className="must-filed">*</span></label>
                                                                            <RHFTextField disabled name="houseNumber" label="" value={item.permanentAddress.houseNumber} placeholder='House No./Apartment Name/Block No.' />

                                                                        </div>
                                                                        <div className="mb-3 col-lg-3 col-md-12">
                                                                            <label htmlFor="exampleInputPassword1" className="form-label">Road/Street/Lane <span className="must-filed">*</span></label>

                                                                            <RHFTextField disabled name="road" label="" value={item.permanentAddress.road} placeholder='Road/Street/Lane' />
                                                                        </div>
                                                                        <div className="mb-3 col-lg-3 col-md-12">
                                                                            <label htmlFor="exampleInputPassword1" className="form-label">Area/Landmark <span className="must-filed">*</span></label>

                                                                            <RHFTextField disabled name="area" label="" placeholder='Area/Landmark' value={item.permanentAddress.area} />
                                                                        </div>

                                                                    </div>
                                                                    <div className="formBox">
                                                                        <div className="mb-3 col-lg-3 col-md-12">
                                                                            <label htmlFor="exampleInputEmail1" className="form-label">Country <span className="must-filed">*</span></label>
                                                                            <RHFTextField disabled name="country" label="" value={item.permanentAddress.country} />

                                                                        </div>
                                                                        <div className="mb-3 col-lg-3 col-md-12">
                                                                            <label htmlFor="exampleInputPassword1" className="form-label">State <span className="must-filed">*</span></label>
                                                                            <Select size='small' disabled sx={{

                                                                                ".MuiOutlinedInput-notchedOutline": {
                                                                                    border: "none",
                                                                                },
                                                                            }} name="state" value={item.permanentAddress.state} required className="form-control">
                                                                                <MenuItem>--select--</MenuItem>
                                                                                <MenuItem value="Andaman and Nicobar Islands"  >Andaman and Nicobar Islands</MenuItem>
                                                                                <MenuItem value="Andhra Pradesh"  >Andhra Pradesh</MenuItem>
                                                                                <MenuItem value="Arunachal Pradesh"  >Arunachal Pradesh</MenuItem>
                                                                                <MenuItem value="Assam"  >Assam</MenuItem>
                                                                                <MenuItem value="Bihar"  >Bihar</MenuItem>
                                                                                <MenuItem value="Chandigarh"  >Chandigarh</MenuItem>
                                                                                <MenuItem value="Chhattisgarh"  >Chhattisgarh</MenuItem>
                                                                                <MenuItem value="Dadra and Nagar Haveli"  >Dadra and Nagar Haveli</MenuItem>
                                                                                <MenuItem value="Daman and Diu"  >Daman and Diu</MenuItem>
                                                                                <MenuItem value="Delhi"  >Delhi</MenuItem>
                                                                                <MenuItem value="Goa"  >Goa</MenuItem>
                                                                                <MenuItem value="Gujarat"  >Gujarat</MenuItem>
                                                                                <MenuItem value="Haryana"  >Haryana</MenuItem>
                                                                                <MenuItem value="Himachal Pradesh"  >Himachal Pradesh</MenuItem>
                                                                                <MenuItem value="Jammu and Kashmir"  >Jammu and Kashmir</MenuItem>
                                                                                <MenuItem value="Jharkhand"  >Jharkhand</MenuItem>
                                                                                <MenuItem value="Karnataka"  >Karnataka</MenuItem>
                                                                                <MenuItem value="Kenmore"  >Kenmore</MenuItem>
                                                                                <MenuItem value="Kerala"  >Kerala</MenuItem>
                                                                                <MenuItem value="Lakshadweep"  >Lakshadweep</MenuItem>
                                                                                <MenuItem value="Madhya Pradesh"  >Madhya Pradesh</MenuItem>
                                                                                <MenuItem value="Maharashtra"  >Maharashtra</MenuItem>
                                                                                <MenuItem value="Manipur"  >Manipur</MenuItem>
                                                                                <MenuItem value="Meghalaya"  >Meghalaya</MenuItem>
                                                                                <MenuItem value="Mizoram"  >Mizoram</MenuItem>
                                                                                <MenuItem value="Nagaland"  >Nagaland</MenuItem>
                                                                                <MenuItem value="Narora"  >Narora</MenuItem>
                                                                                <MenuItem value="Natwar"  >Natwar</MenuItem>
                                                                                <MenuItem value="Odisha"  >Odisha</MenuItem>
                                                                                <MenuItem value="Paschim Medinipur"  >Paschim Medinipur</MenuItem>
                                                                                <MenuItem value="Pondicherry"  >Pondicherry</MenuItem>
                                                                                <MenuItem value="Punjab"  >Punjab</MenuItem>
                                                                                <MenuItem value="Rajasthan"  >Rajasthan</MenuItem>
                                                                                <MenuItem value="Sikkim"  >Sikkim</MenuItem>
                                                                                <MenuItem value="Tamil Nadu"  >Tamil Nadu</MenuItem>
                                                                                <MenuItem value="Telangana"  >Telangana</MenuItem>
                                                                                <MenuItem value="Tripura"  >Tripura</MenuItem>
                                                                                <MenuItem value="Uttar Pradesh"  >Uttar Pradesh</MenuItem>
                                                                                <MenuItem value="Uttarakhand"  >Uttarakhand</MenuItem>
                                                                                <MenuItem value="Vaishali"  >Vaishali</MenuItem>
                                                                                <MenuItem value="West Bengal"  >West Bengal</MenuItem>
                                                                            </Select>
                                                                        </div>
                                                                        <div className="mb-3 col-lg-3 col-md-12">
                                                                            <label htmlFor="exampleInputPassword1" className="form-label">City <span className="must-filed">*</span></label>
                                                                            <RHFTextField disabled name="city" label="" placeholder='City' value={item.permanentAddress.city} />
                                                                        </div>


                                                                    </div>

                                                                    <div className="formBox">
                                                                        <div className="mb-3 col-lg-3 col-md-12">
                                                                            <label htmlFor="exampleInputPassword1" className="form-label">Pincode <span className="must-filed">*</span></label>
                                                                            <RHFTextField disabled name="pincode" value={item.permanentAddress.pincode} type='number' label="" placeholder='Pincode' inputProps={{ maxLength: 6 }} />

                                                                        </div>
                                                                    </div>

                                                                    <h2 className='footerFormHead'>Present Address</h2>
                                                                    <div className="formBox">
                                                                        <div className="mb-3 col-lg-3 col-md-12">
                                                                            <label htmlFor="exampleInputEmail1" className="form-label">House No./Apartment Name/Block No. <span className="must-filed">*</span></label>
                                                                            <RHFTextField disabled name="houseNumber" label="" value={item.presentAddress.houseNumber} placeholder='House No./Apartment Name/Block No.' />

                                                                        </div>
                                                                        <div className="mb-3 col-lg-3 col-md-12">
                                                                            <label htmlFor="exampleInputPassword1" className="form-label">Road/Street/Lane <span className="must-filed">*</span></label>

                                                                            <RHFTextField disabled name="road" label="" placeholder='Road/Street/Lane' value={item.presentAddress.road} />
                                                                        </div>
                                                                        <div className="mb-3 col-lg-3 col-md-12">
                                                                            <label htmlFor="exampleInputPassword1" className="form-label">Area/Landmark <span className="must-filed">*</span></label>

                                                                            <RHFTextField disabled name="area" label="" placeholder='Area/Landmark' value={item.presentAddress.area} />
                                                                        </div>


                                                                    </div>
                                                                    <div className="formBox">
                                                                        <div className="mb-3 col-lg-3 col-md-12">
                                                                            <label htmlFor="exampleInputEmail1" className="form-label">Country <span className="must-filed">*</span></label>
                                                                            <RHFTextField disabled name="country" label="" value={item.presentAddress.country} />

                                                                        </div>
                                                                        <div className="mb-3 col-lg-3 col-md-12">
                                                                            <label htmlFor="exampleInputPassword1" className="form-label">State <span className="must-filed">*</span></label>
                                                                            <Select disabled size='small' sx={{

                                                                                ".MuiOutlinedInput-notchedOutline": {
                                                                                    border: "none",
                                                                                },
                                                                            }} name="state" value={item.presentAddress.state} required className="form-control">

                                                                                <MenuItem value="Andaman and Nicobar Islands"  >Andaman and Nicobar Islands</MenuItem>
                                                                                <MenuItem value="Andhra Pradesh"  >Andhra Pradesh</MenuItem>
                                                                                <MenuItem value="Arunachal Pradesh"  >Arunachal Pradesh</MenuItem>
                                                                                <MenuItem value="Assam">Assam</MenuItem>
                                                                                <MenuItem value="Bihar">Bihar</MenuItem>
                                                                                <MenuItem value="Chandigarh"  >Chandigarh</MenuItem>
                                                                                <MenuItem value="Chhattisgarh"  >Chhattisgarh</MenuItem>
                                                                                <MenuItem value="Dadra and Nagar Haveli"  >Dadra and Nagar Haveli</MenuItem>
                                                                                <MenuItem value="Daman and Diu"  >Daman and Diu</MenuItem>
                                                                                <MenuItem value="Delhi"  >Delhi</MenuItem>
                                                                                <MenuItem value="Goa"  >Goa</MenuItem>
                                                                                <MenuItem value="Gujarat"  >Gujarat</MenuItem>
                                                                                <MenuItem value="Haryana"  >Haryana</MenuItem>
                                                                                <MenuItem value="Himachal Pradesh"  >Himachal Pradesh</MenuItem>
                                                                                <MenuItem value="Jammu and Kashmir"  >Jammu and Kashmir</MenuItem>
                                                                                <MenuItem value="Jharkhand"  >Jharkhand</MenuItem>
                                                                                <MenuItem value="Karnataka"  >Karnataka</MenuItem>
                                                                                <MenuItem value="Kenmore"  >Kenmore</MenuItem>
                                                                                <MenuItem value="Kerala"  >Kerala</MenuItem>
                                                                                <MenuItem value="Lakshadweep"  >Lakshadweep</MenuItem>
                                                                                <MenuItem value="Madhya Pradesh"  >Madhya Pradesh</MenuItem>
                                                                                <MenuItem value="Maharashtra"  >Maharashtra</MenuItem>
                                                                                <MenuItem value="Manipur"  >Manipur</MenuItem>
                                                                                <MenuItem value="Meghalaya"  >Meghalaya</MenuItem>
                                                                                <MenuItem value="Mizoram"  >Mizoram</MenuItem>
                                                                                <MenuItem value="Nagaland"  >Nagaland</MenuItem>
                                                                                <MenuItem value="Narora"  >Narora</MenuItem>
                                                                                <MenuItem value="Natwar"  >Natwar</MenuItem>
                                                                                <MenuItem value="Odisha"  >Odisha</MenuItem>
                                                                                <MenuItem value="Paschim Medinipur"  >Paschim Medinipur</MenuItem>
                                                                                <MenuItem value="Pondicherry"  >Pondicherry</MenuItem>
                                                                                <MenuItem value="Punjab"  >Punjab</MenuItem>
                                                                                <MenuItem value="Rajasthan"  >Rajasthan</MenuItem>
                                                                                <MenuItem value="Sikkim"  >Sikkim</MenuItem>
                                                                                <MenuItem value="Tamil Nadu"  >Tamil Nadu</MenuItem>
                                                                                <MenuItem value="Telangana"  >Telangana</MenuItem>
                                                                                <MenuItem value="Tripura"  >Tripura</MenuItem>
                                                                                <MenuItem value="Uttar Pradesh"  >Uttar Pradesh</MenuItem>
                                                                                <MenuItem value="Uttarakhand"  >Uttarakhand</MenuItem>
                                                                                <MenuItem value="Vaishali"  >Vaishali</MenuItem>
                                                                                <MenuItem value="West Bengal"  >West Bengal</MenuItem>
                                                                            </Select>
                                                                        </div>
                                                                        <div className="mb-3 col-lg-3 col-md-12">
                                                                            <label htmlFor="exampleInputPassword1" className="form-label">City <span className="must-filed">*</span></label>
                                                                            <RHFTextField disabled name="city" label="" placeholder='City' value={item.presentAddress.city} />
                                                                        </div>


                                                                    </div>

                                                                    <div className="formBox">
                                                                        <div className="mb-3 col-lg-3 col-md-12">
                                                                            <label htmlFor="exampleInputPassword1" className="form-label">Pincode <span className="must-filed">*</span></label>
                                                                            <RHFTextField disabled type='number' value={item.presentAddress.pincode} name="pincode" label="" placeholder='Pincode' inputProps={{ maxLength: 6 }} />
                                                                        </div>
                                                                    </div>

                                                                    <h2 className='footerFormHead'>Contact Details</h2>
                                                                    <div className="formBox">
                                                                        <div className="mb-3 col-lg-3 col-md-12">
                                                                            <label htmlFor="exampleInputEmail1" className="form-label">Email ID <span className="must-filed">*</span></label>

                                                                            <RHFTextField disabled name="emailId" type='email' label="" placeholder='Email ID' value={item.emailId} />

                                                                        </div>
                                                                        <div className="mb-3 col-lg-3 col-md-12">
                                                                            <label htmlFor="exampleInputPassword1" className="form-label">Mobile No. <span className="must-filed">*</span></label>

                                                                            <RHFTextField disabled name="mobileNumber" type='number' value={item.mobileNumber} label="" placeholder='Mobile No.' inputProps={{ maxLength: 10 }} />
                                                                        </div>
                                                                        <div className="mb-3 col-lg-3 col-md-12">
                                                                            <label htmlFor="exampleInputPassword1" className="form-label">Aadhar No. <span className="must-filed">*</span></label>
                                                                            <RHFTextField disabled name="aadharNumber" type='number' value={item.aadharNumber} label="" placeholder='Aadhar No.' inputProps={{ maxLength: 12 }} required />
                                                                        </div>

                                                                    </div>
                                                                    <div className="formBox">
                                                                        <div className="mb-3 col-lg-3 col-md-12">
                                                                            <label htmlFor="exampleInputEmail1" className="form-label">Alternate Email ID</label>

                                                                            <RHFTextField disabled name="alternateEmailId" label="" placeholder='Alternate Email ID' value={item.alternateEmailId} />

                                                                        </div>
                                                                        <div className="mb-3 col-lg-3 col-md-12">
                                                                            <label htmlFor="exampleInputPassword1" className="form-label">Alternate Mobile No.</label>

                                                                            <RHFTextField disabled name="alternateMobileNumber" type='number' value={item.alternateMobileNumber} label="" placeholder='Alternate Mobile No.' inputProps={{ maxLength: 10 }} />
                                                                        </div>
                                                                        <div className="mb-3 col-lg-3 col-md-12">
                                                                            <label htmlFor="exampleInputPassword1" className="form-label">Pan No.</label>

                                                                            <RHFTextField disabled name="pancard" label="" placeholder='Pan No.' value={item.pancard} inputProps={{ maxLength: 10 }} />
                                                                        </div>


                                                                    </div>

                                                                    <h2 className='footerFormHead' id="add-modal-label">Academic Qualification
                                                                    </h2>

                                                                    <div className="formBox">

                                                                        <div className="form-group col-md-12 col-lg-12 tableFlow">
                                                                            <table className="table table-bordered table-hover">
                                                                                <thead>
                                                                                    <tr>
                                                                                        <th>Class	</th>
                                                                                        <th>School Name	</th>
                                                                                        <th>Board		</th>
                                                                                        <th>% Mark		</th>
                                                                                        <th>Passing Year

                                                                                        </th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody className="add_row_div_experience">

                                                                                    <tr>
                                                                                        <td> <RHFTextField disabled name="className" value={item.academicQualification[0].className} label="" placeholder='Class Name' /></td>
                                                                                        <td> <RHFTextField disabled name="schoolName" value={item.academicQualification[0].schoolName} label="" placeholder='School Name' /></td>
                                                                                        <td> <RHFTextField disabled name="board" value={item.academicQualification[0].board} label="" placeholder='Board' /></td>
                                                                                        <td> <RHFTextField disabled name="percentage" value={item.academicQualification[0].percentage} type='number' label="" placeholder='Percentage' inputProps={{ maxLength: 3 }} /></td>
                                                                                        <td> <RHFTextField disabled name="passingYear" value={item.academicQualification[0].passingYear} type='number' label="" placeholder='Passing Year' inputProps={{ maxLength: 4 }} /></td>
                                                                                    </tr>

                                                                                </tbody>
                                                                            </table>

                                                                        </div>


                                                                    </div>

                                                                    <h2 className='footerFormHead' id="add-modal-label">Higher Qualification
                                                                    </h2>

                                                                    <div className="formBox">

                                                                        <div className="form-group col-md-12 col-lg-12 tableFlow">
                                                                            <table className="table table-bordered table-hover">
                                                                                <thead>
                                                                                    <tr>
                                                                                        <th>Course Name</th>
                                                                                        <th>Specialization</th>
                                                                                        <th>% Mark	</th>
                                                                                        <th>Passing Year	</th>
                                                                                        <th>Course Type
                                                                                        </th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody className="add_row_div_experience">


                                                                                    <tr>
                                                                                        <td> <RHFTextField disabled name="courseName" value={item.higherQualification[0].courseName} label="" placeholder='Course Name' /></td>
                                                                                        <td> <RHFTextField disabled name="specialization" value={item.higherQualification[0].specialization} label="" placeholder='Specialization' /></td>
                                                                                        <td> <RHFTextField disabled name="percentage" type='number' value={item.higherQualification[0].percentage} label="" placeholder='Percentage' inputProps={{ maxLength: 3 }} /></td>
                                                                                        <td> <RHFTextField disabled name="passingYear" type='number' value={item.higherQualification[0].passingYear} label="" placeholder='Year' inputProps={{ maxLength: 4 }} /></td>
                                                                                        <td> <RHFTextField disabled name="courseType" value={item.higherQualification[0].courseType} label="" placeholder='Course Type' /></td>
                                                                                    </tr>



                                                                                </tbody>
                                                                            </table>

                                                                        </div>


                                                                    </div>

                                                                    <h2 className='footerFormHead' id="add-modal-label">Experience Details</h2>
                                                                    <div className="formBox">
                                                                        <div className="mb-3 col-lg-3 col-md-12">
                                                                            <label htmlFor="exampleInputEmail1" className="form-label">Experience</label>
                                                                            {
                                                                                hideForm &&
                                                                                <Select size='small' sx={{

                                                                                    ".MuiOutlinedInput-notchedOutline": {
                                                                                        border: "none",
                                                                                    },
                                                                                }} value={item.experienceDetails[0].experienced} className="form-control select-experience" name="experienced" disabled>

                                                                                    <MenuItem value="Yes">Yes</MenuItem>
                                                                                    <MenuItem value="No" onClick={hanldeNo}>No</MenuItem>
                                                                                </Select>
                                                                            }
                                                                            {
                                                                                noExperience &&
                                                                                <RHFTextField disabled type="number" name="totalExperience" label="" placeholder='No Experience' />
                                                                            }

                                                                        </div>
                                                                        {hideForm && <div className="mb-3 col-lg-3 col-md-12">
                                                                            <label htmlFor="exampleInputPassword1" className="form-label">Total Experience (IN YEAR)</label>
                                                                            <RHFTextField disabled type="number" name="totalExperience" value={item.experienceDetails[0].totalExperience} label="" placeholder='Total Experience (IN YEAR)' />
                                                                        </div>}


                                                                    </div>
                                                                    {
                                                                        hideForm &&
                                                                        <div className="formBox">

                                                                            <div className="form-group col-md-12 col-lg-12 tableFlow">
                                                                                <table className="table table-bordered table-hover">
                                                                                    <thead>
                                                                                        <tr>
                                                                                            <th>Company Name</th>
                                                                                            <th>Designation</th>
                                                                                            <th>Location</th>
                                                                                            <th>Duration From</th>
                                                                                            <th>Duration To</th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody className="add_row_div_experience">

                                                                                        <tr>
                                                                                            <td> <RHFTextField disabled name="companyName" value={item.experienceDetails[0].companyName} label="" placeholder='durationFromCompany Name' /></td>
                                                                                            <td> <RHFTextField disabled name="designation" value={item.experienceDetails[0].designation} label="" placeholder='Designation' /></td>
                                                                                            <td> <RHFTextField disabled name="location" value={item.experienceDetails[0].location} label="" placeholder='Location' /></td>
                                                                                            <td> <RHFTextField disabled name="durationFrom" value={item.experienceDetails[0].durationFrom} label="" placeholder='Duration From' /></td>
                                                                                            <td> <RHFTextField disabled name="durationTo" value={item.experienceDetails[0].durationTo} label="" placeholder='Duration To' /></td>
                                                                                        </tr>


                                                                                    </tbody>
                                                                                </table>

                                                                            </div>


                                                                        </div>

                                                                    }

                                                                    <div className="file">
                                                                        <div>
                                                                            <Files
                                                                                className="files-dropzone"

                                                                                accepts={['image/*', '.jpeg']}
                                                                                multiple={false}

                                                                                clickable
                                                                            >
                                                                                <AttachmentThumbnail color="primary">

                                                                                    <ImgStyle src={String(item.uploadPhoto.url)} alt="img" />

                                                                                </AttachmentThumbnail>
                                                                                <AttachmentWrapper>
                                                                                    <AddBoxOutlinedIcon color="primary" />
                                                                                    <Typography px={1} variant="body2">
                                                                                        Upload Photo
                                                                                    </Typography>
                                                                                </AttachmentWrapper>
                                                                            </Files>
                                                                        </div>

                                                                        <div style={{ marginLeft: '2rem' }}>
                                                                            <Files
                                                                                className="files-dropzone"
                                                                                accepts={['image/*', '.jpeg']}
                                                                                multiple={false}
                                                                                clickable
                                                                            >
                                                                                <AttachmentThumbnail color="primary">

                                                                                    <ImgStyle src={String(item.uploadSignature.url)} alt="img" />

                                                                                </AttachmentThumbnail>
                                                                                <AttachmentWrapper>
                                                                                    <AddBoxOutlinedIcon color="primary" />
                                                                                    <Typography px={1} variant="body2">
                                                                                        Upload Signature
                                                                                    </Typography>
                                                                                </AttachmentWrapper>
                                                                            </Files>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </FormProvider>
                                                        </>
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
                                    )
                                }
                            </>
                        )
                    }


                </div>
            </section>


        </>
    )
}

export default View