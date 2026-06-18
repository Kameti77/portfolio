export const getImageUrl = (path) => {
  return `${import.meta.env.BASE_URL}assets/${path}`;
};

export const hasProjectLink = (url) =>
  typeof url === "string" && url.trim().length > 0;
