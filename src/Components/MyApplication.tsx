import React from 'react'
import { Button, styled } from "@mui/material";
import { useNavigate } from 'react-router-dom';


const Btn = styled(Button)(({ theme }) => ({
    borderRadius: "3px",
    backgroundColor: '#26335d',
    color: '#fff',
    textTransform: 'capitalize'

}));

const Div = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'

}));
const MyApplication = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="pb-6 d-flex align-items-center about-page">
                <div className="container d-flex align-items-center">
                    <div className="text-white mx-auto mt-5 upper">
                    </div>
                </div>
            </div>

            <section className='myApp'>
                <div className="row container">
                    <h4 className='myAppHead'>My Application</h4>
                    <div className="myAppTable">
                        <table style={{ background: '#f7f7f7', border: '2px solid #26335d', boxShadow: '3px 4px 4px #26335d', padding: '0.5rem' }}>
                            <tr style={{ border: '1px solid #ddd' }}>
                                <th style={{ color: '#26335d' }}>
                                    <p style={{ textAlign: 'center' }} className='myAppPara'>
                                        Date
                                    </p>

                                </th>
                                <th style={{ color: '#26335d' }}>
                                    <p style={{ textAlign: 'center' }} className='myAppPara'>
                                        Reg No.
                                    </p>

                                </th>
                                <th style={{ color: '#26335d' }}>
                                    <p style={{ textAlign: 'center' }} className='myAppPara'>
                                        Post Applied For
                                    </p>

                                </th>
                                <th style={{ color: '#26335d' }}>
                                    <p style={{ textAlign: 'center' }} className='myAppPara'>
                                        Payment Status
                                    </p>

                                </th>
                                <th style={{ color: '#26335d' }}>
                                    <p style={{ textAlign: 'center' }} className='myAppPara'>
                                        View Application
                                    </p>

                                </th>

                                <th style={{ color: '#26335d' }}>
                                    <p style={{ textAlign: 'center' }} className='myAppPara'>
                                        Edit
                                    </p>

                                </th>


                            </tr>

                            <tr>

                                <td style={{ color: '#26335d' }}>
                                    <p style={{ textAlign: 'center' }} className='myAppPara'>
                                        2022-09-20 18:39:48
                                    </p>
                                </td>

                                <td style={{ color: '#26335d' }}>
                                    <p style={{ textAlign: 'center' }} className='myAppPara'>
                                        ISDO2206788
                                    </p>
                                </td>

                                <td style={{ color: '#26335d' }}>
                                    <p style={{ textAlign: 'center' }} className='myAppPara'>
                                        Project Manager
                                    </p>
                                </td>

                                <td>
                                    <Div>
                                        <Btn sx={{ marginRight: '1rem' }}>Paid</Btn>
                                        <Btn>Download Receipt</Btn>
                                    </Div>
                                </td>
                                <td>
                                    <Div>
                                        <Btn>
                                            View/Download
                                        </Btn>
                                    </Div>
                                </td>

                                <td>
                                    <Div>
                                        <Btn onClick={() => navigate('/apply-now')}>
                                            Edit
                                        </Btn>
                                    </Div>
                                </td>

                            </tr>


                        </table>
                    </div>
                </div>
            </section>
        </>
    )
}

export default MyApplication