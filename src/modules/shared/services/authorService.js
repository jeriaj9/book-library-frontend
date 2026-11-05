import api from './api'

const authorService = {
  getAll: () => api.get('/authors').then((res) => res.data),
  getById: (id) => api.get(`/authors/${id}`).then((res) => res.data),
  create: (author) => api.post('/authors', author).then((res) => res.data),
  update: (id, author) => api.put(`/authors/${id}`, author).then((res) => res.data),
  remove: (id) => api.delete(`/authors/${id}`),
}

export default authorService
