//export const API_URL = "http://localhost:3100/api";
export const API_URL =  process.env.NODE_ENV === 'development' ? "http://localhost:3100/api" : "https://chef-backend-pi.vercel.app/api";

