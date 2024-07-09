export const normalizeLink = (link: string, baseUrl: string): string => {
  try {
    return new URL(link, baseUrl).href;
  } catch (e) {
    return link;
  }
};
