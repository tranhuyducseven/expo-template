import axios, { AxiosError, AxiosResponse } from "axios";

/**
 * @param url - url to request
 * @param options - options for request
 * @returns Promise<{response: T, status: number}>
 * T is the type of request data
 * K is the type of response data
 */
const request = <T, K>(
  url: string,
  options: RequestOptions<T>
): Promise<{
  error?: AxiosResponse;
  data?: K;
  status: number;
}> => {
  const { method = "get", data } = options;
  const headers = {
    "Content-Type": "application/json",
  };

  return axios({
    method,
    url,
    data,
    headers: { ...headers, ...options.headers },
  })
    .then((res: AxiosResponse<K>) => {
      return Promise.resolve({ data: res.data, status: res.status });
    })
    .catch((err: AxiosError) => {
      return Promise.resolve({
        error: err.response,
        status: err.response?.status || 404,
      });
    });
};

export { request };
