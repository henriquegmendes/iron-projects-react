/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

import {
  Button, Modal, Form, Col,
} from 'react-bootstrap';

import TemplatePrivate from '../../templates/TemplatePrivate/TemplatePrivate';

import { getOneProject, createOneTask } from '../../../services/api';
import './ProjectDetails.css';

const schema = yup.object().shape({
  title: yup.string().required('Required field').min(6, 'Minimum of 6 characters').max(50, 'Minimum of 50 characters'),
  description: yup.string().required('Required field').min(15, 'Minimum of 15 characters').max(150, 'Minimum of 150 characters'),
});

const MyProjects = () => {
  const { projectId } = useParams();

  const [project, setProject] = useState({});
  const [show, setShow] = useState(false);

  const pegaUmProjetoPeloIdDaAPI = async () => {
    try {
      const token = localStorage.getItem('token');
      const foundProject = await getOneProject(projectId, token);
      setProject(foundProject);
    } catch (error) {
      console.log(error);
    }
  };

  const fechaModal = () => {
    setShow(false);
    // eslint-disable-next-line no-use-before-define
    handleLimpaTudo();
  };
  const abreModal = () => setShow(true);

  useEffect(() => {
    pegaUmProjetoPeloIdDaAPI();
  }, []);

  const {
    values, errors, touched, handleChange, handleBlur, handleSubmit, setTouched, setValues,
  } = useFormik({
    initialValues: { title: '', description: '' },
    validationSchema: schema,
    onSubmit: async (formData) => {
      const token = localStorage.getItem('token');
      await createOneTask(projectId, formData, token);

      await pegaUmProjetoPeloIdDaAPI();

      fechaModal();
    },
  });

  function handleLimpaTudo() {
    setValues({ title: '', description: '' });
    setTouched({ title: false, description: false });
  }

  return (
    <TemplatePrivate>
      <Link className="project-card" to="anything">
        <h1>project detail</h1>
      </Link>
      <h1>{project.title}</h1>
      <p>{project.description}</p>

      <div className="tasks-container">
        <div>
          <h2>Tasks:</h2>

          <ul>
            {project.tasks && project.tasks.map((task) => (
              <li>
                <h4>{task.title}</h4>
                <p>{task.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Button onClick={abreModal}>Create new Task</Button>
        </div>
      </div>

      <Modal show={show} onHide={fechaModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Task</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group as={Col} md="12" controlId="create-task-form">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.title && !errors.title}
                isInvalid={touched.title && errors.title}
              />
              <Form.Control.Feedback>Ok!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="12" controlId="create-task-form">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.description && !errors.description}
                isInvalid={touched.description && errors.description}
              />
              <Form.Control.Feedback>Ok!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={fechaModal}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Create
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </TemplatePrivate>
  );
};

export default MyProjects;
