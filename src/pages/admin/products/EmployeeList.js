import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

export default function EmployeeList() {
    const [employees, setEmployees] = useState([]);

    function getEmployees() {
        fetch("http://localhost:4000/employees?_sort=id&_order=desc")
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Failed to fetch employees");
            })
            .then(data => {
                setEmployees(data);
            })
            .catch(error => {
                alert("Unable to get the data");
                console.error(error);  // Log error for debugging
            });
    }

    useEffect(() => {
        getEmployees();
    }, []);

    function deleteEmployee(id) {
        fetch("http://localhost:4000/employees/" + id, {
            method: "DELETE"
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to delete employee");
                }
                getEmployees(); // Refresh the list after deletion
            })
            .catch(error => {
                alert("Unable to delete the employee");
                console.error(error);  // Log error for debugging
            });
    }

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">Employees</h2>
            <div className='row mb-3'>
                <div className='col'>
                    <Link className="btn btn-primary me-1" to="/admin/employees/create" role="button">Create Employee</Link>
                    <button type="button" className="btn btn-outline-primary" onClick={getEmployees}>Refresh</button>
                </div>
                <div className='col'>
                    {/* Empty column for future use if necessary */}
                </div>
            </div>

            <table className='table'>
                <thead>
                    <tr>
                        <th>Unique ID</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile No</th>
                        <th>Designation</th>
                        <th>Gender</th>
                        <th>Course</th>
                        <th>Create Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map((employee) => {
                            // Ensure courses is an array before calling .join()
                            const courses = Array.isArray(employee.courses) ? employee.courses.join(', ') : "N/A";

                            return (
                                <tr key={employee.id}>
                                    <td>{employee.id}</td>
                                    <td><img src={"http://localhost:4000/images/" + employee.imageFilename} width="100" alt="..." /></td>
                                    <td>{employee.name}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.mobileNo}</td>
                                    <td>{employee.designation}</td>
                                    <td>{employee.gender}</td>
                                    <td>{courses}</td>
                                    <td>{employee.createDate ? employee.createDate.slice(0, 10) : "N/A"}</td>
                                    <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                                        <Link className='btn btn-primary btn-sm me-1'
                                            to={"/admin/employees/edit/" + employee.id}>Edit</Link>
                                        <button type="button" className='btn btn-danger btn-sm'
                                            onClick={() => deleteEmployee(employee.id)}>Delete</button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}
