import axios, { AxiosHeaders, InternalAxiosRequestConfig } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const DOCTOR_API_BASE_URL = process.env.NEXT_PUBLIC_DOCTOR_API_BASE_URL;
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

const createApiClient = (baseURL: string | undefined) => {
  const instance = axios.create({
    baseURL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
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

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        clearAccessToken();
      }

      return Promise.reject(error);
    },
  );

  return instance;
};

/** RBAC service: auth, users, onboarding, hospitals, pharmacies, labs. */
export const axiosInstance = createApiClient(API_BASE_URL);

/** Doctor service: doctor profiles and admin approve/reject. */
export const doctorAxiosInstance = createApiClient(DOCTOR_API_BASE_URL);

export default axiosInstance;
