import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import {
    CircularProgress,
    Box,
    styled,
    Typography
} from "@mui/material";
import axios from '../utils/axios';
import { ToastContainer, toast } from "react-toastify";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Select, MenuItem, InputLabel } from '@mui/material';
import FormProvider from './hook-form/FormProvider';
import RHFTextField from './hook-form/RHFTextField';
import { ROW as rowData } from '../utils/constants';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileValuesProps } from '../@types/object';
// @ts-ignore
import Files from 'react-files';



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
const ApplyNow = () => {
    const [noOfRows, setNoOfRows] = useState(1);
    const [applyform, setApplyForm] = useState<ProfileValuesProps[]>([]);
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
    const [statePermanent, setStatePermanent] = useState("");
    const [adhar, setAdhar] = useState("");
    const [panNo, setPanNo] = useState("");
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
    const [uploadFile, setUploadFile] = useState<string | Blob>('');
    const [uploadFileSignature, setUploadFileSignature] = useState<string | Blob>('');
    const [uploadFileSrc, setUploadFileSrc] = useState<string>('');
    const [uploadFileSignatureSrc, setUploadSignatureSrc] = useState<string>('');

    const navigate = useNavigate();

    const { state }: { state: any } = useLocation();
    // const buttonRef = useRef();

    const ProfileSchema = Yup.object().shape({
        applicantName: Yup.string().required('Applicant name is required'),
        fatherName: Yup.string().required('Applicant father name is required'),
        motherName: Yup.string().required('Applicant mother name is required'),
        dateOfBirth: Yup.string().required('DateOfBirth is required'),
        emailId: Yup.string().email('Email must be a valid email address').required('Email is required'),
        // className: Yup.string().required('className is required'),
        // schoolName: Yup.string().required('School is required'),
        // board: Yup.string().required('Board is required'),
        // courseName: Yup.string().required('Course is required'),
        // specialization: Yup.string().required('Specialization is required'),
        // courseType: Yup.string().required('Course is required'),
        // companyName: Yup.string().required('Company Name is required'),
        // designation: Yup.string().required('Designation Name is required'),
        // location: Yup.string().required('Location Name is required'),
        // durationFrom: Yup.string().required('Duration From is required'),
        // durationTo: Yup.string().required('Duration To is required'),



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

    const { reset, handleSubmit } = methods;

    const onSubmit = async (data: ProfileValuesProps, e: any) => {
        // const profileForm = new FormData();
        // uploadFileSignature && profileForm.append('upload_signature', uploadFileSignature);
        // uploadFile && profileForm.append('upload_photo', uploadFile);
        e.preventDefault();
        alert('Are you sure the data entered is correct if YES click submit button.')
        setLoading(true);
        try {
            const res = await axios.post('/api/application/save-application-details', {
                upload_photo: uploadFile,
                upload_signature: uploadFileSignature,
                applicantName: data.applicantName,
                fatherName: data.fatherName,
                motherName: data.motherName,
                dateOfBirth: data.dateOfBirth,
                religion: religion,
                gender: gender,
                category: category,
                paymentStatus: false,
                postName: state?.name,
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
                    state: statePermanent,
                    city: permanentCity,
                    pincode: parseInt(pincode),
                },
                mobileNumber: mobileNumber,
                alternateMobileNumber: alternateMobileNumber,
                alternateEmailId: data.alternateEmailId,
                emailId: data.emailId,
                aadharNumber: adhar,
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
            const { body } = res.data;
            let applicationId = body.applicationId;
            let userId = body.mobileNumber;
            console.log(body.applicationId);
            console.log(body.mobileNumber);

            toast.success('Success');
            navigate('/my-application', { state: { applicationId, userId } })
            reset();
            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            console.log(error);

            toast.error("Something went wrong!");
        }
    };


    const onSave = async (data: ProfileValuesProps, e: any) => {
        e.preventDefault();
        alert('Are you sure the data entered is correct if YES click submit button.')
        setLoading(true);


        try {
            await axios.post('/api/application/save-application-details', {
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
                mobileNumber: parseInt(mobileNumber),
                alternateMobileNumber: parseInt(alternateMobileNumber),
                alternateEmailId: data.alternateEmailId,
                emailId: data.emailId,
                aadharNumber: parseInt(adhar),
                pancard: panNo,
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
            reset();
            setLoading(false);


        } catch (error: any) {
            setLoading(false);
            console.log(error);

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
    const handleMobileNumber = (e: any) => {
        if (mobileNumber.length >= 10) {
            toast.error('Mobile Number should be of 10 digit!');

        }

        else if (mobileNumber.length === 8) {
            setMobileNumber(e.target.value)
            toast.error('Mobile Number should be of 10 digit!');
        }
        else {
            setMobileNumber(e.target.value)
        }

    }
    const handleAdharNumber = (e: any) => {
        if (adhar.length !== 0) {
            if (adhar.length === 12) {
                toast.error('Invalid adhar number');

            }
            else if (adhar.length === 10) {
                setAdhar(e.target.value)
                toast.error('Invalid adhar number');
            }
            else {
                setAdhar(e.target.value)
            }

        }
        else {
            setAdhar(e.target.value)
        }




    }




    const handleAlternateMobileNumber = (e: any) => {
        if (alternateMobileNumber.length >= 10) {
            toast.error('Alternate Mobile Number should be of 10 digit!');

        }
        else if (alternateMobileNumber.length === 8) {
            setAlternateMobileNumber(e.target.value)
            toast.error('Mobile Number should be of 10 digit!');
        }
        else {
            setAlternateMobileNumber(e.target.value)
        }


    }

    // const handlePanNoChange = (e: any) => {
    //     if (panNo.length >= 10) {
    //         toast.error('Pan should be of 10 digit!');

    //     }
    //     else {
    //         setPanNo(e.target.value)
    //     }

    // }
    const handleChangePresentPinCode = (e: any) => {
        if (pinCodePresent.length > 6) {
            toast.error('Pincode should be of 6 digit!');

        }
        else if (pinCodePresent.length === 4) {
            setPinCodePresent(e.target.value);
            toast.error('Pincode should be of 6 digit!');


        }
        else {
            setPinCodePresent(e.target.value);
        }

    }
    const handleChangePermanentPinCode = (e: any) => {
        if (pincode.length > 6) {
            toast.error('Pincode should be of 6 digit!');

        }
        else {
            setPinCode(e.target.value);
        }

    }

    const onUploadPhotoChange = (files: any) => {
        setUploadFileSrc(files.map((filename: any) => filename.preview.url));
        setUploadFile(files[0]);
    };

    const onUploadPhotoError = (error: any, file: any) => {
        console.log('error code ' + error.code + ': ' + error.message);
        toast.error('Something went wromg');
    };

    const onUploadSignatureChange = (files: any) => {
        setUploadSignatureSrc(files.map((filename: any) => filename.preview.url));
        setUploadFileSignature(files[0]);
    };

    const onUploadSignatureError = (error: any, file: any) => {
        console.log('error code ' + error.code + ': ' + error.message);
        toast.error('Something went wromg');
    };

    const MAX_FILE_SIZE = 10000000;

    // const handleAddFields = (year: number) => {
    //     recoveryYearList[year - 1].month.push({
    //         number: recoveryYearList[year - 1].month.length + 1,
    //         amount: 0,
    //         date: "",
    //     });
    //     setRecoveryYearList([...recoveryYearList]);
    // };



    return (
        <>
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
                    <section className='formSection'>
                        <div className="row container">
                            <ToastContainer position="top-center" />
                            <h1 className='formHead'>Application Form for <span className='dynamic_data'>{state?.name}
                            </span></h1>
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
                                            <RHFTextField name="dateOfBirth" label="" placeholder='dd/mm/yyyy' type='date' />

                                        </div>
                                        <div className="mb-3 col-lg-3 col-md-12">
                                            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                            <Select fullWidth size='small' labelId='demo-simple-select-label' label="Gender" name='gender' value={gender} onChange={(e) => setGender(e.target.value)} className="form-select" required sx={{

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
                                        </div>

                                    </div>
                                    <div className="formBox">
                                        <div className="mb-3 col-lg-3 col-md-12">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Religion <span className="must-filed">*</span></label>
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
                                        </div>

                                    </div>

                                    <h2 className='footerFormHead'>Permanent Address</h2>
                                    <div className="formBox">
                                        <div className="mb-3 col-lg-3 col-md-12">
                                            <label htmlFor="exampleInputEmail1" className="form-label">House No./Apartment Name/Block No. <span className="must-filed">*</span></label>
                                            <RHFTextField name="houseNumber" label="" value={houseNo} onChange={(e) => setHouseNo(e.target.value)} placeholder='House No./Apartment Name/Block No.' required />

                                        </div>
                                        <div className="mb-3 col-lg-3 col-md-12">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Road/Street/Lane <span className="must-filed">*</span></label>

                                            <RHFTextField name="road" label="" value={permanentRoad} onChange={(e) => setPermanentRoad(e.target.value)} placeholder='Road/Street/Lane' required />
                                        </div>
                                        <div className="mb-3 col-lg-3 col-md-12">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Area/Landmark <span className="must-filed">*</span></label>

                                            <RHFTextField name="area" label="" placeholder='Area/Landmark' value={permanentArea} onChange={(e) => setPermanentArea(e.target.value)} required />
                                        </div>

                                    </div>
                                    <div className="formBox">
                                        <div className="mb-3 col-lg-3 col-md-12">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Country <span className="must-filed">*</span></label>
                                            <RHFTextField name="country" label="" disabled value={country} onChange={(e) => setCountry(e.target.value)} />

                                        </div>
                                        <div className="mb-3 col-lg-3 col-md-12">
                                            <label htmlFor="exampleInputPassword1" className="form-label">State <span className="must-filed">*</span></label>
                                            <Select size='small' sx={{

                                                ".MuiOutlinedInput-notchedOutline": {
                                                    border: "none",
                                                },
                                            }} name="state" value={statePermanent} onChange={(e) => setStatePermanent(e.target.value)} required className="form-control">
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
                                            <RHFTextField name="city" label="" placeholder='City' value={permanentCity} onChange={(e) => setPermanentCity(e.target.value)} required />
                                        </div>


                                    </div>

                                    <div className="formBox">
                                        <div className="mb-3 col-lg-3 col-md-12">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Pincode <span className="must-filed">*</span></label>
                                            <RHFTextField name="pincode" value={pincode} onChange={handleChangePermanentPinCode} type='number' label="" placeholder='Pincode' inputProps={{ maxLength: 6 }} required />

                                        </div>
                                    </div>

                                    <h2 className='footerFormHead'>Present Address</h2>
                                    <div className="formBox">
                                        <div className="mb-3 col-lg-3 col-md-12">
                                            <label htmlFor="exampleInputEmail1" className="form-label">House No./Apartment Name/Block No. <span className="must-filed">*</span></label>
                                            <RHFTextField name="houseNumber" label="" value={presentHouseNo} onChange={(e) => setPresentHouseNo(e.target.value)} placeholder='House No./Apartment Name/Block No.' required />

                                        </div>
                                        <div className="mb-3 col-lg-3 col-md-12">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Road/Street/Lane <span className="must-filed">*</span></label>

                                            <RHFTextField name="road" label="" placeholder='Road/Street/Lane' value={road} onChange={(e) => setRoad(e.target.value)} required />
                                        </div>
                                        <div className="mb-3 col-lg-3 col-md-12">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Area/Landmark <span className="must-filed">*</span></label>

                                            <RHFTextField name="area" label="" placeholder='Area/Landmark' value={area} onChange={(e) => setArea(e.target.value)} required />
                                        </div>


                                    </div>
                                    <div className="formBox">
                                        <div className="mb-3 col-lg-3 col-md-12">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Country <span className="must-filed">*</span></label>
                                            <RHFTextField name="country" label="" disabled value={countryPresent} onChange={(e) => setCountryPresent(e.target.value)} />

                                        </div>
                                        <div className="mb-3 col-lg-3 col-md-12">
                                            <label htmlFor="exampleInputPassword1" className="form-label">State <span className="must-filed">*</span></label>
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
                                        </div>
                                        <div className="mb-3 col-lg-3 col-md-12">
                                            <label htmlFor="exampleInputPassword1" className="form-label">City <span className="must-filed">*</span></label>
                                            <RHFTextField name="city" label="" placeholder='City' value={city} onChange={(e) => setCity(e.target.value)} required />
                                        </div>


                                    </div>

                                    <div className="formBox">
                                        <div className="mb-3 col-lg-3 col-md-12">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Pincode <span className="must-filed">*</span></label>
                                            <RHFTextField type='number' value={pinCodePresent} onChange={handleChangePresentPinCode} name="pincode" label="" placeholder='Pincode' inputProps={{ maxLength: 6 }} required />
                                        </div>
                                    </div>

                                    <h2 className='footerFormHead'>Contact Details</h2>
                                    <div className="formBox">
                                        <div className="mb-3 col-lg-3 col-md-12">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Email ID <span className="must-filed">*</span></label>

                                            <RHFTextField name="emailId" label="" placeholder='Email ID' required />

                                        </div>
                                        <div className="mb-3 col-lg-3 col-md-12">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Mobile No. <span className="must-filed">*</span></label>

                                            <RHFTextField name="mobileNumber" type='number' value={mobileNumber} onChange={handleMobileNumber} label="" placeholder='Mobile No.' inputProps={{ maxLength: 10 }} required />
                                        </div>
                                        <div className="mb-3 col-lg-3 col-md-12">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Aadhar No. <span className="must-filed">*</span></label>
                                            <RHFTextField name="aadharNumber" type='number' value={adhar} onChange={handleAdharNumber} label="" placeholder='Aadhar No.' inputProps={{ maxLength: 12 }} required />
                                        </div>

                                    </div>
                                    <div className="formBox">
                                        <div className="mb-3 col-lg-3 col-md-12">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Alternate Email ID</label>

                                            <RHFTextField name="alternateEmailId" label="" placeholder='Alternate Email ID' required />

                                        </div>
                                        <div className="mb-3 col-lg-3 col-md-12">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Alternate Mobile No.</label>

                                            <RHFTextField name="alternateMobileNumber" type='number' value={alternateMobileNumber} onChange={handleAlternateMobileNumber} label="" placeholder='Alternate Mobile No.' inputProps={{ maxLength: 10 }} />
                                        </div>
                                        <div className="mb-3 col-lg-3 col-md-12">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Pan No.</label>

                                            <RHFTextField name="pancard" label="" placeholder='Pan No.' value={panNo} onChange={(e) => setPanNo(e.target.value)} inputProps={{ maxLength: 10 }} required />
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
                                                    {
                                                        [...Array(noOfRows)].map((elementInArray, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td> <RHFTextField name="className" value={className} onChange={(e) => setClassName(e.target.value)} label="" placeholder='Class Name' required /></td>


                                                                    <td> <RHFTextField name="schoolName" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} label="" placeholder='School Name' required /></td>


                                                                    <td> <RHFTextField name="board" value={boardName} onChange={(e) => setBoardName(e.target.value)} label="" placeholder='Board' required /></td>



                                                                    <td> <RHFTextField name="percentage" value={percentage} onChange={(e) => setPercentage(e.target.value)} type='number' label="" placeholder='Percentage' inputProps={{ maxLength: 3 }} required /></td>


                                                                    <td> <RHFTextField name="passingYear" value={passingYear} onChange={(e) => setPassingYear(e.target.value)} type='number' label="" placeholder='Passing Year' inputProps={{ maxLength: 4 }} required /></td>
                                                                </tr>

                                                            )

                                                        })



                                                    }
                                                </tbody>
                                            </table>
                                            <button onClick={() => setNoOfRows(noOfRows + 1)} type="button" className="add-more-row-experience"><i className="fa fa-plus-circle"></i> Add New</button>
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


                                                    {
                                                        [...Array(noOfRows2)].map((elementInArray, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td> <RHFTextField name="courseName" value={courseName} onChange={(e) => setCourseName(e.target.value)} label="" placeholder='Course Name' required /></td>
                                                                    <td> <RHFTextField name="specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} label="" placeholder='Specialization' required /></td>
                                                                    <td> <RHFTextField name="percentage" type='number' value={percentageHq} onChange={(e) => setPercentageHq(e.target.value)} label="" placeholder='Percentage' inputProps={{ maxLength: 3 }} required /></td>
                                                                    <td> <RHFTextField name="passingYear" type='number' value={passingYearHq} onChange={(e) => setPassingYearHq(e.target.value)} label="" placeholder='Year' inputProps={{ maxLength: 4 }} required /></td>
                                                                    <td> <RHFTextField name="courseType" value={courseType} onChange={(e) => setCourseType(e.target.value)} label="" placeholder='Course Type' /></td>
                                                                </tr>

                                                            )

                                                        })

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
                                                <Select size='small' sx={{

                                                    ".MuiOutlinedInput-notchedOutline": {
                                                        border: "none",
                                                    },
                                                }} value={exp} required onChange={(e) => setExp(e.target.value)} className="form-control select-experience" name="experienced">

                                                    <MenuItem value="Yes"  >Yes</MenuItem>
                                                    <MenuItem value="No" onClick={hanldeNo}>No</MenuItem>
                                                </Select>
                                            }
                                            {
                                                noExperience &&
                                                <RHFTextField type="number" name="totalExperience" label="" placeholder='No Experience' disabled />
                                            }

                                        </div>
                                        {hideForm && <div className="mb-3 col-lg-3 col-md-12">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Total Experience (IN YEAR)</label>
                                            <RHFTextField type="number" name="totalExperience" value={totalExp} onChange={(e) => setTotalExp(e.target.value)} label="" placeholder='Total Experience (IN YEAR)' required />
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
                                                                        <td> <RHFTextField name="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} label="" placeholder='Company Name' required /></td>
                                                                        <td> <RHFTextField name="designation" value={designation} onChange={(e) => setDesignation(e.target.value)} label="" placeholder='Designation' required /></td>
                                                                        <td> <RHFTextField name="location" value={location} onChange={(e) => setLocation(e.target.value)} label="" placeholder='Location' /></td>
                                                                        <td> <RHFTextField name="durationFrom" value={durationFrom} onChange={(e) => setDurationFrom(e.target.value)} label="" placeholder='Duration From' required /></td>
                                                                        <td> <RHFTextField name="durationTo" value={durationTo} onChange={(e) => setdurationTo(e.target.value)} label="" placeholder='Duration To' required /></td>
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

                                    <div className="file">
                                        <div>
                                            <Files
                                                className="files-dropzone"
                                                onChange={onUploadPhotoChange}
                                                onError={onUploadPhotoError}
                                                accepts={['image/*', '.jpeg']}
                                                multiple={false}
                                                maxFileSize={MAX_FILE_SIZE}
                                                minFileSize={0}
                                                clickable
                                            >
                                                <AttachmentThumbnail color="primary">
                                                    {uploadFileSrc ? (
                                                        <ImgStyle src={String(uploadFileSrc)} alt="img" />
                                                    ) : (
                                                        <AttachFileIcon color="primary" />
                                                    )}
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
                                                onChange={onUploadSignatureChange}
                                                onError={onUploadSignatureError}
                                                accepts={['image/*', '.jpeg']}
                                                multiple={false}
                                                maxFileSize={MAX_FILE_SIZE}
                                                minFileSize={0}
                                                clickable
                                            >
                                                <AttachmentThumbnail color="primary">
                                                    {uploadFileSignatureSrc ? (
                                                        <ImgStyle src={String(uploadFileSignatureSrc)} alt="img" />
                                                    ) : (
                                                        <AttachFileIcon color="primary" />
                                                    )}
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


                                <div className="submitForm">
                                    <button className="formSubmit" type='submit'>Submit</button>
                                    <button className="formSubmit" onClick={handleSubmit(onSave)}>Save</button>
                                </div>
                            </FormProvider>



                        </div>
                    </section>

                )
            }
        </>
    )
}

export default ApplyNow