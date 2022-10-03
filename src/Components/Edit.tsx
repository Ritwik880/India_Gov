import React, { useRef, useState, useEffect } from 'react';
import * as Yup from 'yup';
import {
    CircularProgress,
    Box,
    styled,
    Typography,
    SelectChangeEvent,
} from "@mui/material";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import axios from '../utils/axios';
import { ToastContainer, toast } from "react-toastify";
import { Select, MenuItem, InputLabel } from '@mui/material';
import FormProvider from './hook-form/FormProvider';
import RHFTextField from './hook-form/RHFTextField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocation } from 'react-router-dom';
import { ProfileValuesEditProps, ProfileValues } from '../@types/object';
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

const Edit = () => {
    const [photoUrl, setPhotoUrl] = useState({});
    const [photoSignature, setPhotoSignature] = useState({});
    const [id, setId] = useState(0);
    const [id2, setId2] = useState(0);
    const [id3, setId3] = useState(0);
    const [id4, setId4] = useState(0);
    const [id5, setId5] = useState(0);
    const [id6, setId6] = useState(0);
    const [id7, setId7] = useState(0);
    const [postName, setPostName] = useState("");
    const [gender, setGender] = useState<ProfileValuesEditProps | null>(null);
    const [category, setCategory] = useState<ProfileValuesEditProps | null>(null);
    const [religion, setReligion] = useState<ProfileValuesEditProps | null>(null);
    // const [statePermanent, setStatePermanent] = useState<ProfileValuesEditProps>;/
    const [hideForm, setHideForm] = useState(true);
    const [others, setOthers] = useState(false);
    const [noExperience, setNoexperience] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refreshFlag, setRefreshFlag] = useState<boolean>(false);

    const { state }: { state: any } = useLocation();

    const ProfileSchema = Yup.object().shape({
        applicantName: Yup.string().required('Applicant name is required'),
        fatherName: Yup.string().required('Applicant father name is required'),
        motherName: Yup.string().required('Applicant mother name is required'),
    });

    const defaultValues = {
        applicantName: '',
        fatherName: '',
        motherName: '',
        dateOfBirth: '',
    };
    const methods = useForm<ProfileValuesEditProps>({
        resolver: yupResolver(ProfileSchema),
        defaultValues,
    });

    const { handleSubmit, setValue, getValues } = methods;

    const values = getValues();

    const onSubmit = async (data: ProfileValuesEditProps, event: any) => {
        event.stopPropagation();
        alert('Are you sure the data entered is correct if YES click submit button.')
        setLoading(true);
        try {
            await axios.post('/api/application/update-application-details', {
                applicantName: data.applicantName,
                fatherName: data.fatherName,
                motherName: data.motherName,
                dateOfBirth: data.dateOfBirth,
                applicationId: state?.id,
                religion: data.religion,
                gender: data.gender,
                category: data.category,
                emailId: data.emailId,
                mobileNumber: data.mobileNumber,
                postName: state?.postName,
                permanentAddress: {
                    houseNumber: data.permanentAddress.houseNumber,
                    road: data.permanentAddress.road,
                    area: data.permanentAddress.area,
                    country: data.permanentAddress.country,
                    state: data.permanentAddress.state,
                    city: data.permanentAddress.city,
                    pincode: parseInt(data.permanentAddress.pincode),
                },
                presentAddress: {
                    houseNumber: data.presentAddress.houseNumber,
                    road: data.presentAddress.road,
                    area: data.presentAddress.area,
                    country: data.presentAddress.country,
                    state: data.presentAddress.state,
                    city: data.presentAddress.pincode,
                    pincode: parseInt(data.presentAddress.pincode),
                },
                academicQualification: [
                    {
                        academicQualificationId: id,
                        schoolName: data.academicQualification[0].schoolName,
                        className: data.academicQualification[0].className,
                        board: data.academicQualification[0].board,
                        passingYear: parseInt(data.academicQualification[0].passingYear),
                        percentage: parseInt(data.academicQualification[0].percentage),

                    },
                    {
                        academicQualificationId: id2,
                        schoolName: data.academicQualification[1].schoolName,
                        className: data.academicQualification[1].className,
                        board: data.academicQualification[1].board,
                        passingYear: parseInt(data.academicQualification[1].passingYear),
                        percentage: parseInt(data.academicQualification[1].percentage),

                    },
                    {
                        academicQualificationId: id3,
                        schoolName: data.academicQualification[2].schoolName,
                        className: data.academicQualification[2].className,
                        board: data.academicQualification[2].board,
                        passingYear: parseInt(data.academicQualification[2].passingYear),
                        percentage: parseInt(data.academicQualification[2].percentage),

                    }
                ],
                higherQualification: [
                    {
                        higherQualificationId: id4,
                        courseName: data.higherQualification[0].courseName,
                        specialization: data.higherQualification[0].specialization,
                        courseType: data.higherQualification[0].courseType,
                        passingYear: parseInt(data.higherQualification[0].passingYear),
                        percentage: parseInt(data.higherQualification[0].percentage),

                    },
                    {
                        higherQualificationId: id5,
                        courseName: data.higherQualification[1].courseName,
                        specialization: data.higherQualification[1].specialization,
                        courseType: data.higherQualification[1].courseType,
                        passingYear: parseInt(data.higherQualification[1].passingYear),
                        percentage: parseInt(data.higherQualification[1].percentage),


                    },

                ],
                experienceDetails: [
                    {
                        experienceDetailId: id6,
                        companyName: data.experienceDetails[0].companyName,
                        designation: data.experienceDetails[0].designation,
                        location: data.experienceDetails[0].location,
                        durationFrom: data.experienceDetails[0].durationFrom,
                        durationTo: data.experienceDetails[0].durationTo,
                        totalExperience: parseInt(data.experienceDetails[0].totalExperience),
                        experienced: data.experienceDetails[0].experienced,
                    },
                    {
                        experienceDetailId: id7,
                        companyName: data.experienceDetails[1].companyName,
                        designation: data.experienceDetails[1].designation,
                        location: data.experienceDetails[1].location,
                        durationFrom: data.experienceDetails[1].durationFrom,
                        durationTo: data.experienceDetails[1].durationTo,

                    },
                ],
                alternateMobileNumber: parseInt(data.alternateMobileNumber),
                alternateEmailId: data.alternateEmailId,
                aadharNumber: parseInt(data.aadharNumber),
                pancard: data.pancard,
            });
            toast.success('Success');
            setLoading(false);

        } catch (error: any) {
            console.log(error);
            setLoading(false);
            toast.error("Something went wrong!");
        }
    };

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.post(`/api/application/fetch-application-details`,
                    {
                        applicationId: [state?.id],
                        userId: state?.userId,

                    }

                )
                const { body } = response.data;
                setId(body[0].academicQualification[0] ? body[0].academicQualification[0].academicQualificationId : 0);
                setId2(body[0].academicQualification[1] ? body[0].academicQualification[1].academicQualificationId : 0);
                setId3(body[0].academicQualification[2] ? body[0].academicQualification[2].academicQualificationId : 0);
                setId4(body[0].higherQualification[0] ? body[0].higherQualification[0].higherQualificationId : 0);
                setId5(body[0].higherQualification[1] ? body[0].higherQualification[1].higherQualificationId : 0);
                setId6(body[0].experienceDetails[0] ? body[0].experienceDetails[0].experienceDetailId : 0);
                setId7(body[0].experienceDetails[1] ? body[0].experienceDetails[1].experienceDetailId : 0);
                setPostName(body[0].postName);
                setPhotoUrl(body[0].uploadPhoto ? body[0].uploadPhoto.url : '');
                setPhotoSignature(body[0].uploadSignature ? body[0].uploadSignature : '');
                body[0].applicantName
                    ? setValue('applicantName', body[0].applicantName)
                    : setValue('applicantName', '');
                body[0].fatherName
                    ? setValue('fatherName', body[0].fatherName)
                    : setValue('fatherName', '');
                body[0].motherName
                    ? setValue('motherName', body[0].motherName)
                    : setValue('motherName', '');
                body[0].dateOfBirth
                    ? setValue('dateOfBirth', body[0].dateOfBirth)
                    : setValue('dateOfBirth', '');
                body[0].gender ? setValue('gender', body[0].gender) : setValue('gender', '');

                body[0].category && setCategory(body[0].category)
                body[0].religion && setReligion(body[0].religion)
                body[0].pancard
                    ? setValue('pancard', body[0].pancard)
                    : setValue('pancard', '');
                body[0].aadharNumber
                    ? setValue('aadharNumber', body[0].aadharNumber)
                    : setValue('aadharNumber', '');
                body[0].mobileNumber && setValue('mobileNumber', body[0].mobileNumber)
                body[0].emailId && setValue('emailId', body[0].emailId)
                body[0].alternateEmailId
                    ? setValue('alternateEmailId', body[0].alternateEmailId)
                    : setValue('alternateEmailId', '');
                body[0].alternateMobileNumber
                    ? setValue('alternateMobileNumber', body[0].alternateMobileNumber)
                    : setValue('alternateMobileNumber', '');
                body[0].permanentAddress.area
                    ? setValue('permanentAddress.area', body[0].permanentAddress.area)
                    : setValue('permanentAddress.area', '');
                body[0].permanentAddress.city
                    ? setValue('permanentAddress.city', body[0].permanentAddress.city)
                    : setValue('permanentAddress.city', '');
                body[0].permanentAddress.country
                    ? setValue('permanentAddress.country', body[0].permanentAddress.country)
                    : setValue('permanentAddress.country', '');
                body[0].permanentAddress.state
                    ? setValue('presentAddress.state', body[0].permanentAddress.state)
                    : setValue('presentAddress.state', '');
                body[0].permanentAddress.houseNumber
                    ? setValue('permanentAddress.houseNumber', body[0].permanentAddress.houseNumber)
                    : setValue('permanentAddress.houseNumber', '');
                body[0].permanentAddress.pincode
                    ? setValue('permanentAddress.pincode', body[0].permanentAddress.pincode)
                    : setValue('permanentAddress.pincode', '');
                body[0].permanentAddress.road
                    ? setValue('permanentAddress.road', body[0].permanentAddress.road)
                    : setValue('permanentAddress.road', '');
                body[0].presentAddress.area
                    ? setValue('presentAddress.area', body[0].presentAddress.area)
                    : setValue('presentAddress.area', '');
                body[0].permanentAddress.city
                    ? setValue('presentAddress.city', body[0].presentAddress.city)
                    : setValue('presentAddress.city', '');
                body[0].presentAddress.country
                    ? setValue('presentAddress.country', body[0].presentAddress.country)
                    : setValue('presentAddress.country', '');
                body[0].presentAddress.houseNumber
                    ? setValue('presentAddress.houseNumber', body[0].presentAddress.houseNumber)
                    : setValue('presentAddress.houseNumber', '');
                body[0].presentAddress.pincode
                    ? setValue('presentAddress.pincode', body[0].presentAddress.pincode)
                    : setValue('presentAddress.pincode', '');
                body[0].presentAddress.road
                    ? setValue('presentAddress.road', body[0].presentAddress.road)
                    : setValue('presentAddress.road', '');
                body[0].presentAddress.state
                    ? setValue('presentAddress.state', body[0].presentAddress.state)
                    : setValue('presentAddress.state', '');
                body[0].higherQualification
                    ? setValue('presentAddress.state', body[0].presentAddress.state)
                    : setValue('presentAddress.state', '');
                body[0].academicQualification[0].board
                    ? setValue('academicQualification.0.board', body[0].academicQualification[0].board)
                    : setValue('academicQualification.0.board', '');
                body[0].academicQualification[0].className
                    ? setValue('academicQualification.0.className', body[0].academicQualification[0].className)
                    : setValue('academicQualification.0.className', '');
                body[0].academicQualification[0].schoolName
                    ? setValue('academicQualification.0.schoolName', body[0].academicQualification[0].schoolName)
                    : setValue('academicQualification.0.schoolName', '');
                body[0].academicQualification[0].passingYear
                    ? setValue('academicQualification.0.passingYear', body[0].academicQualification[0].passingYear)
                    : setValue('academicQualification.0.passingYear', '');
                body[0].academicQualification[0].percentage
                    ? setValue('academicQualification.0.percentage', body[0].academicQualification[0].percentage)
                    : setValue('academicQualification.0.percentage', '');

                body[0].academicQualification[1].board
                    ? setValue('academicQualification.1.board', body[0].academicQualification[1].board)
                    : setValue('academicQualification.1.board', '');
                body[0].academicQualification[1].className
                    ? setValue('academicQualification.1.className', body[0].academicQualification[1].className)
                    : setValue('academicQualification.1.className', '');
                body[0].academicQualification[1].schoolName
                    ? setValue('academicQualification.1.schoolName', body[0].academicQualification[1].schoolName)
                    : setValue('academicQualification.1.schoolName', '');
                body[0].academicQualification[1].passingYear
                    ? setValue('academicQualification.1.passingYear', body[0].academicQualification[1].passingYear)
                    : setValue('academicQualification.1.passingYear', '');
                body[0].academicQualification[1].percentage
                    ? setValue('academicQualification.1.percentage', body[0].academicQualification[1].percentage)
                    : setValue('academicQualification.1.percentage', '');

                body[0].academicQualification[2].board
                    ? setValue('academicQualification.2.board', body[0].academicQualification[2].board)
                    : setValue('academicQualification.2.board', '');
                body[0].academicQualification[2].className
                    ? setValue('academicQualification.2.className', body[0].academicQualification[2].className)
                    : setValue('academicQualification.2.className', '');
                body[0].academicQualification[2].schoolName
                    ? setValue('academicQualification.2.schoolName', body[0].academicQualification[2].schoolName)
                    : setValue('academicQualification.2.schoolName', '');
                body[0].academicQualification[2].passingYear
                    ? setValue('academicQualification.2.passingYear', body[0].academicQualification[2].passingYear)
                    : setValue('academicQualification.2.passingYear', '');
                body[0].academicQualification[2].percentage
                    ? setValue('academicQualification.2.percentage', body[0].academicQualification[2].percentage)
                    : setValue('academicQualification.2.percentage', ''); console.log(body[0].academicQualification[2].board);


                body[0].higherQualification[0].courseName
                    ? setValue('higherQualification.0.courseName', body[0].higherQualification[0].courseName)
                    : setValue('higherQualification.0.courseName', '');
                body[0].higherQualification[0].courseType
                    ? setValue('higherQualification.0.courseType', body[0].higherQualification[0].courseType)
                    : setValue('higherQualification.0.courseType', '');
                body[0].higherQualification[0].passingYear
                    ? setValue('higherQualification.0.passingYear', body[0].higherQualification[0].passingYear)
                    : setValue('higherQualification.0.passingYear', '');
                body[0].higherQualification[0].percentage
                    ? setValue('higherQualification.0.percentage', body[0].higherQualification[0].percentage)
                    : setValue('higherQualification.0.percentage', '');
                body[0].higherQualification[0].specialization
                    ? setValue('higherQualification.0.specialization', body[0].higherQualification[0].specialization)
                    : setValue('higherQualification.0.specialization', ''); console.log(body[0].higherQualification[0].specialization);

                body[0].higherQualification[1].courseName
                    ? setValue('higherQualification.1.courseName', body[0].higherQualification[1].courseName)
                    : setValue('higherQualification.1.courseName', '');
                body[0].higherQualification[1].courseType
                    ? setValue('higherQualification.1.courseType', body[0].higherQualification[1].courseType)
                    : setValue('higherQualification.1.courseType', '');
                body[0].academicQualification[1].passingYear
                    ? setValue('higherQualification.1.passingYear', body[0].higherQualification[1].passingYear)
                    : setValue('higherQualification.1.passingYear', '');
                body[0].higherQualification[1].percentage
                    ? setValue('higherQualification.1.percentage', body[0].higherQualification[1].percentage)
                    : setValue('higherQualification.1.percentage', '');
                body[0].higherQualification[1].specialization
                    ? setValue('higherQualification.1.specialization', body[0].higherQualification[1].specialization)
                    : setValue('higherQualification.1.specialization', ''); console.log(body[0].higherQualification[1].specialization);

                body[0].experienceDetails[0].companyName
                    ? setValue('experienceDetails.0.companyName', body[0].experienceDetails[0].companyName)
                    : setValue('experienceDetails.0.companyName', '');
                body[0].experienceDetails[0].designation
                    ? setValue('experienceDetails.0.designation', body[0].experienceDetails[0].designation)
                    : setValue('experienceDetails.0.designation', '');
                body[0].experienceDetails[0].durationFrom
                    ? setValue('experienceDetails.0.durationFrom', body[0].experienceDetails[0].durationFrom)
                    : setValue('experienceDetails.0.durationFrom', '');
                body[0].experienceDetails[0].durationTo
                    ? setValue('experienceDetails.0.durationTo', body[0].experienceDetails[0].durationTo)
                    : setValue('experienceDetails.0.durationTo', '');
                body[0].experienceDetails[0].specialization
                    ? setValue('experienceDetails.0.experienced', body[0].experienceDetails[0].experienced)
                    : setValue('experienceDetails.0.experienced', '');
                body[0].experienceDetails[0].location
                    ? setValue('experienceDetails.0.location', body[0].experienceDetails[0].location)
                    : setValue('experienceDetails.0.location', '');
                body[0].experienceDetails[0].totalExperience
                    ? setValue('experienceDetails.0.totalExperience', body[0].experienceDetails[0].totalExperience)
                    : setValue('experienceDetails.0.totalExperience', '');
                body[0].experienceDetails[0].experienced
                    ? setValue('experienceDetails.0.experienced', body[0].experienceDetails[0].experienced)
                    : setValue('experienceDetails.0.experienced', '');

                body[0].experienceDetails[1].companyName
                    ? setValue('experienceDetails.1.companyName', body[0].experienceDetails[1].companyName)
                    : setValue('experienceDetails.1.companyName', '');
                body[0].experienceDetails[1].designation
                    ? setValue('experienceDetails.1.designation', body[0].experienceDetails[1].designation)
                    : setValue('experienceDetails.1.designation', '');
                body[0].experienceDetails[1].durationFrom
                    ? setValue('experienceDetails.1.durationFrom', body[0].experienceDetails[1].durationFrom)
                    : setValue('experienceDetails.1.durationFrom', '');
                body[0].experienceDetails[1].durationTo
                    ? setValue('experienceDetails.1.durationTo', body[0].experienceDetails[1].durationTo)
                    : setValue('experienceDetails.1.durationTo', '');
                body[0].experienceDetails[1].location
                    ? setValue('experienceDetails.1.location', body[0].experienceDetails[1].location)
                    : setValue('experienceDetails.1.location', '');
            } catch (error) {
                console.error(error);
            }
        };
        getUser();

    }, [setValue]);



    const hanldeNo = () => {
        setHideForm(false);
        setNoexperience(true);

    }

    const hanldeShowOthers = () => {
        setOthers(true);

    }

    const handleChange = (event: SelectChangeEvent, newValue: ProfileValuesEditProps | null) => {
        if (newValue) {
            setGender(newValue);
            setGender({ ...values, gender: event.target.value as string });
        }

    };
    const handleChangeCategory = (event: SelectChangeEvent, newValue: ProfileValuesEditProps | null) => {
        if (newValue) {
            setCategory(newValue);
        }

    };


    const handleChangeReligion = (event: SelectChangeEvent, newValue: ProfileValuesEditProps | null) => {
        if (newValue) {
            setReligion(newValue);
        }

    };
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

                            <>
                                <h1 className='formHead'>Application Form for <span className='dynamic_data'>
                                    {state?.postName}
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
                                                <RHFTextField name="dateOfBirth" label="" placeholder='dd/mm/yyyy' />

                                            </div>
                                            <div className="mb-3 col-lg-3 col-md-12">
                                                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                                <Select fullWidth size='small' labelId='demo-simple-select-label' label="Gender" name='gender' className="form-select" required value='Male' sx={{

                                                    ".MuiOutlinedInput-notchedOutline": {
                                                        border: "none",
                                                    },
                                                }}>
                                                    <MenuItem value="Male" selected>Male</MenuItem>
                                                    <MenuItem value="Female">Female</MenuItem>
                                                </Select>
                                            </div>
                                            <div className="mb-3 col-lg-3 col-md-12">
                                                <label htmlFor="exampleInputPassword1" className="form-label">Category <span className="must-filed">*</span></label>
                                                <Select size='small' name='category' className="form-select" value='General' required sx={{

                                                    ".MuiOutlinedInput-notchedOutline": {
                                                        border: "none",
                                                    },
                                                }}>
                                                    <MenuItem value="General" selected>General</MenuItem>
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
                                                <Select size='small' name='religion' value='Hindu' className="form-select" required sx={{

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
                                                <RHFTextField name="permanentAddress.houseNumber" label="" placeholder='House No./Apartment Name/Block No.' />

                                            </div>
                                            <div className="mb-3 col-lg-3 col-md-12">
                                                <label htmlFor="exampleInputPassword1" className="form-label">Road/Street/Lane <span className="must-filed">*</span></label>

                                                <RHFTextField name="permanentAddress.road" label="" placeholder='Road/Street/Lane' />
                                            </div>
                                            <div className="mb-3 col-lg-3 col-md-12">
                                                <label htmlFor="exampleInputPassword1" className="form-label">Area/Landmark <span className="must-filed">*</span></label>

                                                <RHFTextField name="permanentAddress.area" label="" placeholder='Area/Landmark' />
                                            </div>

                                        </div>
                                        <div className="formBox">
                                            <div className="mb-3 col-lg-3 col-md-12">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Country <span className="must-filed">*</span></label>
                                                <RHFTextField name="permanentAddress.country" label="" disabled />

                                            </div>
                                            <div className="mb-3 col-lg-3 col-md-12">
                                                <label htmlFor="exampleInputPassword1" className="form-label">State <span className="must-filed">*</span></label>
                                                <Select size='small' value='Bihar' sx={{

                                                    ".MuiOutlinedInput-notchedOutline": {
                                                        border: "none",
                                                    },
                                                }} name="permanentAddress.state" required className="form-control">
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
                                                <RHFTextField name="permanentAddress.city" label="" placeholder='City' />
                                            </div>


                                        </div>

                                        <div className="formBox">
                                            <div className="mb-3 col-lg-3 col-md-12">
                                                <label htmlFor="exampleInputPassword1" className="form-label">Pincode <span className="must-filed">*</span></label>
                                                <RHFTextField name="permanentAddress.pincode" type='number' label="" placeholder='Pincode' inputProps={{ maxLength: 6 }} />

                                            </div>
                                        </div>

                                        <h2 className='footerFormHead'>Present Address</h2>
                                        <div className="formBox">
                                            <div className="mb-3 col-lg-3 col-md-12">
                                                <label htmlFor="exampleInputEmail1" className="form-label">House No./Apartment Name/Block No. <span className="must-filed">*</span></label>
                                                <RHFTextField name="presentAddress.houseNumber" label="" placeholder='House No./Apartment Name/Block No.' />

                                            </div>
                                            <div className="mb-3 col-lg-3 col-md-12">
                                                <label htmlFor="exampleInputPassword1" className="form-label">Road/Street/Lane <span className="must-filed">*</span></label>

                                                <RHFTextField name="presentAddress.road" label="" placeholder='Road/Street/Lane' />
                                            </div>
                                            <div className="mb-3 col-lg-3 col-md-12">
                                                <label htmlFor="exampleInputPassword1" className="form-label">Area/Landmark <span className="must-filed">*</span></label>

                                                <RHFTextField name="presentAddress.area" label="" placeholder='Area/Landmark' />
                                            </div>


                                        </div>
                                        <div className="formBox">
                                            <div className="mb-3 col-lg-3 col-md-12">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Country <span className="must-filed">*</span></label>
                                                <RHFTextField name="presentAddress.country" label="" disabled />

                                            </div>
                                            <div className="mb-3 col-lg-3 col-md-12">
                                                <label htmlFor="exampleInputPassword1" className="form-label">State <span className="must-filed">*</span></label>
                                                <Select value='Jharkhand' size='small' sx={{

                                                    ".MuiOutlinedInput-notchedOutline": {
                                                        border: "none",
                                                    },
                                                }} name="presentAddress.state" required className="form-control">

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
                                                <RHFTextField name="presentAddress.city" label="" placeholder='City' />
                                            </div>


                                        </div>

                                        <div className="formBox">
                                            <div className="mb-3 col-lg-3 col-md-12">
                                                <label htmlFor="exampleInputPassword1" className="form-label">Pincode <span className="must-filed">*</span></label>
                                                <RHFTextField type='number' name="presentAddress.pincode" label="" placeholder='Pincode' inputProps={{ maxLength: 6 }} />
                                            </div>
                                        </div>

                                        <h2 className='footerFormHead'>Contact Details</h2>
                                        <div className="formBox">
                                            <div className="mb-3 col-lg-3 col-md-12">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Email ID <span className="must-filed">*</span></label>

                                                <RHFTextField disabled name="emailId" type='email' label="" placeholder='Email ID' />

                                            </div>
                                            <div className="mb-3 col-lg-3 col-md-12">
                                                <label htmlFor="exampleInputPassword1" className="form-label">Mobile No. <span className="must-filed">*</span></label>

                                                <RHFTextField disabled name="mobileNumber" type='number' label="" placeholder='Mobile No.' inputProps={{ maxLength: 10 }} />
                                            </div>
                                            <div className="mb-3 col-lg-3 col-md-12">
                                                <label htmlFor="exampleInputPassword1" className="form-label">Aadhar No. <span className="must-filed">*</span></label>
                                                <RHFTextField name="aadharNumber" type='number' label="" placeholder='Aadhar No.' inputProps={{ maxLength: 12 }} required />
                                            </div>

                                        </div>
                                        <div className="formBox">
                                            <div className="mb-3 col-lg-3 col-md-12">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Alternate Email ID</label>

                                                <RHFTextField name="alternateEmailId" label="" placeholder='Alternate Email ID' />

                                            </div>
                                            <div className="mb-3 col-lg-3 col-md-12">
                                                <label htmlFor="exampleInputPassword1" className="form-label">Alternate Mobile No.</label>

                                                <RHFTextField name="alternateMobileNumber" type='number' label="" placeholder='Alternate Mobile No.' inputProps={{ maxLength: 10 }} />
                                            </div>
                                            <div className="mb-3 col-lg-3 col-md-12">
                                                <label htmlFor="exampleInputPassword1" className="form-label">Pan No.</label>

                                                <RHFTextField name="pancard" label="" placeholder='Pan No.' inputProps={{ maxLength: 10 }} />
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

                                                        <td> <RHFTextField name="academicQualification.0.className" label="" placeholder='High School' /></td>

                                                        <td> <RHFTextField name="academicQualification.0.schoolName" label="" placeholder='School Name' /></td>


                                                        <td> <RHFTextField name="academicQualification.0.board" label="" placeholder='Board' /></td>



                                                        <td> <RHFTextField name="academicQualification.0.percentage" type='number' label="" placeholder='Percentage' /></td>


                                                        <td> <RHFTextField name="academicQualification.0.passingYear" type='number' label="" placeholder='Passing Year' /></td>



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

                                                        <td> <RHFTextField name="academicQualification.1.className" label="" placeholder='High School' /></td>

                                                        <td> <RHFTextField name="academicQualification.1.schoolName" label="" placeholder='School Name' /></td>


                                                        <td> <RHFTextField name="academicQualification.1.board" label="" placeholder='Board' /></td>



                                                        <td> <RHFTextField name="academicQualification.1.percentage" type='number' label="" placeholder='Percentage' /></td>


                                                        <td> <RHFTextField name="academicQualification.1.passingYear" type='number' label="" placeholder='Passing Year' /></td>





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

                                                        <td> <RHFTextField name="academicQualification.2.className" label="" placeholder='High School' /></td>

                                                        <td> <RHFTextField name="academicQualification.2.schoolName" label="" placeholder='School Name' /></td>


                                                        <td> <RHFTextField name="academicQualification.2.board" label="" placeholder='Board' /></td>



                                                        <td> <RHFTextField name="academicQualification.2.percentage" type='number' label="" placeholder='Percentage' /></td>


                                                        <td> <RHFTextField name="academicQualification.2.passingYear" type='number' label="" placeholder='Passing Year' /></td>




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
                                                            <td> <RHFTextField name="higherQualification.0.courseName" label="" placeholder='Course Name' /></td>
                                                            <td> <RHFTextField name="higherQualification.0.specialization" label="" placeholder='Specialization' /></td>
                                                            <td> <RHFTextField name="higherQualification.0.percentage" type='number' label="" placeholder='Percentage' /></td>
                                                            <td> <RHFTextField name="higherQualification.0.passingYear" type='number' label="" placeholder='Year' /></td>
                                                            <td> <RHFTextField name="higherQualification.0.courseType" label="" placeholder='Course Type' /></td>
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
                                                            <td> <RHFTextField name="higherQualification.1.courseName" label="" placeholder='Course Name' /></td>
                                                            <td> <RHFTextField name="higherQualification.1.specialization" label="" placeholder='Specialization' /></td>
                                                            <td> <RHFTextField name="higherQualification.1.percentage" type='number' label="" placeholder='Percentage' /></td>
                                                            <td> <RHFTextField name="higherQualification.1.passingYear" type='number' label="" placeholder='Year' /></td>
                                                            <td> <RHFTextField name="higherQualification.1.courseType" label="" placeholder='Course Type' /></td>
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
                                                    }} className="form-control select-experience" name="experienceDetails.0.experienced" >

                                                        <MenuItem value="Yes" selected>Yes</MenuItem>
                                                        <MenuItem value="No" onClick={hanldeNo}>No</MenuItem>
                                                    </Select>
                                                }
                                                {
                                                    noExperience &&
                                                    <RHFTextField type="number" name="experienceDetails.0.totalExperience" label="" placeholder='No Experience' />
                                                }

                                            </div>
                                            {hideForm && <div className="mb-3 col-lg-3 col-md-12">
                                                <label htmlFor="exampleInputPassword1" className="form-label">Total Experience (IN YEAR)</label>
                                                <RHFTextField type="number" name="experienceDetails.0.totalExperience" label="" placeholder='Total Experience (IN YEAR)' />
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
                                                            <td> <RHFTextField name="experienceDetails.0.companyName" label="" placeholder='Company Name' /></td>
                                                            <td> <RHFTextField name="experienceDetails.0.designation" label="" placeholder='Designation' /></td>
                                                            <td> <RHFTextField name="experienceDetails.0.location" label="" placeholder='Location' /></td>
                                                            <td> <RHFTextField name="experienceDetails.0.durationFrom" label="" placeholder='Duration From' /></td>
                                                            <td> <RHFTextField name="experienceDetails.0.durationTo" label="" placeholder='Duration To' /></td>
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
                                                            <td> <RHFTextField name="experienceDetails.1.companyName" label="" placeholder='Company Name' /></td>
                                                            <td> <RHFTextField name="experienceDetails.1.designation" label="" placeholder='Designation' /></td>
                                                            <td> <RHFTextField name="experienceDetails.1.location" label="" placeholder='Location' /></td>
                                                            <td> <RHFTextField name="experienceDetails.1.durationFrom" label="" placeholder='Duration From' /></td>
                                                            <td> <RHFTextField name="experienceDetails.1.durationTo" label="" placeholder='Duration To' /></td>
                                                        </tr>


                                                    </tbody>
                                                </table>

                                            </div>


                                        </div>



                                        {/* <div className="file">
                                            <div>
                                                <Files
                                                    className="files-dropzone"

                                                    accepts={['image/*', '.jpeg']}
                                                    multiple={false}

                                                    clickable
                                                >
                                                    <AttachmentThumbnail color="primary">

                                                        <ImgStyle src={String(photoUrl)} alt="img" />

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

                                                        <ImgStyle src={String(photoSignature)} alt="img" />

                                                    </AttachmentThumbnail>
                                                    <AttachmentWrapper>
                                                        <AddBoxOutlinedIcon color="primary" />
                                                        <Typography px={1} variant="body2">
                                                            Upload Signature
                                                        </Typography>
                                                    </AttachmentWrapper>
                                                </Files>
                                            </div>
                                        </div> */}

                                    </div>

                                    <div className="submitForm">

                                        <button className="formSubmit" type='submit'>Save</button>

                                    </div>
                                </FormProvider>
                            </>






                        </div>
                    </section>
                )
            }


        </>
    )
}

export default Edit