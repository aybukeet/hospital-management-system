import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const departmentsAPI = {
  getAll: () => api.get('/departments'),
  getOne: (id) => api.get(`/departments/${id}`),
  create: (data) => api.post('/departments', { department: data }),
  update: (id, data) => api.put(`/departments/${id}`, { department: data }),
  delete: (id) => api.delete(`/departments/${id}`),
};

export const doctorsAPI = {
  getAll: () => api.get('/doctors'),
  getOne: (id) => api.get(`/doctors/${id}`),
  create: (data) => api.post('/doctors', { doctor: data }),
  update: (id, data) => api.put(`/doctors/${id}`, { doctor: data }),
  delete: (id) => api.delete(`/doctors/${id}`),
};

export const patientsAPI = {
  getAll: () => api.get('/patients'),
  getOne: (id) => api.get(`/patients/${id}`),
  create: (data) => api.post('/patients', { patient: data }),
  update: (id, data) => api.put(`/patients/${id}`, { patient: data }),
  delete: (id) => api.delete(`/patients/${id}`),
};

export const appointmentsAPI = {
  getAll: () => api.get('/appointments'),
  getOne: (id) => api.get(`/appointments/${id}`),
  create: (data) => api.post('/appointments', { appointment: data }),
  update: (id, data) => api.put(`/appointments/${id}`, { appointment: data }),
  delete: (id) => api.delete(`/appointments/${id}`),
};

export default api;
