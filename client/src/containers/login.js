import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './register.css';

const Register = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      phoneOrEmail: '',
      password: '',
      gender: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(50, 'Must be 50 characters or less')
        .required('Required'),
      phoneOrEmail: Yup.string()
        .max(50, 'Must be 50 characters or less')
        .required('Required'),
      password: Yup.string()
        .min(8, 'Must be at least 8 characters')
        .required('Required'),
      gender: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="register-container">
      <form onSubmit={formik.handleSubmit}>
        <h1>Welcome to Chat App</h1>
        <div className="register-content">
          <div className="register-field">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              {...formik.getFieldProps('name')}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="error">{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="register-field">
            <label htmlFor="phoneOrEmail">Phone/Email:</label>
            <input
              type="text"
              id="phoneOrEmail"
              placeholder="Enter your phone or email"
              {...formik.getFieldProps('phoneOrEmail')}
            />
            {formik.touched.phoneOrEmail && formik.errors.phoneOrEmail ? (
              <div className="error">{formik.errors.phoneOrEmail}</div>
            ) : null}
          </div>
          <div className="register-field">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="register-field">
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              {...formik.getFieldProps('gender')}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {formik.touched.gender && formik.errors.gender ? (
              <div className="error">{formik.errors.gender}</div>
            ) : null}
          </div>
          <button type="submit">Register</button>
          <div className="already-have-account">Already have an account?</div>
        </div>
      </form>
    </div>
  );
};

export default Register;
