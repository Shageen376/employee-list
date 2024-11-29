import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreateEmployee() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [employeeInputs, setEmployeeInputs] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    courses: [],
    image: null, // This will hold the image file
  });

  // Handle form submission
  async function handleSubmit(event) {
    event.preventDefault();
    console.log('Form submitted:', employeeInputs);

    // Perform validation
    let currentErrors = {};
    if (!employeeInputs.name) currentErrors.name = 'Name is required';
    if (!employeeInputs.email) currentErrors.email = 'Email is required';
    if (!employeeInputs.mobile) currentErrors.mobile = 'Mobile No is required';
    if (!employeeInputs.designation) currentErrors.designation = 'Designation is required';
    if (!employeeInputs.gender) currentErrors.gender = 'Gender is required';
    if (employeeInputs.courses.length === 0) currentErrors.courses = 'At least one course should be selected';
    if (!employeeInputs.image) currentErrors.image = 'Image is required';

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }

    // Prepare FormData to include image as file and other data
    const formData = new FormData();
    formData.append('name', employeeInputs.name);
    formData.append('email', employeeInputs.email);
    formData.append('mobile', employeeInputs.mobile);
    formData.append('designation', employeeInputs.designation);
    formData.append('gender', employeeInputs.gender);
    formData.append('courses', JSON.stringify(employeeInputs.courses)); // If courses is an array, stringify it
    formData.append('image', employeeInputs.image); // Append the image file

    console.log('Employee data to be sent:', employeeInputs);

    // Submit form data to backend (JSON server)
    try {
      const response = await axios.post('http://localhost:4000/employees', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200 || response.status === 201) {
        console.log('Employee created successfully!', response.data);
        navigate('/employee-list');
      }
    } catch (err) {
      console.error('Error creating employee:', err);
      if (err.response) {
        // Server-side validation errors
        setErrors(err.response.data);
      } else {
        alert('Unable to connect to the server!');
      }
    }
  }

  // Handle input changes
  function handleChange(event) {
    const { name, value, type, checked, files } = event.target;
    let newErrors = { ...errors };

    // Handle checkbox values for 'courses'
    if (type === 'checkbox') {
      setEmployeeInputs(prevState => {
        const updatedCourses = checked
          ? [...prevState.courses, value]
          : prevState.courses.filter(course => course !== value);
        return { ...prevState, courses: updatedCourses };
      });
    }

    // Handle radio buttons for 'gender'
    if (type === 'radio') {
      setEmployeeInputs(prevState => ({ ...prevState, gender: value }));
    }

    // Handle other inputs
    if (name === 'name' || name === 'email' || name === 'mobile' || name === 'designation') {
      setEmployeeInputs(prevState => ({ ...prevState, [name]: value }));
    }

    // Handle image file input
    if (name === 'image' && files[0]) {
      setEmployeeInputs(prevState => ({ ...prevState, image: files[0] }));
    }

    // Clear errors when a field is valid
    if (name === 'name' && value) delete newErrors.name;
    if (name === 'email' && value) delete newErrors.email;
    if (name === 'mobile' && value) delete newErrors.mobile;
    if (name === 'designation' && value) delete newErrors.designation;
    if (name === 'gender' && value) delete newErrors.gender;
    if (name === 'courses' && value) delete newErrors.courses;
    if (name === 'image' && files[0]) delete newErrors.image;

    setErrors(newErrors);
  }

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8 mx-auto rounded border p-4">
          <h2 className="text-center mb-5">Create Employee</h2>

          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Name</label>
              <div className="col-sm-8">
                <input className="form-control" name="name" onChange={handleChange} />
                <span className="text-danger">{errors.name}</span>
              </div>
            </div>

            {/* Email Field */}
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Email</label>
              <div className="col-sm-8">
                <input className="form-control" name="email" onChange={handleChange} />
                <span className="text-danger">{errors.email}</span>
              </div>
            </div>

            {/* Mobile Field */}
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Mobile No</label>
              <div className="col-sm-8">
                <input className="form-control" name="mobile" onChange={handleChange} />
                <span className="text-danger">{errors.mobile}</span>
              </div>
            </div>

            {/* Designation Dropdown */}
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Designation</label>
              <div className="col-sm-8">
                <select className="form-select" name="designation" onChange={handleChange}>
                  <option value="">Select a designation</option>
                  <option value="HR">HR</option>
                  <option value="Manager">Manager</option>
                  <option value="Sales">Sales</option>
                </select>
                <span className="text-danger">{errors.designation}</span>
              </div>
            </div>

            {/* Gender Radio Buttons */}
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Gender</label>
              <div className="col-sm-8">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    onChange={handleChange}
                    checked={employeeInputs.gender === 'Male'}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    onChange={handleChange}
                    checked={employeeInputs.gender === 'Female'}
                  />
                  Female
                </label>
                <span className="text-danger">{errors.gender}</span>
              </div>
            </div>

            {/* Course Checkboxes */}
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Course</label>
              <div className="col-sm-8">
                <label>
                  <input
                    type="checkbox"
                    name="courses"
                    value="MCA"
                    onChange={handleChange}
                    checked={employeeInputs.courses.includes('MCA')}
                  />
                  MCA
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="courses"
                    value="BCA"
                    onChange={handleChange}
                    checked={employeeInputs.courses.includes('BCA')}
                  />
                  BCA
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="courses"
                    value="BGC"
                    onChange={handleChange}
                    checked={employeeInputs.courses.includes('BGC')}
                  />
                  BGC
                </label>
                <span className="text-danger">{errors.courses}</span>
              </div>
            </div>

            {/* Image Upload */}
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Image</label>
              <div className="col-sm-8">
                <input className="form-control" type="file" name="image" onChange={handleChange} />
                <span className="text-danger">{errors.image}</span>
              </div>
            </div>

            {/* Submit and Cancel Buttons */}
            <div className="row">
              <div className="offset-sm-4 col-sm-4 d-grid">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
              <div className="col-sm-4 d-grid">
                <Link className="btn btn-danger" to="/employee-list">
                  Cancel
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}