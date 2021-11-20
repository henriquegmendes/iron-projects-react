import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_PROJECTS_API_URI,
});

const verifyUnauthorizedError = (error) => {
  if (error.response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/'; // Esse comando dá um RELOAD na pagina
  }

  return Promise.reject(error);
};

api.interceptors.response.use(
  (response) => response,
  verifyUnauthorizedError,
); // QUALQUER request que fizermos pelo axios vai cair dentro deste INTERCEPTOR primeiro

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

export const createOneProject = async (body, token) => {
  const response = await api.post('/projects', body, setHeaders(token));

  return response.data;
};

export const createOneTask = async (projectId, body, token) => {
  const response = await api.post(`/tasks/${projectId}`, body, setHeaders(token));

  return response.data;
};
