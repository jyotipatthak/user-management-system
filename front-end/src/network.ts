import axios from 'axios';

const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await axios.post('http://localhost:5000/api/auth/refresh-token', {}, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    localStorage.setItem('token', response.data.token);
    

    return response.data.token;
  } catch (error) {
    console.error('Unable to refresh token', error);
    return null;
  }
};

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshToken();
      if (newToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
