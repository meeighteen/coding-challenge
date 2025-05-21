import axios from "axios";

/**
 * Crea una instancia de Axios con configuración específica
 * @param {Object} options - Opciones de configuración
 * @param {string} options.baseURL - URL base de la API
 * @param {Object} [options.headers] - Headers personalizados
 * @returns {AxiosInstance}
 */
export function createAxiosInstance({ baseURL, headers = {} }) {
  const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error(`[Axios Error] ${baseURL}:`, error.message);
      return Promise.reject(error);
    }
  );

  return instance;
}
