import { createAxiosInstance } from "@/lib/axios";

const apiGo = createAxiosInstance({
  baseURL: import.meta.env.VITE_API_GO_URL,
});

export const factorizeQR = async (matrix) => {
  const response = await apiGo.post("/api/private/matrix/qr", {
    matrix: JSON.parse(matrix.matrix),
  });
  return response.data;
};
