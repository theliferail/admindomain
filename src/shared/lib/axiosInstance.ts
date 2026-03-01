import axios, { AxiosHeaders } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const ACCESS_TOKEN_STORAGE_KEY = "liferail_admin_token";
export const ACCESS_TOKEN_COOKIE_KEY = "liferail_admin_token";

let inMemoryToken: string | null = null;

const getStoredToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
};

if (typeof window !== "undefined") {
  inMemoryToken = getStoredToken();
}

export const setAccessToken = (token: string | null) => {
  inMemoryToken = token;

  if (typeof window !== "undefined") {
    if (token) {
      window.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
      document.cookie = `${ACCESS_TOKEN_COOKIE_KEY}=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
    } else {
      window.localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
      document.cookie = `${ACCESS_TOKEN_COOKIE_KEY}=; path=/; max-age=0`;
    }
  }
};

export const clearAccessToken = () => setAccessToken(null);

export const getAccessToken = () => inMemoryToken ?? getStoredToken();

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    const headers =
      config.headers instanceof AxiosHeaders
        ? config.headers
        : new AxiosHeaders(config.headers);

    headers.set("Authorization", `Bearer ${token}`);
    config.headers = headers;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAccessToken();
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
