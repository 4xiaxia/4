import axios from 'axios';

// 从环境变量中获取后端的API基础URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

// 创建一个配置好的axios实例
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10秒超时
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器，用于在发送请求前附加认证Token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器，用于统一处理API响应和错误
apiClient.interceptors.response.use(
  (response) => {
    // 如果响应成功，直接返回数据部分
    if (response.data && response.data.success) {
      return response.data;
    }
    // 如果业务逻辑失败，则创建一个包含详细信息的错误
    return Promise.reject(new Error(response.data.message || '业务错误'));
  },
  (error) => {
    // 处理网络错误等
    const errorMessage = error.response?.data?.message || error.message || '网络请求错误';
    return Promise.reject(new Error(errorMessage));
  }
);

/* ------------------------- 认证相关 API ------------------------- */

export const sendLoginCode = (phone: string) => {
  return apiClient.post('/auth/send-code', { phone });
};

export const loginWithCode = (phone: string, code: string) => {
  return apiClient.post('/auth/login', { phone, code });
};


/* ------------------------- 景点相关 API ------------------------- */

export const getSpots = (params?: { category?: string; page?: number; limit?: number }) => {
  return apiClient.get('/spots', { params });
};

export const getSpotById = (id: string) => {
  return apiClient.get(`/spots/${id}`);
};


/* ------------------------- 人物相关 API ------------------------- */

export const getFigures = (params?: { category?: string; page?: number; limit?: number }) => {
  return apiClient.get('/figures', { params });
};


/* ------------------------- 公告相关 API ------------------------- */

export const getAnnouncements = (params?: { type?: string; page?: number; limit?: number }) => {
  return apiClient.get('/announcements', { params });
};


/* ------------------------- 打卡相关 API ------------------------- */

export const checkIn = (spotId: string, spotName: string) => {
  return apiClient.post('/checkin', { spotId, spotName });
};


/* ------------------------- 管理后台 API ------------------------- */

export const submitContent = (data: { name: string; type: string; desc: string; location_desc: string; recommender_name: string }) => {
  return apiClient.post('/admin/content/submit', data);
};

export const getDashboardAnalytics = () => {
  return apiClient.get('/admin/analytics/dashboard');
};

export default apiClient;
