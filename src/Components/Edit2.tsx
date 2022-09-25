import React, { useRef, useState, useEffect } from 'react';
import * as Yup from 'yup';
import {
    CircularProgress,
    Box,
} from "@mui/material";
import axios from '../utils/axios';
import { ToastContainer, toast } from "react-toastify";
import { Select, MenuItem, InputLabel } from '@mui/material';
import FormProvider from './hook-form/FormProvider';
import RHFTextField from './hook-form/RHFTextField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';


type ProfileValuesProps = {
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
        }
    ],
    alternateEmailId: string;
    alternateMobileNumber: string;
    applicantName: string;
    category: string;
    dateOfBirth: string;
    experienced: string;
    fatherName: string;
    gender: string;
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
    totalExperience: string,
    afterSubmit?: string;



};

type ProfileValues = {
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
        }
    ],
    alternateEmailId: string;
    mobileNumber: string;
    emailId: string;
    alternateMobileNumber: string;
    applicantName: string;
    category: string;
    dateOfBirth: string;
    experienced: string;
    fatherName: string;
    gender: string;
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
    totalExperience: string,
    afterSubmit?: string;



};
const Edit = () => {
    const [isFormEnabled, setIsFormEnabled] = useState<boolean>(false);
    const [users, setUsers] = useState<ProfileValues[]>([]);
    const [noOfRows, setNoOfRows] = useState(1);
    const [noOfRows2, setNoOfRows2] = useState(1);
    const [noOfRows3, setNoOfRows3] = useState(1);
    const [exp, setExp] = useState("");
    const [totalExp, setTotalExp] = useState("");
    const [category, setCategory] = useState("");
    const [presentHouseNo, setPresentHouseNo] = useState("");
    const [houseNo, setHouseNo] = useState("");
    const [road, setRoad] = useState("");
    const [area, setArea] = useState("");
    const [city, setCity] = useState("");
    const [permanentRoad, setPermanentRoad] = useState("");
    const [permanentArea, setPermanentArea] = useState("");
    const [permanentCity, setPermanentCity] = useState("");
    const [gender, setGender] = useState("");
    const [pincode, setPinCode] = useState("");
    const [pinCodePresent, setPinCodePresent] = useState("");
    const [religion, setReligion] = useState("");
    const [state, setState] = useState("");
    const [adhar, setAdhar] = useState("");
    const [percentage, setPercentage] = useState("");
    const [percentageHq, setPercentageHq] = useState("");
    const [passingYear, setPassingYear] = useState("");
    const [passingYearHq, setPassingYearHq] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [country, setCountry] = useState("India");
    const [countryPresent, setCountryPresent] = useState("India");
    const [alternateMobileNumber, setAlternateMobileNumber] = useState("");
    const [statePresent, setStatePresent] = useState("");
    const [schoolName, setSchoolName] = useState("");
    const [className, setClassName] = useState("");
    const [boardName, setBoardName] = useState("");
    const [courseName, setCourseName] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [courseType, setCourseType] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [designation, setDesignation] = useState("");
    const [location, setLocation] = useState("");
    const [durationFrom, setDurationFrom] = useState("");
    const [durationTo, setdurationTo] = useState("");
    const [hideForm, setHideForm] = useState(true);
    const [others, setOthers] = useState(false);
    const [noExperience, setNoexperience] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refreshFlag, setRefreshFlag] = useState<boolean>(false);

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
        alternateEmailId: '',
        pancard: '',




    };
    const methods = useForm<ProfileValuesProps>({
        resolver: yupResolver(ProfileSchema),
        defaultValues,
    });

    const { reset, handleSubmit, setValue, getValues } = methods;

    const isMounted = useRef(false);
    const values = getValues();

    const onSubmit = async (data: ProfileValuesProps, e: any) => {
        e.preventDefault();
        alert('Are you sure the data entered is correct if YES click submit button.')
        setLoading(true);


        try {
            await axios.post('api/application/save-application-details', {
                applicantName: data.applicantName,
                fatherName: data.fatherName,
                motherName: data.motherName,
                dateOfBirth: data.dateOfBirth,
                religion: religion,
                gender: gender,
                category: category,
                paymentStatus: false,
                postName: 'Project Manager',
                presentAddress: {
                    houseNumber: presentHouseNo,
                    road: road,
                    area: area,
                    country: countryPresent,
                    state: statePresent,
                    city: city,
                    pincode: parseInt(pinCodePresent),
                },
                permanentAddress: {
                    houseNumber: houseNo,
                    road: permanentRoad,
                    area: permanentArea,
                    country: country,
                    state: state,
                    city: permanentCity,
                    pincode: parseInt(pincode),
                },
                alternateMobileNumber: parseInt(alternateMobileNumber),
                alternateEmailId: data.alternateEmailId,
                aadharNumber: parseInt(adhar),
                pancard: data.pancard,
                academicQualification: [
                    {
                        schoolName: schoolName,
                        className: className,
                        board: boardName,
                        passingYear: parseInt(passingYear),
                        percentage: parseInt(percentage),

                    }
                ],
                higherQualification: [
                    {
                        courseName: courseName,
                        specialization: specialization,
                        courseType: courseType,
                        passingYear: parseInt(passingYearHq),
                        percentage: parseInt(percentageHq),

                    }
                ],


                experienceDetails: [
                    {
                        companyName: companyName,
                        designation: designation,
                        location: location,
                        durationFrom: durationFrom,
                        durationTo: durationTo,
                        totalExperience: parseInt(totalExp),
                        experienced: exp,
                    },
                ],
                password: Math.random().toString(36).substring(2, 9)
            });
            toast.success('Success');
            setIsFormEnabled(!isFormEnabled);
            setRefreshFlag(true);
            reset();
            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            console.log(error);

            toast.error("Something went wrong!");
        }
    };

    useEffect(() => {
        const getUser = async () => {
            setLoading(true);
            try {
                const response = await axios.post(`/api/application/fetch-application-details`,
                    {
                        applicationId: [20],
                        userId: 5905,

                    }

                )
                const { body } = response.data;
                if (!isMounted.current) {
                    setUsers(body);

                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error(error);
            }
        };
        getUser();
        setRefreshFlag(false);
    }, [refreshFlag, setValue]);



    const hanldeNo = () => {
        setHideForm(false);
        setNoexperience(true);

    }

    const hanldeShowOthers = () => {
        setOthers(true);

    }

    return (
        <>
            {
                loading ? (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            heigh: '50vh',
                        }}
                    >
                        <CircularProgress />
                    </Box>

                ) : (
                    <section className='formSection'>
                        <div className="row container">
                            <ToastContainer position="top-center" />
                            <h1 className='formHead'>Application Form for Project Manager</h1>
                            {
                                users.map((item, id) => {
                                    return (
                                        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

                                            <div className="parentForm" key={id}>
                                                <h2 className='footerFormHead'>Personal Details</h2>
                                                <div className="formBox">
                                                    <div className="mb-3 col-lg-3 col-md-12">
                                                        <label htmlFor="exampleInputEmail1" className="form-label">Name <span className="must-filed">*</span></label>

                                                        {
                                                            isFormEnabled ? (
                                                                <RHFTextField name="applicantName" label="" placeholder='Enter Name' />
                                                            ) : (
                                                                <RHFTextField value={item.applicantName} name="applicantName" label="" placeholder='Enter Name' />
                                                            )
                                                        }

                                                    </div>
                                                    <div className="mb-3 col-lg-3 col-md-12">
                                                        <label htmlFor="exampleInputPassword1" className="form-label">Father Name <span className="must-filed">*</span></label>


                                                        {
                                                            isFormEnabled ? (
                                                                <RHFTextField name="fatherName" label="" placeholder='Enter Father Name' />
                                                            ) : (
                                                                <RHFTextField value={item.fatherName} name="fatherName" label="" placeholder='Enter Name' />
                                                            )
                                                        }
                                                    </div>
                                                    <div className="mb-3 col-lg-3 col-md-12">
                                                        <label htmlFor="exampleInputPassword1" className="form-label">Mother Name <span className="must-filed">*</span></label>



                                                        {
                                                            isFormEnabled ? (
                                                                <RHFTextField name="motherName" label="" placeholder='Enter Mother Name' />
                                                            ) : (
                                                                <RHFTextField value={item.motherName} name="motherName" label="" placeholder='Enter Name' />
                                                            )
                                                        }
                                                    </div>

                                                </div>

                                                <div className="formBox">
                                                    <div className="mb-3 col-lg-3 col-md-12">
                                                        <label htmlFor="exampleInputEmail1" className="form-label">Date Of Birth <span className="must-filed">*</span></label>

                                                        {
                                                            isFormEnabled ? (
                                                                <RHFTextField name="dateOfBirth" label="" placeholder='dd/mm/yyyy' />
                                                            ) : (
                                                                <RHFTextField value={item.dateOfBirth} name="dateOfBirth" label="" placeholder='Enter Name' />
                                                            )
                                                        }

                                                    </div>
                                                    <div className="mb-3 col-lg-3 col-md-12">
                                                        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                                        {
                                                            isFormEnabled ? (
                                                                <Select fullWidth size='small' labelId='demo-simple-select-label' label="Gender" name='gender' value={gender} onChange={(e) => setGender(e.target.value)} className="form-select" required sx={{

                                                                    ".MuiOutlinedInput-notchedOutline": {
                                                                        border: "none",
                                                                    },
                                                                }}>
                                                                    <MenuItem value="Male">Male</MenuItem>
                                                                    <MenuItem value="Female">Female</MenuItem>
                                                                </Select>
                                                            ) : (
                                                                <Select fullWidth size='small' labelId='demo-simple-select-label' label="Gender" name='gender' value={item.gender} className="form-select" required sx={{

                                                                    ".MuiOutlinedInput-notchedOutline": {
                                                                        border: "none",
                                                                    },
                                                                }}>
                                                                    <MenuItem value="Male">Male</MenuItem>
                                                                    <MenuItem value="Female">Female</MenuItem>
                                                                </Select>
                                                            )
                                                        }

                                                    </div>
                                                    <div className="mb-3 col-lg-3 col-md-12">
                                                        <label htmlFor="exampleInputPassword1" className="form-label">Category <span className="must-filed">*</span></label>

                                                        {
                                                            isFormEnabled ? (
                                                                <Select size='small' value={category} onChange={(e) => setCategory(e.target.value)} name='category' className="form-select" required sx={{

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
                                                            ) : (
                                                                <Select size='small' value={item.category} name='category' className="form-select" required sx={{

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
                                                            )
                                                        }

                                                    </div>

                                                </div>
                                                <div className="formBox">
                                                    <div className="mb-3 col-lg-3 col-md-12">
                                                        <label htmlFor="exampleInputPassword1" className="form-label">Religion <span className="must-filed">*</span></label>

                                                        {
                                                            isFormEnabled ? (
                                                                <Select size='small' value={religion} onChange={(e) => setReligion(e.target.value)} name='religion' className="form-select" required sx={{

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
                                                            ) : (
                                                                <Select size='small' value={item.religion} name='religion' className="form-select" required sx={{

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
                                                            )
                                                        }

                                                    </div>

                                                </div>
                                                <h2 className='footerFormHead'>Permanent Address</h2>
                                                <div className="formBox">
                                                    <div className="mb-3 col-lg-3 col-md-12">
                                                        <label htmlFor="exampleInputEmail1" className="form-label">House No./Apartment Name/Block No. <span className="must-filed">*</span></label>


                                                        {
                                                            isFormEnabled ? (
                                                                <RHFTextField name="houseNumber" label="" value={houseNo} onChange={(e) => setHouseNo(e.target.value)} placeholder='House No./Apartment Name/Block No.' />
                                                            ) : (
                                                                <RHFTextField name="houseNumber" label="" value={item.permanentAddress.houseNumber} placeholder='House No./Apartment Name/Block No.' />
                                                            )
                                                        }

                                                    </div>
                                                    <div className="mb-3 col-lg-3 col-md-12">
                                                        <label htmlFor="exampleInputPassword1" className="form-label">Road/Street/Lane <span className="must-filed">*</span></label>

                                                        {
                                                            isFormEnabled ? (
                                                                <RHFTextField name="road" label="" value={permanentRoad} onChange={(e) => setPermanentRoad(e.target.value)} placeholder='Road/Street/Lane' />
                                                            ) : (
                                                                <RHFTextField name="road" label="" value={item.permanentAddress.road} placeholder='Road/Street/Lane' />
                                                            )
                                                        }


                                                    </div>
                                                    <div className="mb-3 col-lg-3 col-md-12">
                                                        <label htmlFor="exampleInputPassword1" className="form-label">Area/Landmark <span className="must-filed">*</span></label>



                                                        {
                                                            isFormEnabled ? (
                                                                <RHFTextField name="area" label="" placeholder='Area/Landmark' value={permanentArea} onChange={(e) => setPermanentArea(e.target.value)} />
                                                            ) : (
                                                                <RHFTextField name="area" label="" placeholder='Area/Landmark' value={item.permanentAddress.area} />
                                                            )
                                                        }
                                                    </div>

                                                </div>
                                                <div className="formBox">
                                                    <div className="mb-3 col-lg-3 col-md-12">
                                                        <label htmlFor="exampleInputEmail1" className="form-label">Country <span className="must-filed">*</span></label>


                                                        {
                                                            isFormEnabled ? (
                                                                <RHFTextField name="country" label="" value={country} onChange={(e) => setCountry(e.target.value)} />
                                                            ) : (
                                                                <RHFTextField name="country" label="" value={item.permanentAddress.country} />
                                                            )
                                                        }

                                                    </div>
                                                    <div className="mb-3 col-lg-3 col-md-12">
                                                        <label htmlFor="exampleInputPassword1" className="form-label">State <span className="must-filed">*</span></label>
                                                        <Select size='small' sx={{

                                                            ".MuiOutlinedInput-notchedOutline": {
                                                                border: "none",
                                                            },
                                                        }} name="state" value={state} onChange={(e) => setState(e.target.value)} required className="form-control">
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


                                                        {
                                                            isFormEnabled ? (
                                                                <RHFTextField name="city" label="" placeholder='City' value={permanentCity} onChange={(e) => setPermanentCity(e.target.value)} />
                                                            ) : (
                                                                <RHFTextField name="city" label="" placeholder='City' value={item.permanentAddress.city} />
                                                            )
                                                        }
                                                    </div>


                                                </div>

                                                <div className="formBox">
                                                    <div className="mb-3 col-lg-3 col-md-12">
                                                        <label htmlFor="exampleInputPassword1" className="form-label">Pincode <span className="must-filed">*</span></label>

                                                        {
                                                            isFormEnabled ? (
                                                                <RHFTextField name="pincode" value={pincode} onChange={(e) => setPinCode(e.target.value)} type='number' label="" placeholder='Pincode' inputProps={{ maxLength: 6 }} />
                                                            ) : (
                                                                <RHFTextField name="pincode" value={item.permanentAddress.pincode} type='number' label="" placeholder='Pincode' inputProps={{ maxLength: 6 }} />
                                                            )
                                                        }

                                                    </div>
                                                </div>

                                                <h2 className='footerFormHead'>Present Address</h2>
                                                <div className="formBox">
                                                    <div className="mb-3 col-lg-3 col-md-12">
                                                        <label htmlFor="exampleInputEmail1" className="form-label">House No./Apartment Name/Block No. <span className="must-filed">*</span></label>


                                                        {
                                                            isFormEnabled ? (
                                                                <RHFTextField name="houseNumber" label="" value={presentHouseNo} onChange={(e) => setPresentHouseNo(e.target.value)} placeholder='House No./Apartment Name/Block No.' />
                                                            ) : (
                                                                <RHFTextField name="houseNumber" label="" value={item.presentAddress.houseNumber} placeholder='House No./Apartment Name/Block No.' />
                                                            )
                                                        }

                                                    </div>
                                                    <div className="mb-3 col-lg-3 col-md-12">
                                                        <label htmlFor="exampleInputPassword1" className="form-label">Road/Street/Lane <span className="must-filed">*</span></label>

                                                        {
                                                            isFormEnabled ? (

                                                                <RHFTextField name="road" label="" placeholder='Road/Street/Lane' value={road} onChange={(e) => setRoad(e.target.value)} />
                                                            ) : (

                                                                <RHFTextField name="road" label="" placeholder='Road/Street/Lane' value={item.presentAddress.road} />
                                                            )
                                                        }
                                                    </div>
                                                    <div className="mb-3 col-lg-3 col-md-12">
                                                        <label htmlFor="exampleInputPassword1" className="form-label">Area/Landmark <span className="must-filed">*</span></label>



                                                        {
                                                            isFormEnabled ? (

                                                                <RHFTextField name="area" label="" placeholder='Area/Landmark' value={area} onChange={(e) => setArea(e.target.value)} />
                                                            ) : (

                                                                <RHFTextField name="area" label="" placeholder='Area/Landmark' value={item.presentAddress.area} />
                                                            )
                                                        }


                                                    </div>


                                                </div>
                                                <div className="formBox">
                                                    <div className="mb-3 col-lg-3 col-md-12">
                                                        <label htmlFor="exampleInputEmail1" className="form-label">Country <span className="must-filed">*</span></label>

                                                        {
                                                            isFormEnabled ? (

                                                                <RHFTextField name="country" label="" value={countryPresent} onChange={(e) => setCountryPresent(e.target.value)} />
                                                            ) : (

                                                                <RHFTextField name="country" label="" value={item.presentAddress.country} />
                                                            )
                                                        }

                                                    </div>
                                                    <div className="mb-3 col-lg-3 col-md-12">
                                                        <label htmlFor="exampleInputPassword1" className="form-label">State <span className="must-filed">*</span></label>


                                                        {
                                                            isFormEnabled ? (

                                                                <Select size='small' sx={{

                                                                    ".MuiOutlinedInput-notchedOutline": {
                                                                        border: "none",
                                                                    },
                                                                }} name="state" value={statePresent} onChange={(e) => setStatePresent(e.target.value)} required className="form-control">

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
                                                            ) : (

                                                                <Select size='small' sx={{

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
                                                            )
                                                        }
                                                    </div>
                                                    <div className="mb-3 col-lg-3 col-md-12">
                                                        <label htmlFor="exampleInputPassword1" className="form-label">City <span className="must-filed">*</span></label>


                                                        {
                                                            isFormEnabled ? (

                                                                <RHFTextField name="city" label="" placeholder='City' value={city} onChange={(e) => setCity(e.target.value)} />
                                                            ) : (

                                                                <RHFTextField name="city" label="" placeholder='City' value={item.presentAddress.city} />
                                                            )
                                                        }
                                                    </div>


                                                </div>

                                                <div className="formBox">
                                                    <div className="mb-3 col-lg-3 col-md-12">
                                                        <label htmlFor="exampleInputPassword1" className="form-label">Pincode <span className="must-filed">*</span></label>


                                                        {
                                                            isFormEnabled ? (

                                                                <RHFTextField type='number' value={pinCodePresent} onChange={(e) => setPinCodePresent(e.target.value)} name="pincode" label="" placeholder='Pincode' inputProps={{ maxLength: 6 }} />
                                                            ) : (

                                                                <RHFTextField type='number' value={item.presentAddress.pincode} name="pincode" label="" placeholder='Pincode' inputProps={{ maxLength: 6 }} />
                                                            )
                                                        }
                                                    </div>
                                                </div>

                                                <h2 className='footerFormHead'>Contact Details</h2>
                                                <div className="formBox">
                                                    <div className="mb-3 col-lg-3 col-md-12">
                                                        <label htmlFor="exampleInputEmail1" className="form-label">Email ID <span className="must-filed">*</span></label>




                                                        <RHFTextField name="emailId" value={item.emailId} type='email' label="" placeholder='Email ID' />


                                                    </div>
                                                    <div className="mb-3 col-lg-3 col-md-12">
                                                        <label htmlFor="exampleInputPassword1" className="form-label">Mobile No. <span className="must-filed">*</span></label>

                                                        <RHFTextField name="mobileNumber" type='number' value={item.mobileNumber} label="" placeholder='Mobile No.' inputProps={{ maxLength: 10 }} />

                                                    </div>
                                                    <div className="mb-3 col-lg-3 col-md-12">
                                                        <label htmlFor="exampleInputPassword1" className="form-label">Aadhar No. <span className="must-filed">*</span></label>

                                                        {
                                                            isFormEnabled ? (

                                                                <RHFTextField name="aadharNumber" type='number' value={adhar} onChange={(e) => setAdhar(e.target.value)} label="" placeholder='Aadhar No.' inputProps={{ maxLength: 12 }} required />
                                                            ) : (

                                                                <RHFTextField name="aadharNumber" type='number' value={item.aadharNumber} label="" placeholder='Aadhar No.' inputProps={{ maxLength: 12 }} required />
                                                            )
                                                        }
                                                    </div>

                                                </div>
                                                <div className="formBox">
                                                    <div className="mb-3 col-lg-3 col-md-12">
                                                        <label htmlFor="exampleInputEmail1" className="form-label">Alternate Email ID</label>


                                                        {
                                                            isFormEnabled ? (

                                                                <RHFTextField name="alternateEmailId" label="" placeholder='Alternate Email ID' />
                                                            ) : (

                                                                <RHFTextField name="alternateEmailId" value={item.alternateEmailId} label="" placeholder='Alternate Email ID' />
                                                            )
                                                        }

                                                    </div>
                                                    <div className="mb-3 col-lg-3 col-md-12">
                                                        <label htmlFor="exampleInputPassword1" className="form-label">Alternate Mobile No.</label>



                                                        {
                                                            isFormEnabled ? (

                                                                <RHFTextField name="alternateMobileNumber" type='number' value={alternateMobileNumber} onChange={(e) => setAlternateMobileNumber(e.target.value)} label="" placeholder='Alternate Mobile No.' inputProps={{ maxLength: 10 }} />
                                                            ) : (

                                                                <RHFTextField name="alternateMobileNumber" type='number' value={item.alternateMobileNumber} label="" placeholder='Alternate Mobile No.' inputProps={{ maxLength: 10 }} />
                                                            )
                                                        }
                                                    </div>
                                                    <div className="mb-3 col-lg-3 col-md-12">
                                                        <label htmlFor="exampleInputPassword1" className="form-label">Pan No.</label>



                                                        {
                                                            isFormEnabled ? (

                                                                <RHFTextField name="pancard" label="" placeholder='Pan No.' inputProps={{ maxLength: 10 }} />
                                                            ) : (

                                                                <RHFTextField name="pancard" value={item.pancard} label="" placeholder='Pan No.' inputProps={{ maxLength: 10 }} />
                                                            )
                                                        }


                                                    </div>


                                                </div>

                                                <h2 className='footerFormHead' id="add-modal-label">Academic Qualification
                                                </h2>

                                                <div className="formBox">
                                                    {
                                                        isFormEnabled ? (

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
                                                                        {
                                                                            [...Array(noOfRows)].map((elementInArray, index) => {
                                                                                return (
                                                                                    <tr key={index}>
                                                                                        <td> <RHFTextField name="className" value={className} onChange={(e) => setClassName(e.target.value)} label="" placeholder='Class Name' /></td>
                                                                                        <td> <RHFTextField name="schoolName" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} label="" placeholder='School Name' /></td>
                                                                                        <td> <RHFTextField name="board" value={boardName} onChange={(e) => setBoardName(e.target.value)} label="" placeholder='Board' /></td>
                                                                                        <td> <RHFTextField name="percentage" value={percentage} onChange={(e) => setPercentage(e.target.value)} type='number' label="" placeholder='Percentage' inputProps={{ maxLength: 3 }} /></td>
                                                                                        <td> <RHFTextField name="passingYear" value={passingYear} onChange={(e) => setPassingYear(e.target.value)} type='number' label="" placeholder='Passing Year' inputProps={{ maxLength: 4 }} /></td>
                                                                                    </tr>

                                                                                )

                                                                            })



                                                                        }


                                                                    </tbody>
                                                                </table>
                                                                <button onClick={() => setNoOfRows(noOfRows + 1)} type="button" className="add-more-row-experience"><i className="fa fa-plus-circle"></i> Add New</button>
                                                            </div>
                                                        ) : (

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
                                                                            <td> <RHFTextField name="className" value={item.academicQualification[0].className} label="" placeholder='Class Name' /></td>
                                                                            <td> <RHFTextField name="schoolName" value={item.academicQualification[0].schoolName} label="" placeholder='School Name' /></td>
                                                                            <td> <RHFTextField name="board" value={item.academicQualification[0].board} label="" placeholder='Board' /></td>
                                                                            <td> <RHFTextField name="percentage" value={item.academicQualification[0].percentage} type='number' label="" placeholder='Percentage' inputProps={{ maxLength: 3 }} /></td>
                                                                            <td> <RHFTextField name="passingYear" value={item.academicQualification[0].passingYear} type='number' label="" placeholder='Passing Year' inputProps={{ maxLength: 4 }} /></td>
                                                                        </tr>




                                                                    </tbody>
                                                                </table>
                                                                <button onClick={() => setNoOfRows(noOfRows + 1)} type="button" className="add-more-row-experience"><i className="fa fa-plus-circle"></i> Add New</button>
                                                            </div>
                                                        )
                                                    }




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
                                                                {
                                                                    isFormEnabled ? (
                                                                        <>
                                                                            {
                                                                                [...Array(noOfRows2)].map((elementInArray, index) => {
                                                                                    return (
                                                                                        <tr key={index}>
                                                                                            <td> <RHFTextField name="courseName" value={courseName} onChange={(e) => setCourseName(e.target.value)} label="" placeholder='Course Name' /></td>
                                                                                            <td> <RHFTextField name="specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} label="" placeholder='Specialization' /></td>
                                                                                            <td> <RHFTextField name="percentage" type='number' value={percentageHq} onChange={(e) => setPercentageHq(e.target.value)} label="" placeholder='Percentage' inputProps={{ maxLength: 3 }} /></td>
                                                                                            <td> <RHFTextField name="passingYear" type='number' value={passingYearHq} onChange={(e) => setPassingYearHq(e.target.value)} label="" placeholder='Year' inputProps={{ maxLength: 4 }} /></td>
                                                                                            <td> <RHFTextField name="courseType" value={courseType} onChange={(e) => setCourseType(e.target.value)} label="" placeholder='Course Type' /></td>
                                                                                        </tr>

                                                                                    )

                                                                                })

                                                                            }
                                                                        </>


                                                                    ) : (
                                                                        <>
                                                                            {
                                                                                [...Array(noOfRows2)].map((elementInArray, index) => {
                                                                                    return (
                                                                                        <tr key={index}>
                                                                                            <td> <RHFTextField name="courseName" value={item.higherQualification[0].courseName} label="" placeholder='Course Name' /></td>
                                                                                            <td> <RHFTextField name="specialization" value={item.higherQualification[0].specialization} label="" placeholder='Specialization' /></td>
                                                                                            <td> <RHFTextField name="percentage" type='number' value={item.higherQualification[0].percentage} label="" placeholder='Percentage' inputProps={{ maxLength: 3 }} /></td>
                                                                                            <td> <RHFTextField name="passingYear" type='number' value={item.higherQualification[0].passingYear} label="" placeholder='Year' inputProps={{ maxLength: 4 }} /></td>
                                                                                            <td> <RHFTextField name="courseType" value={item.higherQualification[0].courseType} label="" placeholder='Course Type' /></td>
                                                                                        </tr>

                                                                                    )

                                                                                })

                                                                            }
                                                                        </>


                                                                    )
                                                                }

                                                            </tbody>
                                                        </table>
                                                        <button onClick={() => setNoOfRows2(noOfRows2 + 1)} type="button" className="add-more-row-experience"><i className="fa fa-plus-circle"></i> Add New</button>
                                                    </div>


                                                </div>

                                                <h2 className='footerFormHead' id="add-modal-label">Experience Details</h2>
                                                <div className="formBox">
                                                    <div className="mb-3 col-lg-3 col-md-12">
                                                        <label htmlFor="exampleInputEmail1" className="form-label">Experience</label>
                                                        {
                                                            hideForm &&
                                                            <>

                                                                {
                                                                    isFormEnabled ? (
                                                                        <Select size='small' sx={{

                                                                            ".MuiOutlinedInput-notchedOutline": {
                                                                                border: "none",
                                                                            },
                                                                        }} value={exp} onChange={(e) => setExp(e.target.value)} className="form-control select-experience" name="experienced">

                                                                            <MenuItem value="yes"  >Yes</MenuItem>
                                                                            <MenuItem value="no" onClick={hanldeNo}>No</MenuItem>
                                                                        </Select>
                                                                    ) : (

                                                                        <Select size='small' sx={{

                                                                            ".MuiOutlinedInput-notchedOutline": {
                                                                                border: "none",
                                                                            },
                                                                        }} value={item.experienced} className="form-control select-experience" name="experienced">

                                                                            <MenuItem value="yes"  >Yes</MenuItem>
                                                                            <MenuItem value="no" onClick={hanldeNo}>No</MenuItem>
                                                                        </Select>
                                                                    )
                                                                }
                                                            </>

                                                        }



                                                        {
                                                            noExperience &&
                                                            <RHFTextField type="number" name="totalExperience" label="" placeholder='No Experience' />
                                                        }

                                                    </div>totalExperience
                                                    {hideForm && <div className="mb-3 col-lg-3 col-md-12">
                                                        <label htmlFor="exampleInputPassword1" className="form-label">Total Experience (IN YEAR)</label>




                                                        {
                                                            isFormEnabled ? (

                                                                <RHFTextField type="number" name="totalExperience" value={totalExp} onChange={(e) => setTotalExp(e.target.value)} label="" placeholder='Total Experience (IN YEAR)' />
                                                            ) : (

                                                                <RHFTextField type="number" name="totalExperience" value={item.totalExperience} label="" placeholder='Total Experience (IN YEAR)' />
                                                            )
                                                        }
                                                    </div>}


                                                </div>
                                                {
                                                    hideForm &&
                                                    <div className="formBox">
                                                        {
                                                            isFormEnabled ? (

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


                                                                            {
                                                                                [...Array(noOfRows3)].map((elementInArray, index) => {
                                                                                    return (
                                                                                        <tr key={index}>
                                                                                            <td> <RHFTextField name="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} label="" placeholder='durationFromCompany Name' /></td>
                                                                                            <td> <RHFTextField name="designation" value={designation} onChange={(e) => setDesignation(e.target.value)} label="" placeholder='Designation' /></td>
                                                                                            <td> <RHFTextField name="location" value={location} onChange={(e) => setLocation(e.target.value)} label="" placeholder='Location' /></td>
                                                                                            <td> <RHFTextField name="durationFrom" value={durationFrom} onChange={(e) => setDurationFrom(e.target.value)} label="" placeholder='Duration From' /></td>
                                                                                            <td> <RHFTextField name="durationTo" value={durationTo} onChange={(e) => setdurationTo(e.target.value)} label="" placeholder='Duration To' /></td>
                                                                                        </tr>

                                                                                    )

                                                                                })



                                                                            }

                                                                        </tbody>
                                                                    </table>
                                                                    <button onClick={() => setNoOfRows3(noOfRows3 + 1)} type="button" className="add-more-row-experience"><i className="fa fa-plus-circle"></i> Add New</button>
                                                                </div>
                                                            ) : (

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


                                                                            {
                                                                                [...Array(noOfRows3)].map((elementInArray, index) => {
                                                                                    return (
                                                                                        <tr key={index}>
                                                                                            <td> <RHFTextField name="companyName" value={item.experienceDetails[0].companyName} label="" placeholder='durationFromCompany Name' /></td>
                                                                                            <td> <RHFTextField name="designation" value={item.experienceDetails[0].designation} label="" placeholder='Designation' /></td>
                                                                                            <td> <RHFTextField name="location" value={item.experienceDetails[0].location} label="" placeholder='Location' /></td>
                                                                                            <td> <RHFTextField name="durationFrom" value={item.experienceDetails[0].durationFrom} label="" placeholder='Duration From' /></td>
                                                                                            <td> <RHFTextField name="durationTo" value={item.experienceDetails[0].durationTo} label="" placeholder='Duration To' /></td>
                                                                                        </tr>

                                                                                    )

                                                                                })



                                                                            }

                                                                        </tbody>
                                                                    </table>

                                                                </div>
                                                            )
                                                        }




                                                    </div>
                                                }

                                            </div>

                                            <div className="submitForm">
                                                {
                                                    isFormEnabled ? (
                                                        <button className="formSubmit" type='submit'>Save</button>

                                                    ) : (
                                                        <button className="formSubmit" onClick={() => {
                                                            setIsFormEnabled(!isFormEnabled);
                                                        }}>Edit</button>
                                                    )
                                                }
                                            </div>
                                        </FormProvider>
                                    )
                                })
                            }



                        </div>
                    </section>

                )
            }
        </>
    )
}

export default Edit