export const getImageUrl = (path) => {
  return `${import.meta.env.BASE_URL}assets/${path}`;
};

export const hasProjectLink = (url) =>
  typeof url === "string" && url.trim().length > 0;

export const getHomeHashLink = (hash) => {
  const id = hash.startsWith("#") ? hash : `#${hash}`;
  return `${import.meta.env.BASE_URL}${id}`;
};

export const getFigmaHref = (figmaUrl) => {
  if (!figmaUrl || figmaUrl.startsWith("FIGMA_LINK_")) {
    return null;
  }
  return figmaUrl;
};
