import axios from "axios";
import { sessionStorageToken } from "@/lib/session-storage";

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "/api",
});

httpClient.interceptors.request.use((config) => {
  const token = sessionStorageToken.get();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
