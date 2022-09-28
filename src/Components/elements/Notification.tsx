import React, { useState, useEffect, useRef } from 'react'
import { BUTTONDATA as data } from '../../utils/constants';
import axios from '../../utils/axios';
import { Box, CircularProgress } from "@mui/material";
type UsersList = {
    name: string
}
const Notification = () => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<UsersList[]>([]);
    const isMounted = useRef(false);


    useEffect(() => {
        const getUser = async () => {
            setLoading(true);
            try {
                await axios.post(`/api/application/fetch-news`).then((response) => {
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
        <section className='noti'>
            <div className='mapButtons'>
                {
                    data.map((item, i) => {
                        return (
                            <button key={i} className='mapData'>
                                {item.title}
                            </button>
                        )
                    })
                }
            </div>
            <div className="box">
                <div className="head">
                    <h1 style={{ fontSize: '2rem' }}> What's new</h1>
                </div>
                {
                    loading ? (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: '100vh'
                            }}
                        >
                            <CircularProgress />
                        </Box>

                    ) : (


                        users.length > 0 ? (
                            <>
                                {
                                    users.map((item, id) => {
                                        return (
                                            <div key={id}>
                                                <p>
                                                    {item.name}
                                                </p>
                                            </div>
                                        )
                                    })
                                }
                            </>
                        ) : (
                            <div className="text">
                                <p className='textPara'>No News Found!</p>
                            </div>
                        )


                    )
                }
            </div>
        </section>

    )
}

export default Notification