import { createAxiosInstance } from "@/lib/axios";

const apiNode = createAxiosInstance({
  baseURL: import.meta.env.VITE_API_NODE_URL,
});

export const processQR = (qrResult) => apiNode.post("/process/qr", qrResult);
