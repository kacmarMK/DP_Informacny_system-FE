import axios, { AxiosInstance } from "axios";

const token = sessionStorage.getItem('jwt')

const apiClient: AxiosInstance = axios.create({
  baseURL: "/api/",
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Authorization': `${token}`
  }
});

export default apiClient;