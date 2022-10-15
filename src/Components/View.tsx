import React, { useRef, useState, useEffect } from 'react';
import {
    CircularProgress,
    Box,
} from "@mui/material";
import * as Yup from 'yup';
import axios from '../utils/axios';
import { Select, MenuItem, InputLabel, Typography, styled } from '@mui/material';
import FormProvider from './hook-form/FormProvider';
import RHFTextField from './hook-form/RHFTextField';
import { useLocation, useNavigate } from 'react-router-dom';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProfileValues } from '../@types/object';
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


const View = () => {
    const [hideForm, setHideForm] = useState(true);
    const [others, setOthers] = useState(false);
    const [noExperience, setNoexperience] = useState(false);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<ProfileValues[]>([]);
    const [category, setCategory] = useState("")
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
    const handlePrint = (event: any) => {
        event.preventDefault();
        window.print();
    }
    const navigate = useNavigate();
    const handleGoBack = (applicationId: string, userId: string) => {
        navigate('/my-application', { state: { applicationId, userId } })
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
                                                        <div key={id}>
                                                            <h1 className='formHead'>Application Form for <span className='dynamic_data'>
                                                                {item.postName}
                                                            </span></h1>
                                                            <FormProvider methods={methods}>
                                                                <div className="parentForm">
                                                                    <h2 className='footerFormHead'>Personal Details</h2>
                                                                    <div className="formBox">
                                                                        <div className="mb-3 col-lg-3 col-md-12">
                                                                            <label htmlFor="exampleInputEmail1" className="form-label">Registration Id <span className="must-filed">*</span></label>

                                                                            <RHFTextField disabled name="applicationId" label="" placeholder='Enter Name' value={item.applicationId} />

                                                                        </div>
                                                                        <div className="mb-3 col-lg-3 col-md-12">
                                                                            <label htmlFor="exampleInputEmail1" className="form-label">Name <span className="must-filed">*</span></label>

                                                                            <RHFTextField disabled name="applicantName" label="" placeholder='Enter Name' value={item.applicantName} />

                                                                        </div>
                                                                        <div className="mb-3 col-lg-3 col-md-12">
                                                                            <label htmlFor="exampleInputPassword1" className="form-label">Father Name <span className="must-filed">*</span></label>

                                                                            <RHFTextField disabled name="fatherName" label="" placeholder='Enter Father Name' value={item.fatherName} />
                                                                        </div>



                                                                    </div>

                                                                    <div className="formBox">
                                                                        <div className="mb-3 col-lg-3 col-md-12">
                                                                            <label htmlFor="exampleInputPassword1" className="form-label">Mother Name <span className="must-filed">*</span></label>

                                                                            <RHFTextField disabled name="motherName" label="" placeholder='Enter Mother Name' value={item.motherName} />
                                                                        </div>
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
                                                                        <div className="mt-2 col-lg-3 col-md-12">
                                                                            <label htmlFor="exampleInputPassword1" className="form-label">Other Category <span className="must-filed">*</span></label>
                                                                            <RHFTextField name="otherCategory" value={item.category} label="" placeholder='Other Category' disabled />

                                                                        </div>


                                                                    </div>
                                                                    <div className="formBox">

                                                                        <div className="mb-3 col-lg-3 col-md-12">
                                                                            <label htmlFor="exampleInputPassword1" className="form-label">Other Religion <span className="must-filed">*</span></label>
                                                                            <RHFTextField name="otherReligion" value={item.religion} label="" placeholder='Other Religion' disabled />

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
                                                                            }} name="state" value={item.permanentAddress.state} className="form-control">

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
                                                                            <table className="table">

                                                                                <tr>
                                                                                    <th>Course Name</th>
                                                                                    <th>School Name	</th>
                                                                                    <th>Board		</th>
                                                                                    <th>% Mark		</th>
                                                                                    <th>Passing Year

                                                                                    </th>
                                                                                </tr>

                                                                                <tr>

                                                                                    <td> <RHFTextField name="className" value={item.academicQualification[0].className ? item.academicQualification[0].className : ''} label="" placeholder='High School' disabled /></td>

                                                                                    <td> <RHFTextField name="schoolName" value={item.academicQualification[0].schoolName ? item.academicQualification[0].schoolName : ''} label="" placeholder='School Name' disabled /></td>


                                                                                    <td> <RHFTextField name="board" value={item.academicQualification[0].board ? item.academicQualification[0].board : ''} label="" placeholder='Board' disabled /></td>



                                                                                    <td> <RHFTextField name="percentage" value={item.academicQualification[0].percentage ? item.academicQualification[0].percentage : ''} type='number' label="" placeholder='Percentage' disabled /></td>


                                                                                    <td> <RHFTextField name="passingYear" value={item.academicQualification[0].passingYear ? item.academicQualification[0].passingYear : ''} type='number' label="" placeholder='Passing Year' disabled /></td>



                                                                                </tr>
                                                                            </table>

                                                                        </div>


                                                                    </div>


                                                                    <div className="formBox">

                                                                        <div className="form-group col-md-12 col-lg-12 tableFlow">
                                                                            <table className="table">

                                                                                <tr>
                                                                                    <th>Course Name</th>
                                                                                    <th>Institution Name	</th>
                                                                                    <th>Board</th>
                                                                                    <th>% Mark</th>
                                                                                    <th>Passing Year

                                                                                    </th>
                                                                                </tr>

                                                                                <tr>

                                                                                    <td> <RHFTextField name="className" value={item.academicQualification[1].className ? item.academicQualification[1].className : ''} label="" placeholder='High School' disabled /></td>

                                                                                    <td> <RHFTextField name="schoolName" value={item.academicQualification[1].schoolName ? item.academicQualification[1].schoolName : ''} label="" placeholder='School Name' disabled /></td>


                                                                                    <td> <RHFTextField name="board" value={item.academicQualification[1].board ? item.academicQualification[1].board : ''} label="" placeholder='Board' disabled /></td>



                                                                                    <td> <RHFTextField name="percentage" value={item.academicQualification[1].percentage ? item.academicQualification[1].percentage : ''} type='number' label="" placeholder='Percentage' disabled /></td>


                                                                                    <td> <RHFTextField name="passingYear" value={item.academicQualification[1].passingYear ? item.academicQualification[1].passingYear : ''} type='number' label="" placeholder='Passing Year' disabled /></td>




                                                                                </tr>
                                                                            </table>

                                                                        </div>


                                                                    </div>

                                                                    <div className="formBox">

                                                                        <div className="form-group col-md-12 col-lg-12 tableFlow">
                                                                            <table className="table">

                                                                                <tr>
                                                                                    <th>Course Name</th>
                                                                                    <th>Institution Name	</th>
                                                                                    <th>Board</th>
                                                                                    <th>% Mark</th>
                                                                                    <th>Passing Year

                                                                                    </th>
                                                                                </tr>

                                                                                <tr>

                                                                                    <td> <RHFTextField name="className" value={item.academicQualification[2].className ? item.academicQualification[2].className : ''} label="" placeholder='High School' disabled /></td>

                                                                                    <td> <RHFTextField name="schoolName" value={item.academicQualification[2].schoolName ? item.academicQualification[2].schoolName : ''} label="" placeholder='School Name' disabled /></td>


                                                                                    <td> <RHFTextField name="board" value={item.academicQualification[2].board ? item.academicQualification[2].board : ''} label="" placeholder='Board' disabled /></td>



                                                                                    <td> <RHFTextField name="percentage" value={item.academicQualification[2].percentage ? item.academicQualification[2].percentage : ''} type='number' label="" placeholder='Percentage' disabled /></td>


                                                                                    <td> <RHFTextField name="passingYear" value={item.academicQualification[2].passingYear ? item.academicQualification[2].passingYear : ''} type='number' label="" placeholder='Passing Year' disabled /></td>




                                                                                </tr>
                                                                            </table>

                                                                        </div>


                                                                    </div>

                                                                    <div className="formBox">

                                                                        <div className="form-group col-md-12 col-lg-12 tableFlow">
                                                                            <table className="table">

                                                                                <tr>
                                                                                    <th>Course Name</th>
                                                                                    <th>Institution Name	</th>
                                                                                    <th>Board</th>
                                                                                    <th>% Mark</th>
                                                                                    <th>Passing Year

                                                                                    </th>
                                                                                </tr>

                                                                                <tr>

                                                                                    <td> <RHFTextField name="className" value={item.academicQualification[3].className ? item.academicQualification[3].className : ''} label="" placeholder='High School' disabled /></td>

                                                                                    <td> <RHFTextField name="schoolName" value={item.academicQualification[2].schoolName ? item.academicQualification[3].schoolName : ''} label="" placeholder='School Name' disabled /></td>


                                                                                    <td> <RHFTextField name="board" value={item.academicQualification[3].board ? item.academicQualification[3].board : ''} label="" placeholder='Board' disabled /></td>



                                                                                    <td> <RHFTextField name="percentage" value={item.academicQualification[3].percentage ? item.academicQualification[3].percentage : ''} type='number' label="" placeholder='Percentage' disabled /></td>


                                                                                    <td> <RHFTextField name="passingYear" value={item.academicQualification[3].passingYear ? item.academicQualification[3].passingYear : ''} type='number' label="" placeholder='Passing Year' disabled /></td>




                                                                                </tr>
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
                                                                                        <th>Course Name
                                                                                        </th>
                                                                                        <th>Specialization</th>
                                                                                        <th>% Mark	</th>
                                                                                        <th>Passing Year	</th>
                                                                                        <th>Course Type
                                                                                        </th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody className="add_row_div_experience">
                                                                                    <tr>
                                                                                        <td> <RHFTextField name="masterDegreeName" value={item.higherQualification[0].courseName ? item.higherQualification[0].courseName : ''} label="" placeholder='Course Name' disabled /></td>
                                                                                        <td> <RHFTextField name="specialization" value={item.higherQualification[0].specialization ? item.higherQualification[0].specialization : ''} label="" placeholder='Specialization' disabled /></td>
                                                                                        <td> <RHFTextField name="percentage" type='number' value={item.higherQualification[0].percentage ? item.higherQualification[0].percentage : ''} label="" placeholder='Percentage' disabled /></td>
                                                                                        <td> <RHFTextField name="passingYear" type='number' value={item.higherQualification[0].passingYear ? item.higherQualification[0].passingYear : ''} label="" placeholder='Year' disabled /></td>


                                                                                        <td>
                                                                                            <Select fullWidth size='small' labelId='demo-simple-select-label' label="Course Type" name='courseType' value={item.higherQualification[0].courseType ? item.higherQualification[0].courseType : ''} className="form-select" disabled sx={{

                                                                                                ".MuiOutlinedInput-notchedOutline": {
                                                                                                    border: "none",
                                                                                                },
                                                                                            }}>
                                                                                                <MenuItem value="Regular">Regular</MenuItem>
                                                                                                <MenuItem value="Correspondence">Correspondence</MenuItem>
                                                                                                <MenuItem value="Part Time">Part Time</MenuItem>
                                                                                            </Select></td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>

                                                                        </div>
                                                                    </div>

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
                                                                                        <td> <RHFTextField name="masterDegreeName" value={item.higherQualification[1].courseName ? item.higherQualification[1].courseName : ''} label="" placeholder='Course Name' disabled /></td>
                                                                                        <td> <RHFTextField name="specialization" value={item.higherQualification[1].specialization ? item.higherQualification[1].specialization : ''} label="" placeholder='Specialization' disabled /></td>
                                                                                        <td> <RHFTextField name="percentage" type='number' value={item.higherQualification[1].percentage ? item.higherQualification[1].percentage : ''} label="" placeholder='Percentage' disabled /></td>
                                                                                        <td> <RHFTextField name="passingYear" type='number' value={item.higherQualification[1].passingYear ? item.higherQualification[1].passingYear : ''} label="" placeholder='Year' disabled /></td>


                                                                                        <td>
                                                                                            <Select fullWidth size='small' labelId='demo-simple-select-label' label="Course Type" name='courseType' value={item.higherQualification[1].courseType ? item.higherQualification[1].courseType : ''} className="form-select" disabled sx={{

                                                                                                ".MuiOutlinedInput-notchedOutline": {
                                                                                                    border: "none",
                                                                                                },
                                                                                            }}>
                                                                                                <MenuItem value="Regular">Regular</MenuItem>
                                                                                                <MenuItem value="Correspondence">Correspondence</MenuItem>
                                                                                                <MenuItem value="Part Time">Part Time</MenuItem>
                                                                                            </Select></td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>

                                                                        </div>
                                                                    </div>

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
                                                                                        <td> <RHFTextField name="masterDegreeName" value={item.higherQualification[2].courseName ? item.higherQualification[2].courseName : ''} label="" placeholder='Course Name' disabled /></td>
                                                                                        <td> <RHFTextField name="specialization" value={item.higherQualification[2].specialization ? item.higherQualification[2].specialization : ''} label="" placeholder='Specialization' disabled /></td>
                                                                                        <td> <RHFTextField name="percentage" type='number' value={item.higherQualification[2].percentage ? item.higherQualification[2].percentage : ''} label="" placeholder='Percentage' disabled /></td>
                                                                                        <td> <RHFTextField name="passingYear" type='number' value={item.higherQualification[2].passingYear ? item.higherQualification[2].passingYear : ''} label="" placeholder='Year' disabled /></td>


                                                                                        <td>
                                                                                            <Select fullWidth size='small' labelId='demo-simple-select-label' label="Course Type" name='courseType' value={item.higherQualification[2].courseType ? item.higherQualification[2].courseType : ''} className="form-select" disabled sx={{

                                                                                                ".MuiOutlinedInput-notchedOutline": {
                                                                                                    border: "none",
                                                                                                },
                                                                                            }}>
                                                                                                <MenuItem value="Regular">Regular</MenuItem>
                                                                                                <MenuItem value="Correspondence">Correspondence</MenuItem>
                                                                                                <MenuItem value="Part Time">Part Time</MenuItem>
                                                                                            </Select></td>
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
                                                                                        <td> <RHFTextField disabled name="companyName" value={item.experienceDetails[0].companyName ? item.experienceDetails[0].companyName : ''} label="" placeholder='durationFromCompany Name' /></td>
                                                                                        <td> <RHFTextField disabled name="designation" value={item.experienceDetails[0].designation ? item.experienceDetails[0].designation : ''} label="" placeholder='Designation' /></td>
                                                                                        <td> <RHFTextField disabled name="location" value={item.experienceDetails[0].location ? item.experienceDetails[0].location : ''} label="" placeholder='Location' /></td>
                                                                                        <td> <RHFTextField disabled name="durationFrom" value={item.experienceDetails[0].durationFrom ? item.experienceDetails[0].durationFrom : ''} label="" placeholder='Duration From' /></td>
                                                                                        <td> <RHFTextField disabled name="durationTo" value={item.experienceDetails[0].durationTo ? item.experienceDetails[0].durationTo : ''} label="" placeholder='Duration To' /></td>
                                                                                    </tr>


                                                                                </tbody>
                                                                            </table>

                                                                        </div>


                                                                    </div>

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
                                                                                        <td> <RHFTextField disabled name="companyName" value={item.experienceDetails[1] ? item.experienceDetails[1].companyName : ''} label="" placeholder='durationFromCompany Name' /></td>
                                                                                        <td> <RHFTextField disabled name="designation" value={item.experienceDetails[1] ? item.experienceDetails[1].designation : ''} label="" placeholder='Designation' /></td>
                                                                                        <td> <RHFTextField disabled name="location" value={item.experienceDetails[1] ? item.experienceDetails[1].location : ''} label="" placeholder='Location' /></td>
                                                                                        <td> <RHFTextField disabled name="durationFrom" value={item.experienceDetails[1] ? item.experienceDetails[1].durationFrom : ''} label="" placeholder='Duration From' /></td>
                                                                                        <td> <RHFTextField disabled name="durationTo" value={item.experienceDetails[1] ? item.experienceDetails[1].durationTo : ''} label="" placeholder='Duration To' /></td>
                                                                                    </tr>


                                                                                </tbody>
                                                                            </table>

                                                                        </div>


                                                                    </div>

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
                                                                                        <td> <RHFTextField disabled name="companyName" value={item.experienceDetails[2] ? item.experienceDetails[2].companyName : ''} label="" placeholder='durationFromCompany Name' /></td>
                                                                                        <td> <RHFTextField disabled name="designation" value={item.experienceDetails[2] ? item.experienceDetails[2].designation : ''} label="" placeholder='Designation' /></td>
                                                                                        <td> <RHFTextField disabled name="location" value={item.experienceDetails[2] ? item.experienceDetails[2].location : ''} label="" placeholder='Location' /></td>
                                                                                        <td> <RHFTextField disabled name="durationFrom" value={item.experienceDetails[2] ? item.experienceDetails[2].durationFrom : ''} label="" placeholder='Duration From' /></td>
                                                                                        <td> <RHFTextField disabled name="durationTo" value={item.experienceDetails[2] ? item.experienceDetails[2].durationTo : ''} label="" placeholder='Duration To' /></td>
                                                                                    </tr>


                                                                                </tbody>
                                                                            </table>

                                                                        </div>


                                                                    </div>

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
                                                                                        <td> <RHFTextField disabled name="companyName" value={item.experienceDetails[3] ? item.experienceDetails[3].companyName : ''} label="" placeholder='durationFromCompany Name' /></td>
                                                                                        <td> <RHFTextField disabled name="designation" value={item.experienceDetails[3] ? item.experienceDetails[3].designation : ''} label="" placeholder='Designation' /></td>
                                                                                        <td> <RHFTextField disabled name="location" value={item.experienceDetails[3] ? item.experienceDetails[3].location : ''} label="" placeholder='Location' /></td>
                                                                                        <td> <RHFTextField disabled name="durationFrom" value={item.experienceDetails[3] ? item.experienceDetails[3].durationFrom : ''} label="" placeholder='Duration From' /></td>
                                                                                        <td> <RHFTextField disabled name="durationTo" value={item.experienceDetails[3] ? item.experienceDetails[3].durationTo : ''} label="" placeholder='Duration To' /></td>
                                                                                    </tr>


                                                                                </tbody>
                                                                            </table>

                                                                        </div>


                                                                    </div>



                                                                    <div className="file">
                                                                        <div>
                                                                            <Files
                                                                                className="files-dropzone"
                                                                                disabled
                                                                                accepts={['image/*', '.jpeg']}
                                                                                multiple={false}

                                                                                clickable={false}
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
                                                                                clickable={false}
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

                                                            <div className="submitForm">

                                                                <button className="formSubmit" onClick={handlePrint}>Print</button>
                                                                <button className="formSubmit" onClick={() => handleGoBack(item.applicationId, item.mobileNumber)}>Go Back</button>

                                                            </div>


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