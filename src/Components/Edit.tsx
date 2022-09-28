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
import { useLocation } from 'react-router-dom';
import { ProfileValuesProps, ProfileValues } from '../@types/object';




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
    const [statePermanent, setStatePermanent] = useState("");
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
                permanentAddress: {
                    houseNumber: houseNo,
                    road: permanentRoad,
                    area: permanentArea,
                    country: country,
                    state: state,
                    city: permanentCity,
                    pincode: parseInt(pincode),
                },
                presentAddress: {
                    houseNumber: presentHouseNo,
                    road: road,
                    area: area,
                    country: countryPresent,
                    state: statePresent,
                    city: city,
                    pincode: parseInt(pinCodePresent),
                },
                academicQualification: [
                    {
                        schoolName: schoolName,
                        className: className,
                        board: boardName,
                        passingYear: parseInt(passingYear),
                        percentage: parseInt(percentage),

                    }
                ],
                alternateMobileNumber: parseInt(alternateMobileNumber),
                alternateEmailId: data.alternateEmailId,
                aadharNumber: parseInt(adhar),
                pancard: data.pancard,
            });
            toast.success('Success');
            setRefreshFlag(true);
        } catch (error: any) {
            console.log(error);

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
                if (!isMounted.current) {
                    setUsers(body);
                    body.applicantName ? setValue("applicantName", body.applicantName) : setValue("applicantName", "");

                }
            } catch (error) {
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
    // setOrganizationName(get(loanDoc, "organizationName", ""));



    // const handleOnChange = (event: any, key: string) => {
    //     switch (key) {
    //         case "organizationName": {
    //             setOrganizationName(event.target.value);
    //             break;
    //         }
    //         case "accountNumber": {
    //             setAccountNumber(event.target.value);
    //             break;
    //         }
    //         case "collateral": {
    //             setCollateral(event.target.value);
    //             break;
    //         }
    //         case "idNumber": {
    //             setIdNumber(event.target.value);
    //             break;
    //         }
    //         case "bankIdentificationNumber": {
    //             setBankIdentificationNumber(event.target.value);
    //             break;
    //         }
    //     }

    const handleChange = (event: any, name: string, id: number) => {
        let editUsers: any = [{ ...users }];
        editUsers[id]['applicantName'] = name;
        setUsers(editUsers)
        console.log(users);



    }


    // const handleChange = (e: any) => {
    //     setUsers({ ...users, [e.target.name]: e.target.value });
    // };
    return (
        <>

            <section className='formSection'>
                <div className="row container">
                    <ToastContainer position="top-center" />

                    {
                        users && users.map((item, id) => {
                            return (
                                <>
                                    <h1 className='formHead'>Application Form for <span className='dynamic_data'>
                                        {item.postName}
                                    </span></h1>
                                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

                                        <div className="parentForm" key={id}>
                                            <h2 className='footerFormHead'>Personal Details</h2>
                                            <div className="formBox">
                                                <div className="mb-3 col-lg-3 col-md-12">
                                                    <label htmlFor="exampleInputEmail1" className="form-label">Name <span className="must-filed">*</span></label>
                                                    <RHFTextField name="applicantName" value={item.applicantName} onChange={(e) => handleChange(e, item.applicantName, id)} label="" placeholder='Enter Name' />
                                                </div>
                                            </div>

                                        </div>

                                        <div className="submitForm">

                                            <button className="formSubmit" type='submit'>Save</button>

                                        </div>
                                    </FormProvider>
                                </>
                            )
                        })
                    }





                </div>
            </section>


        </>
    )
}

export default Edit