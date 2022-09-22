import React, { useState } from 'react';


import * as Yup from 'yup';
import axios from '../utils/axios';
import { ToastContainer, toast } from "react-toastify";
import { Select, MenuItem, Button, InputLabel } from '@mui/material';
import FormProvider from './hook-form/FormProvider';
import RHFTextField from './hook-form/RHFTextField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from "@mui/lab";


type ProfileValuesProps = {
    aadharNumber: string;
    academicQualification: [
        {
            academicQualificationId: 0;
            board: string;
            className: string;
            passingYear: string;
            percentage: string;
            schoolName: string
        }
    ],
    alternateEmailId: string;
    alternateMobileNumber: string;
    applicantName: string;
    applicationId: string;
    category: string;
    dateOfBirth: string;
    emailId: string;
    experienceDetails: [
        {
            companyName: string;
            designation: string;
            durationFrom: string;
            durationTo: string;
            experienceDetailId: string;
            experienced: string;
            location: string;
            totalExperience: string;
        }
    ],
    experienced: string;
    fatherName: string;
    gender: string;
    higherQualification: [
        {
            courseName: string;
            courseType: string;
            higherQualificationId: number;
            passingYearHq: string;
            percentageHq: string;
            specialization: string;
        }
    ],
    mobileNumber: string;
    motherName: string;
    pancard: string;
    password: string;
    paymentStatus: boolean;
    permanentAddress: {
        area: string,
        city: string,
        country: string,
        houseNumber: string,
        id: number,
        pincode: string,
        road: string,
        state: string
    },
    postName: string;
    presentAddress: {
        area: string;
        city: string;
        country: string;
        houseNumber: string;
        id: number;
        pincode: string;
        road: string;
        state: string;
    },
    religion: string;
    totalExperience: string;
    userId: number;
    afterSubmit?: string;


};
const ApplyNow = () => {
    const [noOfRows, setNoOfRows] = useState(1);
    const [noOfRows2, setNoOfRows2] = useState(1);
    const [noOfRows3, setNoOfRows3] = useState(1);
    const [frontFile, setFrontFile] = useState<string | Blob>("");
    const [backFile, setBackFile] = useState<string | Blob>("");
    const [item, setItem] = useState("");
    const [gender, setGender] = useState("");
    const [state, setState] = useState("");
    const [exp, setExp] = useState("");
    const [percentage, setPercentage] = useState("");
    const [passingYear, setPassingYear] = useState("");
    const [religion, setReligion] = useState("");
    const [hideForm, setHideForm] = useState(true);
    const [others, setOthers] = useState(false);
    const [noExperience, setNoexperience] = useState(false);

    const ProfileSchema = Yup.object().shape({
        applicantName: Yup.string().required('Applicant name is required'),
        fatherName: Yup.string().required('Applicant father name is required'),
        motherName: Yup.string().required('Applicant mother name is required'),
        dateOfBirth: Yup.string().required('Applicant date of birth name is required'),
        houseNumber: Yup.string().required('Applicant House Number is required'),
        road: Yup.string().required('Applicant road name is required'),
        area: Yup.string().required('Applicant area name is required'),
        pincode: Yup.string().required('Applicant pincode is required'),
        emailId: Yup.string().required('Applicant email Id is required'),
        mobileNumber: Yup.string().required('Applicant mobile number is required'),
        aadharNumber: Yup.string().required('Applicant aadhar number is required'),
        board: Yup.string().required('Applicant board name is required'),
        className: Yup.string().required('Applicant className is required'),
        passingYear: Yup.string().required('Applicant passingYear is required'),
        percentage: Yup.string().required('Applicant percentage is required'),
        schoolName: Yup.string().required('Applicant schoolName is required'),
        courseName: Yup.string().required('Applicant courseName is required'),
        courseType: Yup.string().required('Applicant courseType is required'),
        passingYearHQ: Yup.string().required('Applicant passingYear is required'),
        percentageHQ: Yup.string().required('Applicant percentage is required'),
        companyName: Yup.string().required('Applicant companyName is required'),
        designation: Yup.string().required('Applicant designation is required'),
        location: Yup.string().required('Applicant location is required'),
        durationFrom: Yup.string().required('Applicant durationFrom is required'),
        durationTo: Yup.string().required('Applicant durationTo is required'),
    });

    const defaultValues = {
        applicantName: '',
        fatherName: '',
        motherName: '',
        dateOfBirth: '',
        category: '',
        gender: '',
        religion: '',
        emailId: '',
        aadharNumber: '',
        mobileNumber: '',
        alternateEmailId: '',
        alternateMobileNumber: '',
        pancard: '',
        academicQualificationId: 0,
        board: '',
        className: '',
        passingYear: '',
        percentage: '',
        schoolName: '',
        companyName: '',
        designation: '',
        durationFrom: '',
        durationTo: '',
        experienceDetailId: '',
        experienced: '',
        location: '',
        totalExperience: '',
        courseName: '',
        courseType: '',
        higherQualificationId: 0,
        specialization: '',
        area: '',
        city: '',
        country: '',
        houseNumber: '',
        id: 0,
        pincode: '',
        road: '',
        state: '',


    };
    const methods = useForm<ProfileValuesProps>({
        resolver: yupResolver(ProfileSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;


    const onSubmit = async (data: ProfileValuesProps) => {
        try {
            await axios.post('/api/application/save-application-details', {
                applicantName: data.applicantName,
                fatherName: data.fatherName,
                motherName: data.motherName,
                dateOfBirth: data.dateOfBirth,
                religion: religion,
                gender: gender,
                category: item,
                totalExperience: data.totalExperience,
                userId: data.userId,
                password: data.password,
                permanentAddress: {
                    houseNumber: data.permanentAddress.houseNumber,
                    road: data.permanentAddress.road,
                    area: data.permanentAddress.area,
                    state: data.permanentAddress.state,
                    city: data.permanentAddress.city,
                    pincode: data.permanentAddress.pincode,
                },
                presentAddress: {
                    houseNumberPAD: data.presentAddress.houseNumber,
                    roadPAD: data.presentAddress.road,
                    areaPAD: data.presentAddress.area,
                    statePAD: data.presentAddress.state,
                    cityPAD: data.presentAddress.city,
                    pincodePAD: data.presentAddress.pincode,

                },
                higherQualification: [
                    {
                        courseName: data.higherQualification[0].courseName,
                        courseType: data.higherQualification[0].courseType,
                        higherQualificationId: data.higherQualification[0].higherQualificationId,
                        passingYearHq: passingYear,
                        percentageHq: percentage,
                        specialization: data.higherQualification[0].specialization,
                    }
                ],
                experienceDetails: [
                    {
                        companyName: data.experienceDetails[0].companyName,
                        designation: data.experienceDetails[0].designation,
                        durationFrom: data.experienceDetails[0].durationFrom,
                        durationTo: data.experienceDetails[0].durationTo,
                        experienceDetailId: data.experienceDetails[0].experienceDetailId,
                        experienced: data.experienceDetails[0].experienced,
                        location: data.experienceDetails[0].location,
                        totalExperience: data.experienceDetails[0].totalExperience,
                    }
                ],
                academicQualification: [
                    {
                        academicQualificationId: data.academicQualification[0].academicQualificationId,
                        board: data.academicQualification[0].board,
                        className: data.academicQualification[0].className,
                        passingYear: data.academicQualification[0].passingYear,
                        percentage: data.academicQualification[0].percentage,
                        schoolName: data.academicQualification[0].schoolName,
                    }
                ],

                emailId: data.emailId,
                mobileNumber: data.mobileNumber,
                aadharNumber: data.aadharNumber,

                alternateEmailId: data.alternateEmailId,
                alternateMobileNumber: data.alternateMobileNumber,
                pancard: data.pancard,
                experienced: exp,
            });
            toast.success('Success');
        } catch (error: any) {
            toast.error("Something went wrong!");
        }
    };

    const hanldeNo = () => {
        setHideForm(false);
        setNoexperience(true);

    }

    const hanldeShowOthers = () => {
        setOthers(true);

    }
    return (
        <section className='formSection'>
            <div className="row container">
                <ToastContainer position="top-center" />
                <h1 className='formHead'>Application Form for</h1>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <div className="parentForm">
                        <h2 className='footerFormHead'>Personal Details</h2>
                        <div className="formBox">
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputEmail1" className="form-label">Name <span className="must-filed">*</span></label>

                                <RHFTextField name="applicantName" label="" placeholder='Enter Name' />

                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">Father Name <span className="must-filed">*</span></label>

                                <RHFTextField name="fatherName" label="" placeholder='Enter Father Name' />
                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">Mother Name <span className="must-filed">*</span></label>

                                <RHFTextField name="motherName" label="" placeholder='Enter Mother Name' />
                            </div>

                        </div>

                        <div className="formBox">
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputEmail1" className="form-label">Date Of Birth <span className="must-filed">*</span></label>
                                <RHFTextField name="dateOfBirth" label="" placeholder='dd/mm/yyyy' />

                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                <Select fullWidth size='small' labelId='demo-simple-select-label' label="Gender" name='gender' value={gender} onChange={(e) => setGender(e.target.value)} className="form-select" id="state" required sx={{

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
                                <Select size='small' value={item} onChange={(e) => setItem(e.target.value)} name='category' className="form-select" id="state" required sx={{

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
                                <Select size='small' value={religion} onChange={(e) => setReligion(e.target.value)} name='religion' className="form-select" id="state" required sx={{

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


                            <div className="mt-4 col-lg-3 col-md-12">
                                {
                                    others &&
                                    <>
                                        <label htmlFor="exampleInputPassword1" className="form-label">Others <span className="must-filed">*</span></label>
                                        <RHFTextField name="others" label="" placeholder='Please Specify' />
                                    </>
                                }

                            </div>
                            <div className="mb-3 col-lg-3 col-md-12"></div>


                        </div>

                    </div>

                    <div className="parentForm">
                        <h2 className='footerFormHead'>Permanent Address</h2>
                        <div className="formBox">
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputEmail1" className="form-label">House No./Apartment Name/Block No. <span className="must-filed">*</span></label>
                                <RHFTextField name="houseNumber" label="" placeholder='House No./Apartment Name/Block No.' />

                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">Road/Street/Lane <span className="must-filed">*</span></label>

                                <RHFTextField name="road" label="" placeholder='Road/Street/Lane' />
                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">Area/Landmark <span className="must-filed">*</span></label>

                                <RHFTextField name="area" label="" placeholder='Area/Landmark' />
                            </div>

                        </div>
                        <div className="formBox">
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputEmail1" className="form-label">Country <span className="must-filed">*</span></label>
                                <RHFTextField name="road" value='India' label="" disabled />

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
                                <RHFTextField name="city" label="" placeholder='City' />
                            </div>


                        </div>

                        <div className="formBox">
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">Pincode <span className="must-filed">*</span></label>
                                <RHFTextField name="pincode" label="" placeholder='Pincode' inputProps={{ maxLength: 6 }} />


                            </div>
                        </div>
                        <hr />
                        <h2 className='footerFormHead'>Present/Correspondence Address</h2>
                        <div className="formBox">
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputEmail1" className="form-label">House No./Apartment Name/Block No. <span className="must-filed">*</span></label>
                                <RHFTextField name="houseNumber" label="" placeholder='House No./Apartment Name/Block No.' />

                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">Road/Street/Lane <span className="must-filed">*</span></label>

                                <RHFTextField name="road" label="" placeholder='Road/Street/Lane' />
                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">Area/Landmark <span className="must-filed">*</span></label>

                                <RHFTextField name="area" label="" placeholder='Area/Landmark' />
                            </div>


                        </div>
                        <div className="formBox">
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputEmail1" className="form-label">Country <span className="must-filed">*</span></label>
                                <RHFTextField name="road" value='India' label="" disabled />

                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">State <span className="must-filed">*</span></label>
                                <Select size='small' sx={{

                                    ".MuiOutlinedInput-notchedOutline": {
                                        border: "none",
                                    },
                                }} name="state" value={state} onChange={(e) => setState(e.target.value)} required className="form-control">

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
                                <RHFTextField name="city" label="" placeholder='City' />
                            </div>


                        </div>

                        <div className="formBox">
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">Pincode <span className="must-filed">*</span></label>
                                <RHFTextField name="pincode" label="" placeholder='Pincode' inputProps={{ maxLength: 6 }} />
                            </div>
                        </div>

                    </div>
                    <div className="parentForm">
                        <h2 className='footerFormHead'>Contact Details</h2>
                        <div className="formBox">
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email ID <span className="must-filed">*</span></label>

                                <RHFTextField name="emailId" label="" placeholder='Email ID' />

                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">Mobile No. <span className="must-filed">*</span></label>

                                <RHFTextField name="mobileNumber" label="" placeholder='Mobile No.' inputProps={{ maxLength: 10 }} />
                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">Aadhar No. <span className="must-filed">*</span></label>
                                <RHFTextField name="aadharNumber" label="" placeholder='Aadhar No.' inputProps={{ maxLength: 12 }} required />
                            </div>

                        </div>
                        <div className="formBox">
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputEmail1" className="form-label">Alternate Email ID</label>

                                <RHFTextField name="alternateEmailId" label="" placeholder='Alternate Email ID' />

                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">Alternate Mobile No.</label>

                                <RHFTextField name="alternateMobileNumber" label="" placeholder='Alternate Mobile No.' inputProps={{ maxLength: 10 }} />
                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">Pan No.</label>

                                <RHFTextField name="pancard" label="" placeholder='Pan No.' inputProps={{ maxLength: 10 }} />
                            </div>


                        </div>



                    </div>

                    <div className="parentForm">
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
                                        {
                                            [...Array(noOfRows)].map((elementInArray, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td> <RHFTextField name="className" label="" placeholder='Class Name' /></td>
                                                        <td> <RHFTextField name="schoolName" label="" placeholder='School Name' /></td>
                                                        <td> <RHFTextField name="board" label="" placeholder='Board' /></td>
                                                        <td> <RHFTextField name="percentage" label="" placeholder='Percentage' inputProps={{ maxLength: 3 }} /></td>
                                                        <td> <RHFTextField name="passingYear" label="" placeholder='Passing Year' inputProps={{ maxLength: 4 }} /></td>
                                                    </tr>

                                                )

                                            })



                                        }
                                    </tbody>
                                </table>
                                <button onClick={() => setNoOfRows(noOfRows + 1)} type="button" className="add-more-row-experience"><i className="fa fa-plus-circle"></i> Add New</button>
                            </div>


                        </div>


                    </div>

                    <div className="parentForm">
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
                                            [...Array(noOfRows2)].map((elementInArray, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td> <RHFTextField name="courseName" label="" placeholder='Course Name' /></td>
                                                        <td> <RHFTextField name="specialization" label="" placeholder='Specialization' /></td>
                                                        <td> <RHFTextField name="percentageHQ" value={percentage} onChange={(e) => setPercentage(e.target.value)} label="" placeholder='Percentage' inputProps={{ maxLength: 3 }} /></td>
                                                        <td> <RHFTextField name="passingYearHQ" value={passingYear} onChange={(e) => setPassingYear(e.target.value)} label="" placeholder='Year' inputProps={{ maxLength: 4 }} /></td>
                                                        <td> <RHFTextField name="courseType" label="" placeholder='Course Type' /></td>
                                                    </tr>

                                                )

                                            })

                                        }

                                    </tbody>
                                </table>
                                <button onClick={() => setNoOfRows2(noOfRows2 + 1)} type="button" className="add-more-row-experience"><i className="fa fa-plus-circle"></i> Add New</button>
                            </div>


                        </div>


                    </div>

                    <div className="parentForm">
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
                                    }} value={exp} onChange={(e) => setExp(e.target.value)} className="form-control select-experience" name="experienced">

                                        <MenuItem value="yes"  >Yes</MenuItem>
                                        <MenuItem value="no" onClick={hanldeNo}>No</MenuItem>
                                    </Select>
                                }
                                {
                                    noExperience &&
                                    <RHFTextField type="number" name="totalExperience" label="" placeholder='No Experience' disabled />
                                }

                            </div>totalExperience
                            {hideForm && <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">Total Experience (IN YEAR)</label>
                                <RHFTextField type="number" name="totalExperience" label="" placeholder='Total Experience (IN YEAR)' />
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

                                            {
                                                [...Array(noOfRows3)].map((elementInArray, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td> <RHFTextField name="companyName" label="" placeholder='Company Name' /></td>
                                                            <td> <RHFTextField name="designation" label="" placeholder='Designation' /></td>
                                                            <td> <RHFTextField name="location" label="" placeholder='Location' /></td>
                                                            <td> <RHFTextField name="durationFrom" label="" placeholder='Duration From' /></td>
                                                            <td> <RHFTextField name="durationTo" label="" placeholder='Duration To' /></td>
                                                        </tr>

                                                    )

                                                })



                                            }

                                        </tbody>
                                    </table>
                                    <button onClick={() => setNoOfRows3(noOfRows3 + 1)} type="button" className="add-more-row-experience"><i className="fa fa-plus-circle"></i> Add New</button>
                                </div>


                            </div>
                        }


                    </div>


                    {/* <div className="parentForm">
                        <h2 className='footerFormHead' id="add-modal-label">Uplaod Documents <span className="must-filed"><span className="must-filed">*</span></span></h2>
                        <div className="formBox">
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputEmail1" className="form-label">Upload Photo <span className="must-filed">*</span></label>
                                <input onChange={(e) => setFrontFile(e.target.value)} type="file" className="form-control file-max-upload" id="add-Photo" accept=".jpeg" name="photo" required />

                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">Upload Signature <span className="must-filed">*</span></label>
                                <input type="file" className="form-control file-max-upload" id="add-Sign" accept=".jpeg" required name="signature" />
                            </div>
                        </div>
                    </div> */}


                    <div className="submitFormData">

                        <button type="submit" onClick={handleSubmit(onSubmit)} className="formSubmit">Submit</button>
                        <button className="formSubmit" onClick={handleSubmit(onSubmit)}>Save</button>
                    </div>
                </FormProvider>


            </div>
        </section>
    )
}

export default ApplyNow