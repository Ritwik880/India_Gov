export type ProfileValuesProps = {
    uploadSignature: Blob;
    uploadPhoto: Blob;
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
    otherCategory: string;
    otherReligion: string;
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

    afterSubmit?: string;



};

export type ProfileValues = {
    uploadSignature: {
        url: string;
    };
    uploadPhoto: {
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

    afterSubmit?: string;



};