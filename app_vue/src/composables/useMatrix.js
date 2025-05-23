import { ref } from "vue";
import * as matrixCoreAPI from "@/services/matrixCoreAPI";

const result = ref(null);
const isLoading = ref(false);
const error = ref(null);
export function useMatrix() {
  const factorizeMatrix = async (matrix) => {
    isLoading.value = true;
    error.value = null;
    try {
      const matrixResult = await matrixCoreAPI.factorizeQR(matrix);
      
      result.value = matrixResult;
    } catch (err) {
      console.log(err);
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
