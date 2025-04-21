import axios from "axios";

import { apiUrl } from "~/config/env.config";
import { getAuthTokens } from "~/lib/utils";

export const fisiogoApi = axios.create({
  baseURL: apiUrl,
  validateStatus: () => true,
});

fisiogoApi.interceptors.request.use((config) => {
  const { accessToken } = getAuthTokens();
  if (accessToken) {
    config.headers.set("Authorization", `Bearer ${accessToken}`);
  }
  return config;
});
