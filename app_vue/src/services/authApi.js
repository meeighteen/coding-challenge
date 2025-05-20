import { createAxiosInstance } from "@/lib/axios";
import { isTokenExpired } from "@/composables/useAuth";

const apiNode = createAxiosInstance({
  baseURL: import.meta.env.VITE_API_NODE_URL,
});

export const login = async ({ email, password }) => {
  const response = await apiNode.post("/api/public/login", { email, password });
  const token = response.data.token;

  if (isTokenExpired(token)) {
    throw new Error("Token expirado");
  }

  localStorage.setItem("token", token);
};
