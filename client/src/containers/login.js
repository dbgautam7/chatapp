import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

  const [showPassword, setShowPassword] = useState(false)

  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }

  const navigate = useNavigate()

  const LoginSchema = Yup.object().shape({
    phoneOrEmail: Yup.string()
      .required('Phone/Email is required'),
    password: Yup.string()
      .required('Password is required')
  });

  return (
    <div className="d-flex justify-content-center align-items-center" style={{
      height: "100vh",
      backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx4S1Igk9kopouzcU7KRKzTLOx3aWtJHFR9bsXuogtku1hGGUNMPLhWKfV4Ue17k2EshA&usqp=CAU')",
      backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center"
    }}>
      {/* making the background image responsive  */}
      <Formik
        initialValues={{ phoneOrEmail: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { resetForm }) => {
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          }
          const res = await fetch(`http://localhost:3003/login`, requestOptions);
          const data = await res.json()
          if (data) {
            message.success(data.msg, [2])
            navigate("/home")
          } else {
            message.error(data.errorMsg, [2],)
          }
          resetForm({ values: '' })
        }
        }
      >
        {({ errors, touched }) => (
          <Form style={{ width: "500px" }}>
            <div className="mb-3">
              <label htmlFor="phoneOrEmail" className="form-label text-white">Phone/Email</label>
              <Field type="text" name="phoneOrEmail" className={`form-control ${errors.phoneOrEmail && touched.phoneOrEmail ? 'is-invalid' : ''}`} />
              <ErrorMessage name="phoneOrEmail" component="div" className="invalid-feedback text-red" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-white">Password</label>
              <div className="input-group">
                <Field type={showPassword ? 'text' : 'password'} name="password" className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`} />
                <button type="button" className="btn btn-outline-secondary" onClick={handleTogglePassword}>
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <ErrorMessage name="password" component="div" className="invalid-feedback text-red" />
            </div>

            <button type="submit" className="btn btn-primary">Login</button>
            <div className="text-center mt-3">
              <Link to="/" className="text-decoration-none text-warning">Create an account</Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
