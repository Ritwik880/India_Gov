import React, { useState, useEffect, useRef } from 'react'
import { BUTTONDATA as data } from '../../utils/constants';
import axios from '../../utils/axios';
import { Box, CircularProgress, styled } from "@mui/material";
type UsersList = {
    news: string
}
const Wrapper = styled("div")(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: "300px",
    width: '82%',
    background: 'rgba(255, 255, 255, .6)',
    boxShadow: '3px 3px 5px #a29191',
    borderBottomRightRadius: '1rem',
    borderBottomLeftRadius: '1rem',
    marginBottom: '2rem'
}));
const Body = styled("div")(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: "200px",
    maxHeight: "100%",
    overflow: "auto",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
        width: "0.3em",
        backgroundColor: "#000",
    },
    "&::-webkit-scrollbar-track": {
        boxShadow: "inset 0 0 6px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb": {
        borderRadius: "10px",
        backgroundColor: theme.palette.primary.main,
    },
}));
const Notification = () => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<UsersList[]>([]);
    const isMounted = useRef(false);
    const [noData, setNoData] = useState(false);


    useEffect(() => {
        const getUser = async () => {
            setLoading(true);
            try {
                await axios.get(`/api/application/fetch-news`).then((response) => {
                    if (!isMounted.current) {
                        const { body } = response.data;
                        if (!body.length) {
                            setNoData(true);
                        }
                        setUsers(body);


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

            <Wrapper>
                <div className="head">
                    <h1 style={{ fontSize: '2rem' }}> What's new</h1>
                </div>
                {
                    noData ? (
                        <div className="text">
                            <p className='textPara'>No News Found!</p>
                        </div>

                    ) : (
                        <>
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

                                    <Body>


                                        {
                                            users.map((item, id) => {
                                                return (

                                                    <p className='newsPara' key={id}>
                                                        {item.news}
                                                    </p>

                                                )
                                            })
                                        }

                                    </Body>



                                )
                            }
                        </>
                    )
                }
            </Wrapper>

        </section >

    )
}

export default Notification