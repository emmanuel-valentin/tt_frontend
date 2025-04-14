export type ApiResponse<T = object> = {
  status: string;
  statusCode: number;
  data: T;
  error: Error | null;
};

type Error = {
  message: string;
};
