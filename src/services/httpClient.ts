/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { includes, some } from "lodash";
import { ROUTE_URL } from "~/constants";
import useAuthenticationStore from "~/store/authentication/useAuthenticationStore";
import { publicEndpoints } from "~/utils";
import { env } from "~/env.mjs";

export const API_ROOT =
  env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3000/api";

export interface Response<T> {
  records: T;
  total_records: number;
}

// Manage refresh token state
let isRefreshing = false;
type QueueItem = {
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
};
let failedQueue: QueueItem[] = [];

/**
 * Process queue of failed requests due to 401 error
 */
function processQueue(error: any | null, token: string | null = null) {
  failedQueue.forEach(prom => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });

  failedQueue = [];
}

class AxiosClient {
  private readonly axiosInstance: AxiosInstance;
  static instance: AxiosClient;
  private retryCount = 0;

  static getInstance() {
    if (!AxiosClient.instance) {
      AxiosClient.instance = new AxiosClient();
    }
    return AxiosClient.instance;
  }

  setAccessToken = (accessToken: string) => {
    window.localStorage.setItem("access_token", accessToken);
  };

  public constructor() {
    this.axiosInstance = axios.create({
      headers: {
        "content-type": "application/json",
      },
    });

    this._initializeInterceptor();
  }

  private _initializeInterceptor = () => {
    this.axiosInstance.interceptors.request.use(this._handleRequest);
    this.axiosInstance.interceptors.response.use(
      this._handleResponse,
      this._handleError
    );
  };

  post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.axiosInstance.post(url, data, config);
  }

  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.get(url, config);
  }

  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.put(url, data, config);
  }

  patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.axiosInstance.patch(url, data, config);
  }

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.delete(url, config);
  }

  private _handleRequest = (config: InternalAxiosRequestConfig) => {
    const token = useAuthenticationStore.getState().authenticationToken;

    if (token && config.headers && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };

  private _handleResponse = (response: AxiosResponse) => {
    if (
      !["application/json"].includes(response.headers["content-type"] as string)
    ) {
      return response.data.data;
    }

    if (response.data) {
      return response.data.data;
    }

    return response.data;
  };

  private _handleError = async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !some(publicEndpoints, e => includes(originalRequest.url || "", e))
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return this.axiosInstance(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      this.retryCount++;
      isRefreshing = true;

      try {
        const refreshToken = useAuthenticationStore.getState().refreshToken;
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        // Call refresh token API
        const { data } = await axios.post(`${API_ROOT}/refresh-token`, {
          refreshToken,
        });

        const newToken = data.accessToken;
        const newRefreshToken = data.refreshToken;

        // Update authentication store
        useAuthenticationStore.setState(state => ({
          ...state,
          authenticationToken: newToken,
          refreshToken: newRefreshToken,
        }));

        processQueue(null, newToken);
        return this.axiosInstance(originalRequest);
      } catch (err) {
        // Clear authentication data
        useAuthenticationStore.setState(state => ({
          ...state,
          authenticationToken: null,
          refreshToken: null,
        }));

        processQueue(err, null);
        window.location.href = ROUTE_URL.LOGIN;
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    if (error.response?.status === 403) {
      window.alert("You are not allowed to access this resource!");
    }

    return Promise.reject(error.response?.data);
  };
}

export default AxiosClient.getInstance();
