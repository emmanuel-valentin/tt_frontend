import { fisiogoApi } from "~/api/fisiogoApi";

import type { LoginCredentials } from "~/types/auth/login-payload.type";
import type { LoginResponse } from "~/types/auth/login.response";
import { RefreshResponse } from "~/types/auth/refresh-response.type";
import type { RegisterData } from "~/types/auth/register-form.type";
import type { RegisterResponse } from "~/types/auth/register.response";

export async function login(credentials: LoginCredentials) {
  try {
    const { data, status } = await fisiogoApi.post<LoginResponse>(
      "/login",
      credentials
    );

    if (status !== 200) {
      throw new Error(data.error?.message);
    }

    if (!data) {
      throw new Error("Empty response");
    }

    return {
      serviceData: data.data,
    };
  } catch (error) {
    return {
      serviceError: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function logout(refresh_token: string) {
  try {
    const { status } = await fisiogoApi.post("/token/logout", {
      refresh: refresh_token,
    });

    if (status !== 200) {
      throw new Error("Logout failed");
    }
  } catch (error) {
    return {
      serviceError: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function register(registerData: RegisterData) {
  try {
    const { data, status } = await fisiogoApi.post<RegisterResponse>(
      "/register",
      registerData
    );

    if (status !== 201) {
      throw new Error(data.error?.message);
    }

    if (!data) {
      throw new Error("Empty response");
    }

    const { access_token, refresh_token } = data.data;
    return {
      serviceData: { access_token, refresh_token },
    };
  } catch (error) {
    return {
      serviceError: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function refreshAccessToken(refresh_token: string) {
  try {
    const { data, status } = await fisiogoApi.post<RefreshResponse>(
      "/token/refresh",
      {
        refresh: refresh_token,
      }
    );

    if (status !== 200) {
      throw new Error(data.refresh?.[0] ?? "Refresh token failed");
    }

    const newAccessToken = data.access;
    return {
      serviceData: { access_token: newAccessToken },
    };
  } catch (error) {
    return {
      serviceError: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
