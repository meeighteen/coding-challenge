import { ref } from "vue";
import * as matrixAnalysisAPI from "@/services/matrixAnalysisAPI";

const result = ref(null);
const isLoading = ref(false);
const error = ref(null);
export function useOperationsMatrix() {
  const operateMatrixFn = async (Q, R) => {
    isLoading.value = true;
    error.value = null;
    try {
      const operationsResult = await matrixAnalysisAPI.processQR(Q, R);

      result.value = operationsResult;
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
    operateMatrixFn,
  };
}
