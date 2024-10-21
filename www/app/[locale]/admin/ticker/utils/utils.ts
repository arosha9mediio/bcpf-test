const removeSchemeAndSubdomain = (url: string): string => {
  try {
    const parsedUrl = new URL(url);
    return (
      parsedUrl.hostname +
      parsedUrl.pathname +
      parsedUrl.search +
      parsedUrl.hash
    );
  } catch (error) {
    return url;
  }
};

export { removeSchemeAndSubdomain };
