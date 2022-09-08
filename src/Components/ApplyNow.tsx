import React from 'react'

const ApplyNow = () => {
    return (
        <section className='formSection'>
            <div className="row container">
                <h1 className='formHead'>Application Form for Store Supervisor</h1>
                <form>
                    <div className="parentForm">
                        <h2 className='footerFormHead'>Personal Details</h2>
                        <div className="formBox">
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputEmail1" className="form-label">Name <span className="must-filed">*</span></label>
                                <input type="text" className="form-control" placeholder='Enter Name' id="exampleInputEmail1" aria-describedby="emailHelp" />

                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">Father Name <span className="must-filed">*</span></label>
                                <input type="text" className="form-control" placeholder='Enter FatherName' id="exampleInputPassword1" />
                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">Mother Name <span className="must-filed">*</span></label>
                                <input type="text" className="form-control" placeholder='Enter MotherName' id="exampleInputPassword1" />
                            </div>

                        </div>
                        <div className="formBox">
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputEmail1" className="form-label">Date Of Birth <span className="must-filed">*</span></label>
                                <input type="date" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">Gender <span className="must-filed">*</span></label>
                                <select className="form-select" id="state" required>
                                    <option value="">Male</option>
                                    <option>Female</option>
                                </select>
                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">Category <span className="must-filed">*</span></label>
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
                                <label htmlFor="exampleInputPassword1" className="form-label">Religion <span className="must-filed">*</span></label>
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
                        <h2 className='footerFormHead'>Permanent Address</h2>
                        <div className="formBox">
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputEmail1" className="form-label">House No/Apartment Name/Block No <span className="must-filed">*</span></label>
                                <input type="text" className="form-control" placeholder='House No/Apartment Name/Block No' id="exampleInputEmail1" aria-describedby="emailHelp" />

                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">Road/Street/Lane <span className="must-filed">*</span></label>
                                <input type="text" className="form-control" placeholder='Road/Street/Lane' id="exampleInputPassword1" />
                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">Area/Landmark <span className="must-filed">*</span></label>
                                <input type="text" className="form-control" placeholder='Area/Landmark' id="exampleInputPassword1" />
                            </div>

                        </div>
                        <div className="formBox">
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputEmail1" className="form-label">Country <span className="must-filed">*</span></label>
                                <input type="text" className="form-control" value='India' id="exampleInputEmail1" aria-describedby="emailHelp" />

                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">State <span className="must-filed">*</span></label>
                                <select name="p_state" required className="form-control">
                                    <option>--select--</option>
                                    <option value="Andaman and Nicobar Islands"  >Andaman and Nicobar Islands</option>
                                    <option value="Andhra Pradesh"  >Andhra Pradesh</option>
                                    <option value="Arunachal Pradesh"  >Arunachal Pradesh</option>
                                    <option value="Assam"  >Assam</option>
                                    <option value="Bihar"  >Bihar</option>
                                    <option value="Chandigarh"  >Chandigarh</option>
                                    <option value="Chhattisgarh"  >Chhattisgarh</option>
                                    <option value="Dadra and Nagar Haveli"  >Dadra and Nagar Haveli</option>
                                    <option value="Daman and Diu"  >Daman and Diu</option>
                                    <option value="Delhi"  >Delhi</option>
                                    <option value="Goa"  >Goa</option>
                                    <option value="Gujarat"  >Gujarat</option>
                                    <option value="Haryana"  >Haryana</option>
                                    <option value="Himachal Pradesh"  >Himachal Pradesh</option>
                                    <option value="Jammu and Kashmir"  >Jammu and Kashmir</option>
                                    <option value="Jharkhand"  >Jharkhand</option>
                                    <option value="Karnataka"  >Karnataka</option>
                                    <option value="Kenmore"  >Kenmore</option>
                                    <option value="Kerala"  >Kerala</option>
                                    <option value="Lakshadweep"  >Lakshadweep</option>
                                    <option value="Madhya Pradesh"  >Madhya Pradesh</option>
                                    <option value="Maharashtra"  >Maharashtra</option>
                                    <option value="Manipur"  >Manipur</option>
                                    <option value="Meghalaya"  >Meghalaya</option>
                                    <option value="Mizoram"  >Mizoram</option>
                                    <option value="Nagaland"  >Nagaland</option>
                                    <option value="Narora"  >Narora</option>
                                    <option value="Natwar"  >Natwar</option>
                                    <option value="Odisha"  >Odisha</option>
                                    <option value="Paschim Medinipur"  >Paschim Medinipur</option>
                                    <option value="Pondicherry"  >Pondicherry</option>
                                    <option value="Punjab"  >Punjab</option>
                                    <option value="Rajasthan"  >Rajasthan</option>
                                    <option value="Sikkim"  >Sikkim</option>
                                    <option value="Tamil Nadu"  >Tamil Nadu</option>
                                    <option value="Telangana"  >Telangana</option>
                                    <option value="Tripura"  >Tripura</option>
                                    <option value="Uttar Pradesh"  >Uttar Pradesh</option>
                                    <option value="Uttarakhand"  >Uttarakhand</option>
                                    <option value="Vaishali"  >Vaishali</option>
                                    <option value="West Bengal"  >West Bengal</option>
                                </select>
                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">City <span className="must-filed">*</span></label>
                                <input type="text" className="form-control" placeholder='City' id="exampleInputPassword1" />
                            </div>


                        </div>
                        <div className="formBox">
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">Pincode <span className="must-filed">*</span></label>
                                <input type="text" className="form-control" placeholder='PinCode' id="exampleInputPassword1" />
                            </div>
                        </div>
                        <hr />
                        <h2 className='footerFormHead'>Present/Correspondence Address</h2>
                        <div className="formBox">
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputEmail1" className="form-label">House No/Apartment Name/Block No <span className="must-filed">*</span></label>
                                <input type="text" className="form-control" placeholder='House No/Apartment Name/Block No' id="exampleInputEmail1" aria-describedby="emailHelp" />

                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">Road/Street/Lane <span className="must-filed">*</span></label>
                                <input type="text" className="form-control" placeholder='Road/Street/Lane' id="exampleInputPassword1" />
                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">Area/Landmark <span className="must-filed">*</span></label>
                                <input type="text" className="form-control" placeholder='Area/Landmark' id="exampleInputPassword1" />
                            </div>


                        </div>
                        <div className="formBox">
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputEmail1" className="form-label">Country <span className="must-filed">*</span></label>
                                <input type="text" className="form-control" value='India' id="exampleInputEmail1" aria-describedby="emailHelp" />

                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">State <span className="must-filed">*</span></label>
                                <select name="p_state" required className="form-control">
                                    <option>--select--</option>
                                    <option value="Andaman and Nicobar Islands"  >Andaman and Nicobar Islands</option>
                                    <option value="Andhra Pradesh"  >Andhra Pradesh</option>
                                    <option value="Arunachal Pradesh"  >Arunachal Pradesh</option>
                                    <option value="Assam"  >Assam</option>
                                    <option value="Bihar"  >Bihar</option>
                                    <option value="Chandigarh"  >Chandigarh</option>
                                    <option value="Chhattisgarh"  >Chhattisgarh</option>
                                    <option value="Dadra and Nagar Haveli"  >Dadra and Nagar Haveli</option>
                                    <option value="Daman and Diu"  >Daman and Diu</option>
                                    <option value="Delhi"  >Delhi</option>
                                    <option value="Goa"  >Goa</option>
                                    <option value="Gujarat"  >Gujarat</option>
                                    <option value="Haryana"  >Haryana</option>
                                    <option value="Himachal Pradesh"  >Himachal Pradesh</option>
                                    <option value="Jammu and Kashmir"  >Jammu and Kashmir</option>
                                    <option value="Jharkhand"  >Jharkhand</option>
                                    <option value="Karnataka"  >Karnataka</option>
                                    <option value="Kenmore"  >Kenmore</option>
                                    <option value="Kerala"  >Kerala</option>
                                    <option value="Lakshadweep"  >Lakshadweep</option>
                                    <option value="Madhya Pradesh"  >Madhya Pradesh</option>
                                    <option value="Maharashtra"  >Maharashtra</option>
                                    <option value="Manipur"  >Manipur</option>
                                    <option value="Meghalaya"  >Meghalaya</option>
                                    <option value="Mizoram"  >Mizoram</option>
                                    <option value="Nagaland"  >Nagaland</option>
                                    <option value="Narora"  >Narora</option>
                                    <option value="Natwar"  >Natwar</option>
                                    <option value="Odisha"  >Odisha</option>
                                    <option value="Paschim Medinipur"  >Paschim Medinipur</option>
                                    <option value="Pondicherry"  >Pondicherry</option>
                                    <option value="Punjab"  >Punjab</option>
                                    <option value="Rajasthan"  >Rajasthan</option>
                                    <option value="Sikkim"  >Sikkim</option>
                                    <option value="Tamil Nadu"  >Tamil Nadu</option>
                                    <option value="Telangana"  >Telangana</option>
                                    <option value="Tripura"  >Tripura</option>
                                    <option value="Uttar Pradesh"  >Uttar Pradesh</option>
                                    <option value="Uttarakhand"  >Uttarakhand</option>
                                    <option value="Vaishali"  >Vaishali</option>
                                    <option value="West Bengal"  >West Bengal</option>
                                </select>
                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">City <span className="must-filed">*</span></label>
                                <input type="text" className="form-control" placeholder='City' id="exampleInputPassword1" />
                            </div>


                        </div>
                        <div className="formBox">
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">Pincode <span className="must-filed">*</span></label>
                                <input type="text" className="form-control" placeholder='PinCode' id="exampleInputPassword1" />
                            </div>
                        </div>
                    </div>


                    <div className="parentForm">
                        <h2 className='footerFormHead'>Contact Details</h2>
                        <div className="formBox">
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email ID <span className="must-filed">*</span></label>
                                <input type="text" className="form-control" placeholder='Email ID' id="exampleInputEmail1" aria-describedby="emailHelp" />

                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">Mobile No <span className="must-filed">*</span></label>
                                <input type="text" className="form-control" placeholder='Mobile No' id="exampleInputPassword1" />
                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">Aadhar No <span className="must-filed">*</span></label>
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

                    <div className="parentForm">
                        <h2 className='footerFormHead' id="add-modal-label">Uplaod Documents <span className="must-filed"><span className="must-filed">*</span></span></h2>
                        <div className="formBox">
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputEmail1" className="form-label">Upload Photo <span className="must-filed">*</span></label>
                                <input type="file" className="form-control file-max-upload" id="add-Photo" accept=".jpeg" name="photo" required />

                            </div>
                            <div className="mb-3 col-lg-3 col-md-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">Upload Signature <span className="must-filed">*</span></label>
                                <input type="file" className="form-control file-max-upload" id="add-Sign" accept=".jpeg" required name="signature" />
                            </div>


                        </div>


                    </div>
                    <div className="submitFormData">
                        <button type="submit" className="formSubmit">Submit</button>
                        <button type="submit" className="formSubmit">save</button>
                    </div>

                </form>

            </div>
        </section>
    )
}

export default ApplyNow