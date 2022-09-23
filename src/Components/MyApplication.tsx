import React, { useEffect, useState, useRef } from 'react'
import { Button, styled, Box, CircularProgress } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';


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
type MyApplicationType = {
    createdDate: string;
    applicationId: number;
    postName: string;
    paymentStatus: boolean;

};
type PropsType = {

}
const MyApplication = (props: PropsType) => {
    const [loading, setLoading] = useState(false);
    const [noSuggestion, setNoSuggestion] = useState(false);
    const [applicationId, setApplicationId] = useState([0]);
    const [users, setUsers] = useState<MyApplicationType[]>([]);

    const navigate = useNavigate();
    const isMounted = useRef(false);


    useEffect(() => {
        const getUser = async () => {
            setLoading(true);
            try {
                await axios.post("/api/application/fetch-application-details",
                    {

                        applicationId: [20],
                        userId: 5905

                    }

                ).then((response) => {
                    if (!isMounted.current) {
                        const { body } = response.data;
                        setUsers(body);
                        console.log(body);

                    }
                });
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error(error);
            }
        };
        getUser();
    }, []);






    return (
        <>
            <div className="pb-6 d-flex align-items-center about-page">
                <div className="container d-flex align-items-center">
                    <div className="text-white mx-auto mt-5 upper">
                    </div>
                </div>
            </div>

            {
                loading ? (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            pt: '10%'
                        }}
                    >
                        <CircularProgress />
                    </Box>

                ) : (
                    <section className='myApp'>
                        <div className="row container">
                            <h4 className='myAppHead'>My Application</h4>
                            {
                                users && users.map((item, id) => {
                                    return (
                                        <div className="myAppTable" key={id}>
                                            <table style={{ background: '#f7f7f7', border: '2px solid #26335d', boxShadow: '3px 4px 4px #26335d', padding: '0.5rem' }}>
                                                <tr style={{ border: '1px solid #ddd' }}>

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
                                                            {
                                                                item.applicationId
                                                            }
                                                        </p>
                                                    </td>

                                                    <td style={{ color: '#26335d' }}>
                                                        <p style={{ textAlign: 'center' }} className='myAppPara'>
                                                            {
                                                                item.postName
                                                            }
                                                        </p>
                                                    </td>

                                                    <td>
                                                        {
                                                            users.map((item, id) => {
                                                                return (
                                                                    <>
                                                                        {
                                                                            item.paymentStatus === false ?
                                                                                <Div>
                                                                                    <Btn>Proceed to pay</Btn>
                                                                                </Div>
                                                                                :
                                                                                <Div>
                                                                                    <Btn sx={{ marginRight: '1rem' }}>Paid</Btn>
                                                                                    <Btn>Download Receipt</Btn>
                                                                                </Div>
                                                                        }
                                                                    </>
                                                                )
                                                            })
                                                        }
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

export default MyApplication