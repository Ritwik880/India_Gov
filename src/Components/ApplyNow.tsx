import React, { useRef, useState } from 'react';
// @ts-ignore
import Files from 'react-files';
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
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileValuesProps } from '../@types/object';



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
    const [passingYear, setPassingYear] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [country, setCountry] = useState("India");
    const [countryPresent, setCountryPresent] = useState("India");
    const [alternateMobileNumber, setAlternateMobileNumber] = useState("");
    const [statePresent, setStatePresent] = useState("");
    const [schoolName, setSchoolName] = useState("");
    const [className, setClassName] = useState("High School");
    const [boardName, setBoardName] = useState("");
    const [courseName, setCourseName] = useState("");
    const [hideForm, setHideForm] = useState(true);
    const [others, setOthers] = useState(false);
    const [otherCategory, setOtherCategory] = useState(false);
    const [noExperience, setNoexperience] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploadFile, setUploadFile] = useState<string | Blob>('');
    const [uploadFileSignature, setUploadFileSignature] = useState<string | Blob>('');
    const [uploadFileSrc, setUploadFileSrc] = useState<string>('');
    const [uploadFileSignatureSrc, setUploadSignatureSrc] = useState<string>('');




    //diploma
    const [diploma, setDiploma] = useState("Intermediate/Diploma");
    const [highSchool, setHighSchool] = useState("High School");
    const [collegeName, setCollegeName] = useState("");
    const [boardDiploma, setBoardDiploma] = useState("");
    const [percentageDiploma, setPercentageDiploma] = useState("");
    const [passingYearDiploma, setPassingYearDiploma] = useState("");

    //bachelor
    const [bachelor, setBachelor] = useState("UG/Bachlore Degree");
    const [collegeBachelor, setCollegeBachelor] = useState("");
    const [boardBachelor, setBoardBachelor] = useState("");
    const [percentageBachelor, setPercentageBachelor] = useState("");
    const [passingYearBachelor, setPassingYearBachelor] = useState("");

    ///Masters
    const [masterDegreeName, setMasterDegreeName] = useState("Graduation/Masters Degree");
    const [specialization, setSpecialization] = useState("");
    const [percentageHq, setPercentageHq] = useState("");
    const [passingYearHq, setPassingYearHq] = useState("");
    const [courseType, setCourseType] = useState("");

    ///PHD
    const [postGraduation, setPostGraduation] = useState("Post Graduation/ PhD");
    const [specializationGraduation, setSpecializationGraduation] = useState("");
    const [percentageGraduation, setPercentageGraduation] = useState("");
    const [passingYearGraduation, setPassingYearGraduation] = useState("");
    const [courseTypeGraduation, setCourseTypeGraduation] = useState("");

    //exp
    const [companyName, setCompanyName] = useState("");
    const [designation, setDesignation] = useState("");
    const [location, setLocation] = useState("");
    const [durationFrom, setDurationFrom] = useState("");
    const [durationTo, setdurationTo] = useState("");

    const [companyNameSecond, setCompanyNameSecond] = useState("");
    const [designationSecond, setDesignationSecond] = useState("");
    const [locationSecond, setLocationSecond] = useState("");
    const [durationFromSecond, setDurationFromSecond] = useState("");
    const [durationToSecond, setdurationToSecond] = useState("");

    //other
    const [otherBachelor, setOtherBachelor] = useState("Others");
    const [otherCollege, setOtherCollege] = useState("");
    const [otherBoard, setOtherBoard] = useState("");
    const [otherPercentage, setOtherPercentage] = useState("");
    const [otherPassing, setOtherPassing] = useState("");

    //other
    const [otherGraduation, setOtherGraduation] = useState("Others");
    const [otherSpecialisation, setOtherSpecialisation] = useState("");
    const [otherPercentageGraduation, setOtherPercentageGraduation] = useState("");
    const [otherPassingYearGraduation, setOtherPassingYearGraduation] = useState("");
    const [otherCourseTypeGraduation, setOtherCourseTypeGraduation] = useState("");

    //other
    const [thirdCompanyNameSecond, setThirdCompanyNameSecond] = useState("");
    const [thirdDesignationSecond, setThirdDesignationSecond] = useState("");
    const [thirdLocationSecond, setThirdLocationSecond] = useState("");
    const [thirdDurationFromSecond, setThirdDurationFromSecond] = useState("");
    const [thirdDurationToSecond, setThirdDurationToSecond] = useState("");

    //other
    const [fourthCompanyNameSecond, setFourthCompanyNameSecond] = useState("");
    const [fourthDesignationSecond, setFourthDesignationSecond] = useState("");
    const [fourthLocationSecond, setFourthLocationSecond] = useState("");
    const [fourthDurationFromSecond, setFourthDurationFromSecond] = useState("");
    const [fourthDurationToSecond, setFourthDurationToSecond] = useState("");




    const navigate = useNavigate();

    const { state }: { state: any } = useLocation();

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
    const onSubmit = async (data: ProfileValuesProps, event: any) => {
        event.stopPropagation();
        alert('Are you sure the data entered is correct if YES click submit button.')
        setLoading(true);
        try {
            const res = await axios.post('/api/application/save-application-details', {
                uploadPhoto: uploadFile,
                uploadSignature: uploadFileSignature,
                applicantName: data.applicantName,
                fatherName: data.fatherName,
                motherName: data.motherName,
                dateOfBirth: data.dateOfBirth,
                religion: religion,
                gender: gender,
                category: category,
                otherCategory: data.otherCategory,
                otherReligion: data.otherReligion,
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
                pancard: panNo,
                academicQualification: [
                    {
                        className: highSchool ? highSchool : null,
                        schoolName: schoolName ? schoolName : null,
                        board: boardName ? boardName : null,
                        percentage: percentage ? parseInt(percentage) : 0,
                        passingYear: passingYear ? parseInt(passingYear) : 0,
                    },
                    {
                        className: diploma ? diploma : null,
                        schoolName: collegeName ? collegeName : null,
                        board: boardDiploma ? boardDiploma : null,
                        percentage: percentageDiploma ? parseInt(percentageDiploma) : null,
                        passingYear: passingYearDiploma ? parseInt(passingYearDiploma) : null,
                    },
                    {
                        className: bachelor ? bachelor : null,
                        schoolName: collegeBachelor ? collegeBachelor : null,
                        board: boardBachelor ? boardBachelor : null,
                        percentage: percentageBachelor ? parseInt(percentageBachelor) : null,
                        passingYear: passingYearBachelor ? parseInt(passingYearBachelor) : null,
                    },
                    {
                        className: otherBachelor ? otherBachelor : null,
                        schoolName: otherCollege ? otherCollege : null,
                        board: otherBoard ? otherBoard : null,
                        percentage: otherPercentage ? parseInt(otherPercentage) : null,
                        passingYear: otherPassing ? parseInt(otherPassing) : null,
                    },




                ],
                higherQualification: [
                    {
                        courseName: masterDegreeName ? masterDegreeName : null,
                        specialization: specialization ? specialization : null,
                        courseType: courseType ? courseType : null,
                        passingYear: passingYearHq ? parseInt(passingYearHq) : null,
                        percentage: percentageHq ? parseInt(percentageHq) : null,

                    },
                    {
                        courseName: postGraduation ? postGraduation : null,
                        specialization: specializationGraduation ? specializationGraduation : null,
                        courseType: courseTypeGraduation ? courseTypeGraduation : null,
                        passingYear: passingYearGraduation ? parseInt(passingYearGraduation) : null,
                        percentage: percentageGraduation ? parseInt(percentageGraduation) : null,

                    },
                    {
                        courseName: otherGraduation ? otherGraduation : null,
                        specialization: otherSpecialisation ? otherSpecialisation : null,
                        courseType: otherCourseTypeGraduation ? otherCourseTypeGraduation : null,
                        passingYear: otherPassingYearGraduation ? parseInt(otherPassingYearGraduation) : null,
                        percentage: otherPercentageGraduation ? parseInt(otherPercentageGraduation) : null,

                    },

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
                    {
                        companyName: companyNameSecond ? companyNameSecond : null,
                        designation: designationSecond ? designationSecond : null,
                        location: locationSecond ? locationSecond : null,
                        durationFrom: durationFromSecond ? durationFromSecond : null,
                        durationTo: durationToSecond ? durationToSecond : null,
                       
                    },
                    {
                        companyName: thirdCompanyNameSecond ? thirdCompanyNameSecond : null,
                        designation: thirdDesignationSecond ? thirdDesignationSecond : null,
                        location: thirdLocationSecond ? thirdLocationSecond : null,
                        durationFrom: thirdDurationFromSecond ? thirdDurationFromSecond : null,
                        durationTo: thirdDurationToSecond ? thirdDurationToSecond : null,
                       
                    },
                    {
                        companyName: fourthCompanyNameSecond ? fourthCompanyNameSecond : null,
                        designation: fourthDesignationSecond ? fourthDesignationSecond : null,
                        location: fourthLocationSecond ? fourthLocationSecond : null,
                        durationFrom: fourthDurationFromSecond ? fourthDurationFromSecond : null,
                        durationTo: fourthDurationToSecond ? fourthDurationToSecond : null,
                       
                    },
                ],
                password: Math.random().toString(36).substring(2, 9)
            });
            const { body } = res.data;
            let applicationId = body.applicationId;
            let userId = body.mobileNumber;
            toast.success('Success');
            setLoading(false);
            reset();
            navigate('/my-application', { state: { applicationId, userId, category } })
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
                otherCategory: data.otherCategory,
                otherReligion: data.otherReligion,
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

    const hanldeShowOtherReligion = () => {
        setOthers(true);

    }
    const handleMobileNumber = (e: any) => {
        if (mobileNumber.length >= 10) {
            toast.info('Mobile Number should be of 10 digit!');

        }

        else if (mobileNumber.length === 8) {
            setMobileNumber(e.target.value)
            toast.info('Mobile Number should be of 10 digit!');
        }
        else {
            setMobileNumber(e.target.value)
        }

    }
    const handleAdharNumber = (e: any) => {
        if (adhar.length !== 0) {
            if (adhar.length === 12) {
                toast.info('Please enter a valid Aadhar Number');

            }
            else if (adhar.length === 10) {
                setAdhar(e.target.value)
                toast.info('Please enter a valid Aadhar Number');
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
            toast.info('Alternate Mobile Number should be of 10 digit!');

        }
        else if (alternateMobileNumber.length === 8) {
            setAlternateMobileNumber(e.target.value)
            toast.info('Mobile Number should be of 10 digit!');
        }
        else {
            setAlternateMobileNumber(e.target.value)
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

    const handleChange = (e: any) => {
        if (highSchool === "") {
            setHighSchool('High School')
            setSchoolName(e.target.value)

        }
        else {
            setSchoolName(e.target.value)
        }

    }
    const handleCollegeChange = (e: any) => {
        if (diploma === "") {
            setDiploma('Intermediate/Diploma')
            setCollegeName(e.target.value)

        }
        else {
            setCollegeName(e.target.value)
        }

    }

    const handleBachelorChange = (e: any) => {
        if (bachelor === "") {
            setBachelor('UG/Bachlore Degree')
            setCollegeBachelor(e.target.value)

        }
        else {
            setCollegeBachelor(e.target.value)
        }

    }
    const handleOtherChange = (e: any) => {
        if (otherBachelor === "") {
            setOtherBachelor('Others')
            setOtherCollege(e.target.value)

        }
        else {
            setOtherCollege(e.target.value)
        }

    }
    const handleChangeName = (e: any) => {
        if (masterDegreeName === "") {
            setMasterDegreeName('Graduation/Masters Degree')
            setSpecialization(e.target.value)

        }
        else {
            setSpecialization(e.target.value)
        }


    }
    const handleChangeLast = (e: any) => {
        if (postGraduation === "") {
            setPostGraduation('"Post Graduation/ PhD')
            setSpecializationGraduation(e.target.value)

        }
        else {
            setSpecializationGraduation(e.target.value)
        }


    }
    const handleOtherChangeLast = (e: any) => {
        if (otherGraduation === "") {
            setOtherGraduation('Others')
            setOtherSpecialisation(e.target.value)

        }
        else {
            setOtherSpecialisation(e.target.value)
        }


    }
    const handleChangePresentPincode = (e: any) => {
        var x = e.which || e.keycode;
        if ((x >= 48 && x <= 57))
            setPinCodePresent(e.target.value)
        else
            setPinCodePresent(e.target.value)


    }

    const MAX_FILE_SIZE = 10000000;
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
                                                <MenuItem value="General" onClick={() => setOtherCategory(false)}>General</MenuItem>
                                                <MenuItem value="OBC" onClick={() => setOtherCategory(false)}>OBC</MenuItem>
                                                <MenuItem value="ST" onClick={() => setOtherCategory(false)}>ST</MenuItem>
                                                <MenuItem value="SC" onClick={() => setOtherCategory(false)}>SC</MenuItem>
                                                <MenuItem value="EWS" onClick={() => setOtherCategory(false)}>EWS</MenuItem>
                                                <MenuItem value="Others" onClick={() => setOtherCategory(true)}>Others</MenuItem>
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
                                                <MenuItem value="Hindu" onClick={() => setOthers(false)}>Hindu</MenuItem>
                                                <MenuItem value="Sikh" onClick={() => setOthers(false)}>Sikh</MenuItem>
                                                <MenuItem value="Christian" onClick={() => setOthers(false)}>Christian</MenuItem>
                                                <MenuItem value="Muslim" onClick={() => setOthers(false)}>Muslim</MenuItem>
                                                <MenuItem value="Jain" onClick={() => setOthers(false)}>Jain</MenuItem>
                                                <MenuItem value="Buddhist" onClick={() => setOthers(false)}>Buddhist</MenuItem>
                                                <MenuItem value="Others" onClick={() => setOthers(true)}>Others</MenuItem>
                                            </Select>
                                        </div>
                                        <div className="mt-3 col-lg-3 col-md-12">


                                            {
                                                otherCategory && (
                                                    <>
                                                        <label htmlFor="exampleInputPassword1" className="form-label">Other Category <span className="must-filed">*</span></label>

                                                        <RHFTextField name="otherCategory" label="" placeholder='Other Category' />
                                                    </>
                                                )
                                            }

                                        </div>
                                        <div className="mt-3 col-lg-3 col-md-12">
                                            {
                                                others &&
                                                (<>
                                                    <label htmlFor="exampleInputPassword1" className="form-label">Other Religion <span className="must-filed">*</span></label>

                                                    <RHFTextField name="otherReligion" label="" placeholder='Other Religion' />
                                                </>)
                                            }
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
                                                <MenuItem value="Kerala"  >Kerala</MenuItem>
                                                <MenuItem value="Lakshadweep"  >Lakshadweep</MenuItem>
                                                <MenuItem value="Madhya Pradesh"  >Madhya Pradesh</MenuItem>
                                                <MenuItem value="Maharashtra"  >Maharashtra</MenuItem>
                                                <MenuItem value="Manipur"  >Manipur</MenuItem>
                                                <MenuItem value="Meghalaya"  >Meghalaya</MenuItem>
                                                <MenuItem value="Mizoram"  >Mizoram</MenuItem>
                                                <MenuItem value="Nagaland"  >Nagaland</MenuItem>
                                                <MenuItem value="Odisha"  >Odisha</MenuItem>
                                                <MenuItem value="Pondicherry"  >Pondicherry</MenuItem>
                                                <MenuItem value="Punjab"  >Punjab</MenuItem>
                                                <MenuItem value="Rajasthan"  >Rajasthan</MenuItem>
                                                <MenuItem value="Sikkim"  >Sikkim</MenuItem>
                                                <MenuItem value="Tamil Nadu"  >Tamil Nadu</MenuItem>
                                                <MenuItem value="Telangana"  >Telangana</MenuItem>
                                                <MenuItem value="Tripura"  >Tripura</MenuItem>
                                                <MenuItem value="Uttar Pradesh"  >Uttar Pradesh</MenuItem>
                                                <MenuItem value="Uttarakhand"  >Uttarakhand</MenuItem>
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
                                            <RHFTextField name="pincode" value={pincode} onChange={(e) => setPinCode(e.target.value)} label="" placeholder='Pincode' inputProps={{ maxLength: 6 }} required />

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
                                                <MenuItem value="Kerala"  >Kerala</MenuItem>
                                                <MenuItem value="Lakshadweep"  >Lakshadweep</MenuItem>
                                                <MenuItem value="Madhya Pradesh"  >Madhya Pradesh</MenuItem>
                                                <MenuItem value="Maharashtra"  >Maharashtra</MenuItem>
                                                <MenuItem value="Manipur"  >Manipur</MenuItem>
                                                <MenuItem value="Meghalaya"  >Meghalaya</MenuItem>
                                                <MenuItem value="Mizoram"  >Mizoram</MenuItem>
                                                <MenuItem value="Nagaland"  >Nagaland</MenuItem>
                                                <MenuItem value="Odisha"  >Odisha</MenuItem>
                                                <MenuItem value="Pondicherry"  >Pondicherry</MenuItem>
                                                <MenuItem value="Punjab"  >Punjab</MenuItem>
                                                <MenuItem value="Rajasthan"  >Rajasthan</MenuItem>
                                                <MenuItem value="Sikkim"  >Sikkim</MenuItem>
                                                <MenuItem value="Tamil Nadu"  >Tamil Nadu</MenuItem>
                                                <MenuItem value="Telangana"  >Telangana</MenuItem>
                                                <MenuItem value="Tripura"  >Tripura</MenuItem>
                                                <MenuItem value="Uttar Pradesh"  >Uttar Pradesh</MenuItem>
                                                <MenuItem value="Uttarakhand"  >Uttarakhand</MenuItem>
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
                                            <RHFTextField value={pinCodePresent} onChange={handleChangePresentPincode} name="pincode" label="" placeholder='Pincode' inputProps={{ maxLength: 6 }} required />
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

                                            <RHFTextField name="mobileNumber" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} label="" placeholder='Mobile No.' inputProps={{ maxLength: 10 }} required />
                                        </div>
                                        <div className="mb-3 col-lg-3 col-md-12">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Aadhar No. <span className="must-filed">*</span></label>
                                            <RHFTextField name="aadharNumber" value={adhar} onChange={(e) => setAdhar(e.target.value)} label="" placeholder='Aadhar No.' inputProps={{ maxLength: 12 }} required />
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

                                                    <td> <RHFTextField name="className" value={highSchool} onChange={(e) => setHighSchool(e.target.value)} label="" placeholder='High School' /></td>

                                                    <td> <RHFTextField name="schoolName" value={schoolName} onChange={handleChange} label="" placeholder='School Name' /></td>


                                                    <td> <RHFTextField name="board" value={boardName} onChange={(e) => setBoardName(e.target.value)} label="" placeholder='Board' /></td>



                                                    <td> <RHFTextField name="percentage" value={percentage} onChange={(e) => setPercentage(e.target.value)} type='number' label="" placeholder='Percentage' inputProps={{ maxLength: 3 }} /></td>


                                                    <td> <RHFTextField name="passingYear" value={passingYear} onChange={(e) => setPassingYear(e.target.value)} type='number' label="" placeholder='Passing Year' inputProps={{ maxLength: 4 }} /></td>



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

                                                    <td> <RHFTextField name="className" value={diploma} onChange={(e) => setDiploma(e.target.value)} label="" placeholder='Diploma Name' /></td>

                                                    <td> <RHFTextField name="schoolName" value={collegeName} onChange={handleCollegeChange} label="" placeholder='Institute Name' /></td>


                                                    <td> <RHFTextField name="board" value={boardDiploma} onChange={(e) => setBoardDiploma(e.target.value)} label="" placeholder='Board' /></td>



                                                    <td> <RHFTextField name="percentage" value={percentageDiploma} onChange={(e) => setPercentageDiploma(e.target.value)} type='number' label="" placeholder='Percentage' inputProps={{ maxLength: 3 }} /></td>


                                                    <td> <RHFTextField name="passingYear" value={passingYearDiploma} onChange={(e) => setPassingYearDiploma(e.target.value)} type='number' label="" placeholder='Passing Year' inputProps={{ maxLength: 4 }} /></td>



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

                                                    <td> <RHFTextField name="className" value={bachelor} onChange={(e) => setBachelor(e.target.value)} label="" placeholder='Bachelor Name' /></td>

                                                    <td> <RHFTextField name="schoolName" value={collegeBachelor} onChange={handleBachelorChange} label="" placeholder='Institute Name' /></td>


                                                    <td> <RHFTextField name="board" value={boardBachelor} onChange={(e) => setBoardBachelor(e.target.value)} label="" placeholder='Board' /></td>



                                                    <td> <RHFTextField name="percentage" value={percentageBachelor} onChange={(e) => setPercentageBachelor(e.target.value)} type='number' label="" placeholder='Percentage' inputProps={{ maxLength: 3 }} /></td>


                                                    <td> <RHFTextField name="passingYear" value={passingYearBachelor} onChange={(e) => setPassingYearBachelor(e.target.value)} type='number' label="" placeholder='Passing Year' inputProps={{ maxLength: 4 }} /></td>



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

                                                    <td> <RHFTextField name="className" value={otherBachelor} onChange={(e) => setOtherBachelor(e.target.value)} label="" placeholder='Bachelor Name' /></td>

                                                    <td> <RHFTextField name="schoolName" value={otherCollege} onChange={handleOtherChange} label="" placeholder='Institute Name' /></td>


                                                    <td> <RHFTextField name="board" value={otherBoard} onChange={(e) => setOtherBoard(e.target.value)} label="" placeholder='Board' /></td>



                                                    <td> <RHFTextField name="percentage" value={otherPercentage} onChange={(e) => setOtherPercentage(e.target.value)} type='number' label="" placeholder='Percentage' inputProps={{ maxLength: 3 }} /></td>


                                                    <td> <RHFTextField name="passingYear" value={otherPassing} onChange={(e) => setOtherPassing(e.target.value)} type='number' label="" placeholder='Passing Year' inputProps={{ maxLength: 4 }} /></td>



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
                                                        <td> <RHFTextField name="masterDegreeName" value={masterDegreeName} onChange={(e) => setMasterDegreeName(e.target.value)} label="" placeholder='Course Name' /></td>
                                                        <td> <RHFTextField name="specialization" value={specialization} onChange={handleChangeName} label="" placeholder='Specialization' /></td>
                                                        <td> <RHFTextField name="percentage" type='number' value={percentageHq} onChange={(e) => setPercentageHq(e.target.value)} label="" placeholder='Percentage' inputProps={{ maxLength: 3 }} /></td>
                                                        <td> <RHFTextField name="passingYear" type='number' value={passingYearHq} onChange={(e) => setPassingYearHq(e.target.value)} label="" placeholder='Year' inputProps={{ maxLength: 4 }} /></td>
                                                        <td> <RHFTextField name="courseType" value={courseType} onChange={(e) => setCourseType(e.target.value)} label="" placeholder='Course Type' /></td>
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
                                                        <td> <RHFTextField name="postGraduation" value={postGraduation} onChange={(e) => setPostGraduation(e.target.value)} label="" placeholder='Course Name' required /></td>
                                                        <td> <RHFTextField name="specialization" value={specializationGraduation} onChange={handleChangeLast} label="" placeholder='Specialization' /></td>
                                                        <td> <RHFTextField name="percentage" type='number' value={percentageGraduation} onChange={(e) => setPercentageGraduation(e.target.value)} label="" placeholder='Percentage' inputProps={{ maxLength: 3 }} /></td>
                                                        <td> <RHFTextField name="passingYear" type='number' value={passingYearGraduation} onChange={(e) => setPassingYearGraduation(e.target.value)} label="" placeholder='Year' inputProps={{ maxLength: 4 }} /></td>
                                                        <td> <RHFTextField name="courseType" value={courseTypeGraduation} onChange={(e) => setCourseTypeGraduation(e.target.value)} label="" placeholder='Course Type' /></td>
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
                                                        <td> <RHFTextField name="postGraduation" value={otherGraduation} onChange={(e) => setOtherGraduation(e.target.value)} label="" placeholder='Course Name' required /></td>
                                                        <td> <RHFTextField name="specialization" value={otherSpecialisation} onChange={handleOtherChangeLast} label="" placeholder='Specialization' /></td>
                                                        <td> <RHFTextField name="percentage" type='number' value={otherPercentageGraduation} onChange={(e) => setOtherPercentageGraduation(e.target.value)} label="" placeholder='Percentage' inputProps={{ maxLength: 3 }} /></td>
                                                        <td> <RHFTextField name="passingYear" type='number' value={otherPassingYearGraduation} onChange={(e) => setOtherPassingYearGraduation(e.target.value)} label="" placeholder='Year' inputProps={{ maxLength: 4 }} /></td>
                                                        <td> <RHFTextField name="courseType" value={otherCourseTypeGraduation} onChange={(e) => setOtherCourseTypeGraduation(e.target.value)} label="" placeholder='Course Type' /></td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                        </div>
                                    </div>

                                    <h2 className='footerFormHead' id="add-modal-label">Experience Details</h2>
                                    <div className="formBox">
                                        <div className="mb-3 col-lg-3 col-md-12">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Experience</label>

                                            <Select size='small' sx={{

                                                ".MuiOutlinedInput-notchedOutline": {
                                                    border: "none",
                                                },
                                            }} value={exp} onChange={(e) => setExp(e.target.value)} className="form-control select-experience" name="experienced">

                                                <MenuItem value="Yes" onClick={()=> setHideForm(true)}>Yes</MenuItem>
                                                <MenuItem value="No" onClick={hanldeNo}>No</MenuItem>
                                            </Select>



                                        </div>
                                        <div className="mb-3 col-lg-3 col-md-12">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Total Experience (IN YEAR)</label>
                                            <RHFTextField type="number" name="totalExperience" value={totalExp} onChange={(e) => setTotalExp(e.target.value)} label="" placeholder='Total Experience (IN YEAR)' />
                                        </div>


                                    </div>
                                    {
                                        hideForm &&
                                        <>
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
                                                                <td> <RHFTextField name="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} label="" placeholder='Company Name' /></td>
                                                                <td> <RHFTextField name="designation" value={designation} onChange={(e) => setDesignation(e.target.value)} label="" placeholder='Designation' /></td>
                                                                <td> <RHFTextField name="location" value={location} onChange={(e) => setLocation(e.target.value)} label="" placeholder='Location' /></td>
                                                                <td> <RHFTextField name="durationFrom" value={durationFrom} onChange={(e) => setDurationFrom(e.target.value)} label="" placeholder='Duration From' /></td>
                                                                <td> <RHFTextField name="durationTo" value={durationTo} onChange={(e) => setdurationTo(e.target.value)} label="" placeholder='Duration To' /></td>
                                                            </tr>
                                                            <tr>
                                                                <td> <RHFTextField name="companyName" value={companyNameSecond} onChange={(e) => setCompanyNameSecond(e.target.value)} label="" placeholder='Company Name' /></td>
                                                                <td> <RHFTextField name="designation" value={designationSecond} onChange={(e) => setDesignationSecond(e.target.value)} label="" placeholder='Designation' /></td>
                                                                <td> <RHFTextField name="location" value={locationSecond} onChange={(e) => setLocationSecond(e.target.value)} label="" placeholder='Location' /></td>
                                                                <td> <RHFTextField name="durationFrom" value={durationFromSecond} onChange={(e) => setDurationFromSecond(e.target.value)} label="" placeholder='Duration From' /></td>
                                                                <td> <RHFTextField name="durationTo" value={durationToSecond} onChange={(e) => setdurationToSecond(e.target.value)} label="" placeholder='Duration To' /></td>
                                                            </tr>

                                                            <tr>
                                                                <td> <RHFTextField name="companyName" value={thirdCompanyNameSecond} onChange={(e) => setThirdCompanyNameSecond(e.target.value)} label="" placeholder='Company Name' /></td>
                                                                <td> <RHFTextField name="designation" value={thirdDesignationSecond} onChange={(e) => setThirdDesignationSecond(e.target.value)} label="" placeholder='Designation' /></td>
                                                                <td> <RHFTextField name="location" value={thirdLocationSecond} onChange={(e) => setThirdLocationSecond(e.target.value)} label="" placeholder='Location' /></td>
                                                                <td> <RHFTextField name="durationFrom" value={thirdDurationFromSecond} onChange={(e) => setThirdDurationFromSecond(e.target.value)} label="" placeholder='Duration From' /></td>
                                                                <td> <RHFTextField name="durationTo" value={thirdDurationToSecond} onChange={(e) => setThirdDurationToSecond(e.target.value)} label="" placeholder='Duration To' /></td>
                                                            </tr>

                                                            <tr>
                                                                <td> <RHFTextField name="companyName" value={fourthCompanyNameSecond} onChange={(e) => setFourthCompanyNameSecond(e.target.value)} label="" placeholder='Company Name' /></td>
                                                                <td> <RHFTextField name="designation" value={fourthDesignationSecond} onChange={(e) => setFourthDesignationSecond(e.target.value)} label="" placeholder='Designation' /></td>
                                                                <td> <RHFTextField name="location" value={fourthLocationSecond} onChange={(e) => setFourthLocationSecond(e.target.value)} label="" placeholder='Location' /></td>
                                                                <td> <RHFTextField name="durationFrom" value={fourthDurationFromSecond} onChange={(e) => setFourthDurationFromSecond(e.target.value)} label="" placeholder='Duration From' /></td>
                                                                <td> <RHFTextField name="durationTo" value={fourthDurationToSecond} onChange={(e) => setFourthDurationToSecond(e.target.value)} label="" placeholder='Duration To' /></td>
                                                            </tr>


                                                        </tbody>
                                                    </table>

                                                </div>



                                            </div>

                                        </>



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