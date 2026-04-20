/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  useMutation,
  type UseMutationOptions,
  useQuery,
  type UseQueryOptions,
  useInfiniteQuery,
  type UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import { type AxiosRequestConfig } from "axios";
import httpClient, { API_ROOT } from "./httpClient";
import { ApiErrorResponse } from "~/types/error";

export type ApiParamsProps = Record<
  string,
  string | number | string[] | number[] | undefined | boolean
>;

export type ApiMutationOptionsOf<T> = Omit<
  UseMutationOptions<
    T,
    { meta: ApiErrorResponse },
    { data: Record<string, unknown> },
    unknown
  >,
  "mutationFn"
>;

export type ApiFileUploadMutationOptionsOf<T> = Omit<
  UseMutationOptions<
    T,
    { meta: ApiErrorResponse },
    { file: File | File[] },
    unknown
  >,
  "mutationFn"
>;

enum API_SERVICES {
  TEST_SERVICE = "test",
  AUTH_SERVICE = "auth",
  ADMIN_SERVICE = "admin",
  USER_SERVICE = "user",
}

const getApiEndpoint = (service: API_SERVICES): string => {
  return `${API_ROOT}/${service}`;
};

interface ApiServiceProps {
  url: string;
  params?: ApiParamsProps;
  data?: unknown;
  config?: AxiosRequestConfig;
  id?: number | string;
  endpoint?: string;
}

interface ApiFileUploadProps {
  url: string;
  file: File | File[];
  params?: ApiParamsProps;
  config?: AxiosRequestConfig;
  onUploadProgress?: (progressEvent: any) => void;
}

interface ApiQueryServiceProps<TOptions> extends ApiServiceProps {
  key?: string;
  options?: TOptions;
}

interface ApiInfiniteQueryServiceProps<TOptions, TPaginatedResponse, TResponse>
  extends ApiQueryServiceProps<TOptions> {
  getCurrentPageData: (
    response: TResponse,
    pageParam: unknown
  ) => TPaginatedResponse;
}

interface ApiMethodProps {
  get: <T>(props: ApiServiceProps) => Promise<T>;
  post: <T>(props: ApiServiceProps) => Promise<T>;
  put: <T>(props: ApiServiceProps) => Promise<T>;
  patch: <T>(props: ApiServiceProps) => Promise<T>;
  delete: <T>(props: ApiServiceProps) => Promise<T>;
  uploadFile: <T>(props: ApiFileUploadProps) => Promise<T>;
}

export const GetApiMethodInstance = (apiService: string): ApiMethodProps => {
  return {
    get: async <T>({ url, params, config }: ApiServiceProps) => {
      return httpClient.get<T>(`${apiService}${url}`, {
        ...config,
        params: params,
      });
    },
    post: async <T = unknown>({
      url,
      data,
      params,
      config,
    }: ApiServiceProps) => {
      return httpClient.post<T>(`${apiService}${url}`, data, {
        ...config,
        params: params,
      });
    },
    put: async ({ url, data, params, config }: ApiServiceProps) => {
      return httpClient.put(`${apiService}${url}`, data, {
        ...config,
        params: params,
      });
    },
    patch: async ({ url, data, params }: ApiServiceProps) => {
      return httpClient.patch(`${apiService}${url}`, data, {
        params: params,
      });
    },
    delete: async ({ url, id, params }: ApiServiceProps) => {
      return httpClient.delete(
        id ? `${apiService}${url}/${id}` : `${apiService}${url}`,
        {
          params: params,
        }
      );
    },
    uploadFile: async <T>({
      url,
      file,
      params,
      config,
      onUploadProgress,
    }: ApiFileUploadProps) => {
      const formData = new FormData();

      if (Array.isArray(file)) {
        file.forEach((f, index) => {
          formData.append(`files[${index}]`, f);
        });
      } else {
        formData.append("file", file);
      }

      // Add additional params to form data
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) {
            formData.append(key, String(value));
          }
        });
      }

      return httpClient.post<T>(`${apiService}${url}`, formData, {
        ...config,
        headers: {
          "Content-Type": "multipart/form-data",
          ...config?.headers,
        },
        onUploadProgress,
      });
    },
  };
};

export class ApiService {
  constructor(service: string) {
    this.apiMethod = GetApiMethodInstance(service);
  }

  apiMethod: ApiMethodProps;

  useGet = <T>({
    url,
    params,
    options,
    config,
  }: ApiQueryServiceProps<
    Omit<UseQueryOptions<T>, "queryKey" | "queryFn">
  >) => {
    return useQuery({
      queryKey: [url, params],
      queryFn: () => this.apiMethod.get<T>({ url, params, config }),
      ...options,
    });
  };

