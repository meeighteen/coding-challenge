import { createAxiosInstance } from "@/lib/axios";

const API_INSTANCE_GO = createAxiosInstance({
  baseURL: import.meta.env.VITE_API_GO_URL,
});

export const factorizeQR = (matrix) =>
  API_INSTANCE_GO.post("/api/private/matrix/qr", { matrix });
