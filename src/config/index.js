export const port = process.env.PORT || 8000;
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;
export const baseUri = process.env.BASE_URI || '/';

export default {
  port,
  host,
  baseUri
};
