export const getFinalCallbackUrl = (fallbackUrl: string) => {
  const callbackUrl = localStorage.getItem("callbackUrl");
  if (callbackUrl?.includes(fallbackUrl)) {
    return callbackUrl;
  }
  return fallbackUrl;
};
