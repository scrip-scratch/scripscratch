import axios from "axios";

interface LoginRequest {
  login: string;
  password: string;
}

class AuthApi {
  public async loginAsync(request: LoginRequest) {
    const endpoint = import.meta.env.VITE_SERVER_URL + "/login";

    try {
      const response = await axios.post(endpoint, {
        login: request.login,
        password: request.password,
      });
      return response;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

export const authApi = new AuthApi();
