import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: 'http://api.themoviedb.org/3',
});

api.interceptors.request.use((request: AxiosRequestConfig) => {
  if (request.headers) {
    request.headers = {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTNhYWM3MGFiNTkxZWIxZDdhOGRiMDk2OTA1OTE1MiIsInN1YiI6IjYzNjdjMGYyMzUwMzk4MDA4MjQ4ZDY0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yj8W5yyjAPFE-lcpjjtaX3Cqmf9VjtRwJzdDHuAIbTw'
    } 
    request.headers['Content-Type'] = 'application/json';
  }

  request.params = {
    language: 'pt-BR'
  }

  return request
})

export default api;