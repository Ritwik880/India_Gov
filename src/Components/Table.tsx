import React, { useState } from 'react'
import { ROW as rowData } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
// import ApplyNow from './ApplyNow';
const Table = () => {
    // const [hide, setHide] = useState(false);

    const navigate = useNavigate();

    const handleClick = (name: any) => {
        navigate('/apply-now', { state: { name } })
    }
    return (
        <section className="jobSection">
            <div className="row container">
                <h1>Apply For Job</h1>
                <div className="rightText">
                    <p>Application fees/Intimation Charges - For SC/ST/OBC/EWS  Rs 690/-</p>
                    <p>Other than SC/ST/OBC/EWS  Rs 990/-</p>
                    <p>[All Notification / Advertisement Details English] </p>
                </div>

                <div className='tableFlow'>
                    <table>
                        <tr>
                            <th>S.No.</th>
                            <th>Post Code</th>
                            <th>Post</th>
                            <th>Education Qualification</th>
                            <th>Pay Scale</th>
                            <th>Postion (Regular/Contractual)</th>


                            <th>Vacancy</th>


                            <th>Experience</th>
                            <th>Age</th>
                            <th>Apply Now</th>
                        </tr>
                        {
                            rowData.map((item, id) => {
                                return (
                                    <tr key={id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.vacancy}</td>
                                        <td>{item.exp}</td>
                                        <td>{item.qual}</td>
                                        <td>{item.age}</td>
                                        <td>{item.sal}</td>
                                        <td>

                                            <button className='applyNow' onClick={() => handleClick(item.name)}>
                                                {item.btn}
                                            </button>
                                        </td>

                                    </tr>
                                )
                            })
                        }

                    </table>

                </div>



            </div>
            {/* {
                hide && (<ApplyNow id={rowData[0].id}/>)
            } */}
        </section>
    )
}

export default Table