import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { Form, Col, Button } from 'react-bootstrap';

import TemplatePublic from '../../templates/TemplatePublic/TemplatePublic';

import { register, login } from '../../../services/api';

import './Register.css';

const registerSchema = yup.object().shape({
  name: yup.string().required('Required Field').min(3, 'Minimum of 3 characters').max(100, 'Maximum of 100 characters'),
  email: yup.string().required('Required Field').email('Must have email format'),
  password: yup.string().required('Required Field').max(150, 'Maximum of 150 characters'),
});

const Register = () => {
  const navigate = useNavigate();

  const {
    values, touched, errors, handleChange, handleBlur, handleSubmit, setErrors,
  } = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: registerSchema,
    onSubmit: async (formData) => {
      try {
        await register(formData);

        const tokenResponse = await login({ email: formData.email, password: formData.password });

        localStorage.setItem('token', tokenResponse.token);

        navigate('/my-projects');
      } catch (error) {
        setErrors({
          email: error.response.data.error,
        });
      }
    },
  });

  return (
    <TemplatePublic>
      <h2 className="register-title">Iron Projects Manager</h2>

      <p className="register-text">Create a new account</p>

      <Form onSubmit={handleSubmit}>
        <Form.Group as={Col} md="12" controlId="register-form">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            isValid={touched.name && !errors.name}
            isInvalid={touched.name && errors.name}
          />
          <Form.Control.Feedback>Ok!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="12" controlId="register-form">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            isValid={touched.email && !errors.email}
            isInvalid={touched.email && errors.email}
          />
          <Form.Control.Feedback>Ok!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="12" controlId="register-form">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            isValid={touched.password && !errors.password}
            isInvalid={touched.password && errors.password}
          />
          <Form.Control.Feedback>Ok!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" size="lg" className="register-submit-button">Register</Button>
      </Form>

    </TemplatePublic>
  );
};

export default Register;
