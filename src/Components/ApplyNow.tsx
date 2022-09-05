import React from 'react'

const ApplyNow = () => {
    return (
        <section className='formSection'>
            <div className="row container">
                <h1 className='formHead'>Application Form for Store Supervisor</h1>
                <form>
                    <div className="parentForm">
                        <h2>Personal Details</h2>
                        <div className="formBox">
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputEmail1" className="form-label">Name *</label>
                                <input type="text" className="form-control" placeholder='Enter Name' id="exampleInputEmail1" aria-describedby="emailHelp" />

                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">Father Name *</label>
                                <input type="text" className="form-control" placeholder='Enter FatherName' id="exampleInputPassword1" />
                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">Mother Name *</label>
                                <input type="text" className="form-control" placeholder='Enter MotherName' id="exampleInputPassword1" />
                            </div>

                        </div>
                        <div className="formBox">
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputEmail1" className="form-label">Date Of Birth *</label>
                                <input type="date" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">Gender *</label>
                                <select className="form-select" id="state" required>
                                    <option value="">Male</option>
                                    <option>Female</option>
                                </select>
                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">Category *</label>
                                <select className="form-select" id="state" required>
                                    <option value="">Choose...</option>
                                    <option>General</option>
                                    <option>OBC</option>
                                    <option>ST</option>
                                    <option>SC</option>
                                    <option>EWS</option>
                                    <option>others</option>
                                </select>
                            </div>


                        </div>
                        <div className="formBox">
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">Religion *</label>
                                <select className="form-select" id="state" required>
                                    <option value="">Choose...</option>
                                    <option>Hindu</option>
                                    <option>Sikh</option>
                                    <option>Christian</option>
                                    <option>Muslim</option>
                                    <option>Jain</option>
                                    <option>Buddhist</option>
                                    <option>others</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="parentForm">
                        <h2>Permanent Address</h2>
                        <div className="formBox">
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputEmail1" className="form-label">House No/Apartment Name/Block No *</label>
                                <input type="text" className="form-control" placeholder='House No/Apartment Name/Block No' id="exampleInputEmail1" aria-describedby="emailHelp" />

                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">Road/Street/Lane *</label>
                                <input type="text" className="form-control" placeholder='Road/Street/Lane' id="exampleInputPassword1" />
                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">Area/Landmark *</label>
                                <input type="text" className="form-control" placeholder='Area/Landmark' id="exampleInputPassword1" />
                            </div>

                        </div>
                        <div className="formBox">
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputEmail1" className="form-label">Country *</label>
                                <input type="text" className="form-control" value='India' id="exampleInputEmail1" aria-describedby="emailHelp" />

                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">State *</label>
                                <input type="text" className="form-control" id="exampleInputPassword1" />
                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">City *</label>
                                <input type="text" className="form-control" placeholder='City' id="exampleInputPassword1" />
                            </div>


                        </div>
                        <div className="formBox">
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">Pincode *</label>
                                <input type="text" className="form-control" placeholder='PinCode' id="exampleInputPassword1" />
                            </div>
                        </div>
                        <hr />
                        <h2>Present/Correspondence Address</h2>
                        <div className="formBox">
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputEmail1" className="form-label">House No/Apartment Name/Block No *</label>
                                <input type="text" className="form-control" placeholder='House No/Apartment Name/Block No' id="exampleInputEmail1" aria-describedby="emailHelp" />

                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">Road/Street/Lane *</label>
                                <input type="text" className="form-control" placeholder='Road/Street/Lane' id="exampleInputPassword1" />
                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">Area/Landmark *</label>
                                <input type="text" className="form-control" placeholder='Area/Landmark' id="exampleInputPassword1" />
                            </div>


                        </div>
                        <div className="formBox">
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputEmail1" className="form-label">Country *</label>
                                <input type="text" className="form-control" value='India' id="exampleInputEmail1" aria-describedby="emailHelp" />

                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">State *</label>
                                <input type="text" className="form-control" id="exampleInputPassword1" />
                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">City *</label>
                                <input type="text" className="form-control" placeholder='City' id="exampleInputPassword1" />
                            </div>


                        </div>
                        <div className="formBox">
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">Pincode *</label>
                                <input type="text" className="form-control" placeholder='PinCode' id="exampleInputPassword1" />
                            </div>
                        </div>
                    </div>


                    <div className="parentForm">
                        <h2>Contact Details</h2>
                        <div className="formBox">
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email ID *</label>
                                <input type="text" className="form-control" placeholder='Email ID' id="exampleInputEmail1" aria-describedby="emailHelp" />

                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">Mobile No *</label>
                                <input type="text" className="form-control" placeholder='Mobile No' id="exampleInputPassword1" />
                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">Aadhar No *</label>
                                <input type="text" className="form-control" placeholder='Aadhar No' id="exampleInputPassword1" />
                            </div>

                        </div>
                        <div className="formBox">
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputEmail1" className="form-label">Alternate Email ID</label>
                                <input type="text" className="form-control" placeholder='Alternate Email ID' id="exampleInputEmail1" aria-describedby="emailHelp" />

                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">Alternate Mobile No</label>
                                <input type="text" className="form-control" placeholder='Alternate Mobile No' id="exampleInputPassword1" />
                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">Pancard No.</label>
                                <input type="text" className="form-control" placeholder='Pancard No' id="exampleInputPassword1" />
                            </div>


                        </div>

                    </div>
                    <button type="submit" className="formSubmit">Submit</button>

                </form>

            </div>
        </section>
    )
}

export default ApplyNow