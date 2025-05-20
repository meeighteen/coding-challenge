import { ref } from "vue";
import * as authApi from "@/services/authApi";

export function isTokenExpired(token) {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp < Date.now() / 1000;
  } catch (e) {
    return true;
  }
}

const user = ref(null);
const isLoading = ref(false);
const error = ref(null);

export function useAuth() {
  const login = async (email, password) => {
    isLoading.value = true;
    error.value = null;
    try {
      const token = await authApi.login({ email, password });
      user.value = { token };
    } catch (err) {
      error.value = err.message;
      user.value = null;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    user,
    isLoading,
    error,
    login,
  };
}
