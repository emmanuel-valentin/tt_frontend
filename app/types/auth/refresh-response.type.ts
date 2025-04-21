export type RefreshResponse = {
  access?: string;

  // Django error when refresh token is not provided
  refresh?: [string];
};
