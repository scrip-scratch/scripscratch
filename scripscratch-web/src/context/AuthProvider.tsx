import { useEffect, useRef, useState } from "react";
import { AuthContext } from "./AuthContext";
import { StorageKeys, tokenStorage } from "../services/TokenStorage";
import { useLocation, useNavigate } from "react-router-dom";
import { Environment } from "../services/Environment";
import {
  FetchTokenResponse,
  LoginRequest,
  RefreshTokenRequest,
  authApi,
} from "../api/AuthApi";
import { AxiosResponse } from "axios";
import { historyStorage } from "../services/HistoryStorage";

export const AuthContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [isAuthenticated, setAuth] = useState<boolean>(
    tokenStorage.getAccessToken() !== null
  );

  const navigate = useNavigate();
  const location = useLocation();

  const from = historyStorage.getPath();

  const refreshInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const refreshIntervalTime = useRef<number>(0);

  async function refreshToken() {
    try {
      const keys: StorageKeys | null = tokenStorage.getKeys();

      if (!isAuthenticated || !keys) {
        historyStorage.setPath(location.pathname);
        navigate("/logout", {
          replace: false,
        });
      }

      if (isAuthenticated && keys) {
        const request: RefreshTokenRequest = {
          domain: keys.domain,
          refreshToken: keys.refreshToken,
        };
        const response: AxiosResponse = await authApi.refreshTokenAsync(
          request
        );

        const status: number = response.status;
        const responseData: FetchTokenResponse = response.data;

        if (status !== 200) {
          historyStorage.setPath(location.pathname);
          navigate("/logout", {
            replace: false,
          });
        }

        const newAccessToken: string = responseData.access_token;
        const newRefreshToken: string = responseData.refresh_token;

        const newKeys: StorageKeys = {
          domain: keys.domain,
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        };

        tokenStorage.setKeys(newKeys);

        const expiresInMs: number = (response.data.expires_in - 30) * 1000;
        refreshIntervalTime.current = expiresInMs;
      }
    } catch (error) {
      refreshInterval.current && clearInterval(refreshInterval.current);
      refreshInterval.current = null;
      if (!Environment.isProduction) {
        console.error(error);
      }
      historyStorage.setPath(location.pathname);
      navigate("/logout", {
        replace: false,
      });
    }
  }

  function startTokenRefresh(): void {
    if (refreshIntervalTime.current !== 0) {
      refreshInterval.current = setInterval(async () => {
        await refreshToken();
        console.log("token has been updated"); // TODO:DELETE DEV LOG
      }, refreshIntervalTime.current);
    }
  }

  useEffect(() => {
    async function initTokenRefresh() {
      await refreshToken();

      if (refreshInterval.current === null) {
        startTokenRefresh();
      }
    }

    if (isAuthenticated) {
      initTokenRefresh();
    } else {
      refreshInterval.current && clearInterval(refreshInterval.current);
      refreshInterval.current = null;
    }

    // eslint-disable-next-line
  }, [isAuthenticated]);

  const login = async (request: LoginRequest): Promise<any> => {
    const response: AxiosResponse = await authApi.fetchTokenAsync(request);

    if (response) {
      const status: number = response.status;
      const responseData: FetchTokenResponse = response.data;

      if (status === 400 && responseData.error) {
        if (responseData.error === "invalid_grant") {
          tokenStorage.removeKeys();
          setAuth(false);
          return response;
        }
      }
      if (status !== 200) {
        return response;
      }
      const accessToken: string = responseData.access_token;
      const refreshToken: string = responseData.refresh_token;
      const expiresInMs: number = responseData.expires_in * 1000;

      refreshIntervalTime.current = expiresInMs;

      tokenStorage.setKeys({
        domain: request.domain,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });

      setAuth(true);

      navigate(from.toLowerCase().startsWith("/logout") ? "/" : from, {
        replace: false,
      });
      return response;
    } else {
      navigate("/server-error/");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setAuth,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
