const ACCESS_TOKEN_KEY = "AssessToken";

export const setAccessToken = (accessToken: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
};

export const getAccessToken = (): string => {
  return localStorage.getItem(ACCESS_TOKEN_KEY) || "";
};
