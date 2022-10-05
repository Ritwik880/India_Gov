export type ProfileValuesProps = {
    uploadPhoto: {
        extension: string;
        id: string;
        type: string;
        url: string;
        sizeReadable: string;
    },
    uploadSignature: {
        extension: string;
        id: string;
        type: string;
        url: string;
        sizeReadable: string;
    },
    aadharNumber: string;
    academicQualification: [
        {
            board: string;
            className: string;
            passingYear: string;
            percentage: string;
            schoolName: string
        },
        {
            board: string;
            className: string;
            passingYear: string;
            percentage: string;
            schoolName: string
        },
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
        },
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
        },
        {
            companyName: string;
            designation: string;
            durationFrom: string;
            durationTo: string;
            location: string;

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
    uploadPhoto: {
        extension: string;
        id: string;
        type: string;
        url: string;
        sizeReadable: string;
    },
    applicationId: string;
    uploadSignature: {
        extension: string;
        id: string;
        type: string;
        url: string;
        sizeReadable: string;
    },
    aadharNumber: string;
    academicQualification: [
        {
            academicQualificationId: number;
            className: string;
            schoolName: string;
            board: string;
            percentage: number;
            passingYear: number;
        },
        {
            academicQualificationId: number;
            className: string;
            schoolName: string;
            board: string;
            percentage: number;
            passingYear: number;
        },
        {
            academicQualificationId: number;
            className: string;
            schoolName: string;
            board: string;
            percentage: number;
            passingYear: number;
        }
    ],

    higherQualification: [
        {
            higherQualificationId: number;
            courseName: string;
            specialization: string;
            percentage: number;
            passingYear: number;
            courseType: string;
        },
        {
            higherQualificationId: number;
            courseName: string;
            specialization: string;
            percentage: number;
            passingYear: number;
            courseType: string;
        }
    ],

    experienceDetails: [
        {
            experienceDetailId: number,
            companyName: string;
            designation: string;
            location: string;
            durationFrom: string;
            durationTo: string;
            experienced: string;
            totalExperience: number;
        },
        {
            experienceDetailId: number,
            companyName: string;
            designation: string;
            location: string;
            durationFrom: string;
            durationTo: string;
            experienced: string;
            totalExperience: number;
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
    otherCategory: string;
    otherReligion: string;
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


export type ProfileValuesEditProps = {
    uploadPhoto: {
        extension: string;
        id: string;
        type: string;
        url: string;
        sizeReadable: string;
    },
    uploadSignature: {
        extension: string;
        id: string;
        type: string;
        url: string;
        sizeReadable: string;
    },
    aadharNumber: string;
    academicQualification: [
        {
            academicQualificationId: number,
            board: string;
            className: string;
            passingYear: string;
            percentage: string;
            schoolName: string
        },
        {
            academicQualificationId: number,
            board: string;
            className: string;
            passingYear: string;
            percentage: string;
            schoolName: string
        },
        {
            academicQualificationId: number,
            board: string;
            className: string;
            passingYear: string;
            percentage: string;
            schoolName: string
        }

    ],
    higherQualification: [
        {
            higherQualificationId: number,
            courseName: string;
            courseType: string;
            passingYear: string;
            percentage: string;
            specialization: string;
        },
        {
            higherQualificationId: number,
            courseName: string;
            courseType: string;
            passingYear: string;
            percentage: string;
            specialization: string;
        }
    ],
    experienceDetails: [
        {
            experienceDetailId: number;
            companyName: string;
            designation: string;
            durationFrom: string;
            durationTo: string;
            experienced: string;
            location: string;
            totalExperience: string,
        },
        {
            experienceDetailId: number;
            companyName: string;
            designation: string;
            durationFrom: string;
            durationTo: string;
            location: string;

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