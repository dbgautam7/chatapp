import React from 'react'
import './register.css'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

  const navigate=useNavigate()

  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
        .max(50, 'Must be 50 characters or less')
        .required('Required'),
      phoneOrEmail: Yup.string()
        .max(50, 'Must be 50 characters or less')
        .required('Required'),
      password: Yup.string()
        .min(4, 'Must be at least 8 characters')
        .required('Required'),
      gender: Yup.string().required('Required')
  });
  
  return (
  <div className="register-container">
    <Formik
  initialValues={{
    name: '',
    phoneOrEmail: '',
    password: '',
    gender: ''
  }}
  validationSchema={RegisterSchema}
  onSubmit={async (values, { resetForm }) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    };
    try {
      const response = await fetch(
        `http://localhost:3003/register`,
        requestOptions
      );
      const data = await response.json();
      if (data) {
        message.success('You are registered successfully', 3);
        navigate("/home",{ replace: true })
        resetForm({ values: "" });
      } else {
        message.warning('Email or Phone already exists', 3);
      }
    } catch (err) {
      console.log(err)
    }
  }}
>
  {({ errors, touched }) => (
    <Form>
      <h1>Welcome to Chat App</h1>
      <div className="register-content">
        <div className="register-field">
          <label htmlFor="name">Name:</label>
          <Field type="text" id="name" name="name" placeholder="Enter your full name" />
          <ErrorMessage name="name" component="div" className="error-message" />
        </div>
        <div className="register-field">
          <label htmlFor="phoneOrEmail">Phone/Email:</label>
          <Field type="text" id="phoneOrEmail" name="phoneOrEmail" placeholder="Enter your phone or email" />
          <ErrorMessage name="phoneOrEmail" component="div" className="error-message" />
        </div>
        <div className="register-field">
          <label htmlFor="password">Password:</label>
          <Field type="password" id="password" name="password" placeholder="Enter your password" />
          <ErrorMessage name="password" component="div" className="error-message" />
        </div>
        <div className="register-field">
          <label htmlFor="gender">Gender:</label>
          <div>
            <label>
              <Field type="radio" name="gender" value="male" />
              Male
            </label>
            <label>
              <Field type="radio" name="gender" value="female" />
              Female
            </label>
            <label>
              <Field type="radio" name="gender" value="other" />
              Other
            </label>
          </div>
          <ErrorMessage name="gender" component="div" className="error-message" />
        </div>
        <button type="submit">Register</button>
        <div className="already-have-account"><Link to='/login' style={{textDecoration:"none"}}>Already have an account?</Link></div>
      </div>
    </Form>
  )}
</Formik>
  </div>

  )
}

export default Register