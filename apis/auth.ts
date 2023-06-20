import { API_URL } from "@env";
import { request } from "@utils/request";

const loginApi = async (
  credentials: LoginCredentials
): Promise<{ error?: string; data?: LoginResponse; status: number }> => {
  const url = `${API_URL}/auth`;
  const options: RequestOptions<LoginCredentials> = {
    method: "post",
    data: credentials,
  };

  const result = await request<LoginCredentials, LoginResponse>(url, options);
  try {
    if (result.status === 200) {
      return Promise.resolve({
        data: result.data,
        status: 200,
      });
    }
    return Promise.reject({
      error: "Failed to login",
      status: result.status,
    });
  } catch (e) {
    return Promise.reject({
      error: "Failed to login",
      status: result.status,
    });
  }
};

export { loginApi };
