import axios from "axios";
import { apiUrl } from "~/config/env.config";

export const fisiogoApi = axios.create({
  baseURL: apiUrl,
  validateStatus: () => true,
});

fisiogoApi.interceptors.request.use((config) => {
  // TODO: Read the token from Remix session cookies or the local storage.
  // Later, we'll define how to store the token obtained from the back-end
  // when a user auhthenticate. But, whatever we store it, we need to
  // modify the request and include the Authorization header setting the token as value.
  return config;
});