  usePostQuery = <T>({
    url,
    data,
    options,
    config,
    endpoint,
  }: ApiQueryServiceProps<
    Omit<UseQueryOptions<T>, "queryKey" | "queryFn">
  >) => {
    return useQuery({
      queryKey: [url, data],
      queryFn: () => this.apiMethod.post<T>({ url, data, config, endpoint }),
      ...options,
    });
  };

  useInfiniteQuery = <T, TPaginatedResponse>({
    url,
    params,
    options,
    config,
    getCurrentPageData,
  }: ApiInfiniteQueryServiceProps<
    Omit<
      UseInfiniteQueryOptions<
        T,
        { meta: ApiErrorResponse },
        T,
        readonly unknown[],
        string
      >,
      "queryKey" | "queryFn" | "getNextPageParam"
    >,
    TPaginatedResponse,
    T
  >) => {
    return useInfiniteQuery({
      queryKey: [url, params],
      initialPageParam: "1",
      queryFn: ({ pageParam }) =>
        this.apiMethod.get<T>({
          url,
          params: { ...params, page: pageParam },
          config,
        }),
      getNextPageParam: (lastPage, allPages) => {
        const currentPageData = getCurrentPageData(lastPage, allPages.length);
        // Assuming the response has a pagination structure
        // You can customize this logic based on your API response format
        if (
          currentPageData &&
          typeof currentPageData === "object" &&
          "hasNextPage" in currentPageData
        ) {
          return (currentPageData as any).hasNextPage
            ? String(allPages.length + 1)
            : undefined;
        }
        // Default pagination logic - you can customize this
        return allPages.length < 10 ? String(allPages.length + 1) : undefined; // Limit to 10 pages by default
      },
      ...options,
    });
  };

  usePost = <T = unknown>(
    props: ApiServiceProps,
    options?: ApiMutationOptionsOf<T>
  ) => {
    const { url, data: _data, endpoint, ...otherProps } = props;

    return useMutation({
      mutationFn: ({ data }: { data: Record<string, unknown> }) =>
        this.apiMethod.post<T>({ url, data, endpoint, ...otherProps }),
      ...options,
    });
  };

  usePut = <T = unknown>(
    props: ApiServiceProps,
    options?: ApiMutationOptionsOf<T>
  ) => {
    const { url, data: _data, ...otherProps } = props;

    return useMutation({
      mutationFn: ({ data }: { data: Record<string, unknown> }) =>
        this.apiMethod.put<T>({ url, data, ...otherProps }),
      ...options,
    });
  };

  usePatch = <T = unknown>(
    { url, params }: ApiServiceProps,
    options?: ApiMutationOptionsOf<T>
  ) => {
    return useMutation({
      mutationFn: ({ data }: { data: Record<string, unknown> }) =>
        this.apiMethod.patch<T>({ url, data, params }),
      ...options,
    });
  };

  useDelete = <T = unknown>({ url, params }: ApiServiceProps) => {
    return useMutation({
      mutationFn: (
        data?:
          | string
          | number
          | Record<
              string,
              string | number | boolean | string[] | number[] | undefined
            >
      ) => {
        if (typeof data === "number" || typeof data === "string") {
          return this.apiMethod.delete<T>({
            url,
            id: data,
            params,
          });
        }

        return this.apiMethod.delete<T>({
          url,
          params: { ...params, ...data },
        });
      },
    });
  };

  useUploadFile = <T = unknown>(
    props: Omit<ApiFileUploadProps, "file">,
    options?: ApiFileUploadMutationOptionsOf<T>
  ) => {
    const { url, params, config, onUploadProgress, ...otherProps } = props;

    return useMutation({
      mutationFn: ({ file }: { file: File | File[] }) =>
        this.apiMethod.uploadFile<T>({
          url,
          file,
          params,
          config,
          onUploadProgress,
          ...otherProps,
        }),
      ...options,
    });
  };
}

// Export API endpoints
export const TEST_SERVICE_ENDPOINT = getApiEndpoint(API_SERVICES.TEST_SERVICE);
export const AUTH_SERVICE_ENDPOINT = getApiEndpoint(API_SERVICES.AUTH_SERVICE);
export const ADMIN_SERVICE_ENDPOINT = getApiEndpoint(
  API_SERVICES.ADMIN_SERVICE
);
export const USER_SERVICE_ENDPOINT = getApiEndpoint(API_SERVICES.USER_SERVICE);

// Export API service methods
export const TestService = new ApiService(TEST_SERVICE_ENDPOINT);
export const AuthService = new ApiService(AUTH_SERVICE_ENDPOINT);
export const AdminService = new ApiService(ADMIN_SERVICE_ENDPOINT);
export const UserService = new ApiService(USER_SERVICE_ENDPOINT);
