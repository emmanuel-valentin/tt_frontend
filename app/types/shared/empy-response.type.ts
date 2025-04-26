import { ApiResponse } from "./api-response.type";

export type EmptyResponse = ApiResponse<{
  mesage: string;
}>;
