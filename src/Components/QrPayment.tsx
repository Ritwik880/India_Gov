import React, { useState } from 'react'
import Cta from './Cta'
import {
    CircularProgress,
    Box,
    styled,
    Typography
} from "@mui/material";
import axios from '../utils/axios';
import { ToastContainer, toast } from "react-toastify";
import RHFTextField from './hook-form/RHFTextField'
import FormProvider from './hook-form/FormProvider'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Select, MenuItem, InputLabel } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
// @ts-ignore
import Files from 'react-files';
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';

type QrProps = {
    transactionID: string;
    applicationId: string;

}


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
const QrPayment = () => {
    const [loading, setLoading] = useState(false);
    const { state }: { state: any } = useLocation();
    const [uploadFileSignatureSrc, setUploadSignatureSrc] = useState<string>('');
    const [uploadFileSignature, setUploadFileSignature] = useState<string | Blob>('');
    const navigate = useNavigate();
    const ProfileSchema = Yup.object().shape({
        transactionID: Yup.string().required('Transaction ID is required'),
    });

    const defaultValues = {
        transactionID: '',
    };
    const methods = useForm<QrProps>({
        resolver: yupResolver(ProfileSchema),
        defaultValues,
    });

    // const categoryBased = state?.category;
    var amountFixed;
    switch (state?.category) {
        case 'General':
            amountFixed = 690
            break;
        case 'OBC':
            amountFixed = 350
            break;
        case 'SC':
            amountFixed = 350
            break;
        case 'ST':
            amountFixed = 350
            break;
        case 'EWS':
            amountFixed = 350
            break;
        default:
            amountFixed = 350;
            break;
    }

    const { reset, handleSubmit } = methods;
    const onSubmit = async (data: QrProps, event: any) => {

        event.stopPropagation();
        var amount;
        switch (state?.category) {
            case 'General':
                amount = 690
                break;
            case 'OBC':
                amount = 350
                break;
            case 'SC':
                amount = 350
                break;
            case 'ST':
                amount = 350
                break;
            case 'EWS':
                amount = 350
                break;
            default:
                amount = 350;
                break;
        }
        setLoading(true);
        try {
            await axios.post('/api/application/update-qr-payment-status', {
                transactionID: data.transactionID,
                amount: amount,
                applicationId: state?.applicationId,
                uploadScreenShot: uploadFileSignature,
                orderId: data.transactionID,

            });
            const userId = state?.userId;
            const applicationId = state?.applicationId;
            toast.success('Success');
            setLoading(false);
            reset();
            navigate('/my-application', { state: { applicationId, userId } })
        } catch (error: any) {
            setLoading(false);
            console.log(error);
            toast.error("Something went wrong!");
        }
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
    return (
        <>
            <div className="pb-6 d-flex align-items-center about-page">
                <div className="container d-flex align-items-center">
                    <div className="text-white mx-auto mt-5 upper">
                    </div>
                </div>
            </div>
            <section className="qrCode">
                <div className="row container">
                    <ToastContainer position="top-center" />
                    <div className="rightText">
                        <p className="fpciinstpdf" style={{ color: 'red', fontWeight: '600' }}>
                            Application fees/Intimation Charges - For SC/ST/OBC/EWS Rs 350/-
                        </p>
                        <p className="fpciinstpdf" style={{ color: 'red', fontWeight: '600' }}>Other than SC/ST/OBC/EWS Rs 690/-</p>
                    </div>
                    <h5 className='notice'>Applicant are advised to submit application/intimation charges from QR code do according to your category filled in the application form otherwise your application form will be rejected.</h5>
                    <div className="col-lg-7 col-md-12">
                        <img src="./images/pay.jpeg" alt="payment" style={{ width: '350px' }} />

                    </div>
                    <div className="col-lg-5 col-md-12">
                        <div className='qrCodeForm'>
                            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                                <label htmlFor="exampleInputEmail1" className="form-label">Transaction ID: <span className="must-filed">*</span></label>

                                <RHFTextField name="transactionID" label="" placeholder='Transaction ID' required />

                                <div style={{ marginBottom: '1rem' }}>
                                    <label htmlFor="exampleInputEmail1" className="form-label">Amount: <span className="must-filed">*</span></label>

                                    <RHFTextField name="amount" label="" placeholder='Amount' value={amountFixed} disabled />
                                </div>

                                <div >
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
                                                Upload Screenshot
                                            </Typography>
                                        </AttachmentWrapper>
                                    </Files>
                                </div>


                                <button className="formSubmit" type='submit'>Submit</button>

                            </FormProvider>
                        </div>

                    </div>
                </div>
            </section>
            <Cta />
        </>
    )
}

export default QrPayment