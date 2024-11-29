import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditEmployee() {
    const params = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);
    const [errors, setErrors] = useState({});

    // Fetch employee data for editing
    useEffect(() => {
        fetch(`http://localhost:4000/employees/${params.id}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Failed to fetch employee data");
            })
            .then(data => setEmployee(data))
            .catch(error => {
                alert("Unable to fetch employee data");
            });
    }, [params.id]);

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const employeeData = Object.fromEntries(formData.entries());

        // Perform validation
        let currentErrors = {};
        if (!employeeData.name) currentErrors.name = "Name is required";
        if (!employeeData.email) currentErrors.email = "Email is required";
        if (!employeeData.mobileNo || employeeData.mobileNo.length < 10) currentErrors.mobileNo = "Mobile No is invalid";
        if (!employeeData.designation) currentErrors.designation = "Designation is required";
        if (!employeeData.gender) currentErrors.gender = "Gender is required";
        if (!employeeData.courses) currentErrors.courses = "At least one course should be selected";

        if (Object.keys(currentErrors).length > 0) {
            setErrors(currentErrors);
            return;
        }

        try {
            const response = await fetch(`http://localhost:4000/employees/${params.id}`, {
                method: "PATCH",
                body: formData
            });
            if (response.ok) {
                navigate('/employee-list');  // Navigate to employee list after successful update
            } else {
                alert("Unable to update the employee");
            }
        } catch (error) {
            alert("Failed to connect to the server");
        }
    }

    return (
        <div className='container my-4'>
            <div className='row'>
                <div className='col-md-8 mx-auto rounded border p-4'>
                    <h2 className='text-center mb-5'>Edit Employee</h2>

                    <div className='row mb-3'>
                        <label className='col-sm-4 col-form-label'>ID</label>
                        <div className='col-sm-8'>
                            <input readOnly className='form-control-plaintext' defaultValue={params.id} />
                        </div>
                    </div>

                    {employee && (
                        <form onSubmit={handleSubmit}>
                            <div className='row mb-3'>
                                <label className='col-sm-4 col-form-label'>Name</label>
                                <div className='col-sm-8'>
                                    <input className='form-control' name='name' defaultValue={employee.name} />
                                    <span className='text-danger'>{errors.name}</span>
                                </div>
                            </div>

                            <div className='row mb-3'>
                                <label className='col-sm-4 col-form-label'>Email</label>
                                <div className='col-sm-8'>
                                    <input className='form-control' name='email' defaultValue={employee.email} />
                                    <span className='text-danger'>{errors.email}</span>
                                </div>
                            </div>

                            <div className='row mb-3'>
                                <label className='col-sm-4 col-form-label'>Mobile No</label>
                                <div className='col-sm-8'>
                                    <input className='form-control' name='mobileNo' defaultValue={employee.mobileNo} />
                                    <span className='text-danger'>{errors.mobileNo}</span>
                                </div>
                            </div>

                            <div className='row mb-3'>
                                <label className='col-sm-4 col-form-label'>Designation</label>
                                <div className='col-sm-8'>
                                    <select className='form-select' name='designation' defaultValue={employee.designation}>
                                        <option value=''>Select a designation</option>
                                        <option value='Manager'>Manager</option>
                                        <option value='Developer'>Developer</option>
                                        <option value='Designer'>Designer</option>
                                    </select>
                                    <span className='text-danger'>{errors.designation}</span>
                                </div>
                            </div>

                            <div className='row mb-3'>
                                <label className='col-sm-4 col-form-label'>Gender</label>
                                <div className='col-sm-8'>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="gender" value="Male" defaultChecked={employee.gender === 'Male'} />
                                        <label className="form-check-label">Male</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="gender" value="Female" defaultChecked={employee.gender === 'Female'} />
                                        <label className="form-check-label">Female</label>
                                    </div>
                                    <span className='text-danger'>{errors.gender}</span>
                                </div>
                            </div>

                            <div className='row mb-3'>
                                <label className='col-sm-4 col-form-label'>Course</label>
                                <div className='col-sm-8'>
                                    <input className='form-check-input' type='checkbox' name='courses' value='React' defaultChecked={employee.courses.includes('React')} /> React
                                    <input className='form-check-input' type='checkbox' name='courses' value='Node' defaultChecked={employee.courses.includes('Node')} /> Node.js
                                    <input className='form-check-input' type='checkbox' name='courses' value='JavaScript' defaultChecked={employee.courses.includes('JavaScript')} /> JavaScript
                                    <span className='text-danger'>{errors.courses}</span>
                                </div>
                            </div>

                            <div className='row mb-3'>
                                <label className='col-sm-4 col-form-label'>Image</label>
                                <div className='col-sm-8'>
                                    <input className='form-control' type='file' name='image' />
                                    <span className='text-danger'>{errors.image}</span>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='offset-sm-4 col-sm-4 d-grid'>
                                    <button type='submit' className='btn btn-primary'>Update</button>
                                </div>
                                <div className='col-sm-4 d-grid'>
                                    <Link className='btn btn-secondary' to='/employee-list' role="button">Cancel</Link>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
