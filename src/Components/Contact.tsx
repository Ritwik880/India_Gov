import React, { useState } from 'react';
import '../contact.css'
import { Form, Row, Col, Button } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
// import { db } from "../firebase.js";
import "react-toastify/dist/ReactToastify.css";
import Cta from './Cta';

const Contact = () => {
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [item, setItem] = useState("");
    const [message, setMessage] = useState("");

    const [loader, setLoader] = useState(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setLoader(true);


    };
    return (
        <>
            <div className="pb-6 d-flex align-items-center contact-page">
                <div className="container d-flex align-items-center">
                    <div className="text-white mx-auto mt-5 upper">
                    </div>
                </div>
            </div>
            <section className="section gray-bg" id="contactus">
                <ToastContainer position="top-center" />
                <div className="row container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="section-title">
                                <h2>Get In Touch</h2>
                                {/* <p>I design and develop services for customers of all sizes, specializing in creating stylish, modern websites</p> */}
                            </div>
                        </div>
                    </div>
                    <div className="row flex-row-reverse">
                        <div className="col-md-7 col-lg-8 m-15px-tb">
                            <div className="contact-form">
                                <h5>HAVE ANY QUERY?</h5>
                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col>
                                            <Form.Control type="text" placeholder="Enter Name*" required autoComplete="offf" value={first}
                                                onChange={(e) => setFirst(e.target.value)} />
                                        </Col>
                                        <Col className="inPhone">
                                            <Form.Control type="text" placeholder="Enter Email*" required autoComplete="offf" value={last}
                                                onChange={(e) => setLast(e.target.value)} />
                                        </Col>
                                    </Row>
                                    <Row className="my-2">
                                        <Col>
                                            <Form.Control type="email" placeholder="Enter Subject*" required autoComplete="offf" value={email}
                                                onChange={(e) => setEmail(e.target.value)} />
                                        </Col>
                                        <Col className="inPhone">
                                            <Form.Control type="number" placeholder="Enter Phone*" required autoComplete="offf" value={phone}
                                                onChange={(e) => setPhone(e.target.value)} />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">

                                            <Form.Control placeholder="Enter Message*" as="textarea" required rows={3} value={message}
                                                onChange={(e) => setMessage(e.target.value)} />
                                        </Form.Group>
                                    </Row>
                                    <Button type="submit" className="contactPageBtn">SEND YOUR MESSAGE</Button>
                                </Form>
                            </div>
                        </div>
                        <div className="col-md-5 col-lg-4 m-15px-tb mobileView">
                            <div className="contact-name">
                                <h5>Mail</h5>
                                <p>helpcenter@isdoindia.org</p>
                            </div>
                            <div className="contact-name">
                                <h5>Visit Our Office</h5>
                                <p>Nelson Mandela Marg, Vasant Kunj, New Delhi -110067</p>
                            </div>


                        </div>
                    </div>
                </div>
            </section>
            <Cta />
        </>
    )
}

export default Contact