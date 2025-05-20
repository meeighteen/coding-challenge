import * as matrixCoreAPI from "@/services/matrixCoreAPI";
import { ref } from "vue";

const result = ref(null);
const isLoading = ref(false);
const error = ref(null);
export function useMatrix() {
  const factorizeMatrix = async (matrix) => {
    isLoading.value = true;
    error.value = null;
    try {
      const matrix = await matrixCoreAPI.factorizeQR(matrix);
      result.value = { matrix };
    } catch (err) {
      error.value = err.message;
      result.value = null;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    result,
    isLoading,
    error,
    factorizeMatrix,
  };
}
