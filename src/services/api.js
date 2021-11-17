import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_PROJECTS_API_URI,
});

const setHeaders = (token) => ({ headers: { Authorization: `Bearer ${token}` } });

export const login = async (formData) => {
  const response = await api.post('/auth/login', formData);

  return response.data;
};

export const register = async (formData) => {
  const response = await api.post('/auth/register', formData);

  return response.data;
};

export const getProjects = async (searchTitle, token) => {
  const response = await api.get(`/projects?title=${searchTitle}`, setHeaders(token));

  return response.data;
};

export const getOneProject = async (projectId, token) => {
  const response = await api.get(`/projects/${projectId}`, setHeaders(token));

  return response.data;
};
