// Default to local backend in development if env not set
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export default BASE_URL;

const BASE_URL_PROD = process.env.NEXT_PUBLIC_BASE_URL_PROD;
export { BASE_URL_PROD };