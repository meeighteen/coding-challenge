import { createAxiosInstance } from "@/lib/axios";

const apiNode = createAxiosInstance({
  baseURL: import.meta.env.VITE_API_NODE_URL,
});

export const processQR = async (Q, R) => {
  const response = await apiNode.post("/api/private/matrix_operations", {
    Q,
    R,
  });
  return response.data;
};
