import { ApiResponse } from "../shared/api-response.type";

export type LoginResponseData = {
  message: string;
  access_token: string;
  refresh_token: string;
};

export type LoginResponse = ApiResponse<LoginResponseData>;
