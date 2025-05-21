<script setup>
import { ref, watch } from "vue";
import { useMatrix } from "@/composables/useMatrix.js";
import { useOperationsMatrix } from "@/composables/useOperationsMatrix.js";

const emit = defineEmits(["operationMatrix"]);

const { result: resultFactorizeMatrix } = useMatrix();
const {
  result: resultOperationsMatrix,
  isLoading: isLoadingOperationsMatrix,
  error: errorOperationsMatrix,
} = useOperationsMatrix();

const matrixQ = ref("");
const matrixR = ref("");

watch(
  () => resultFactorizeMatrix.value,
  (res) => {
    if (!res || typeof res.Q === "undefined" || typeof res.R === "undefined") {
      return;
    }

    matrixQ.value = JSON.stringify(res.Q, null, 2);
    matrixR.value = JSON.stringify(res.R, null, 2);
  },
  { immediate: true }
);

function onSubmit() {
  let Q, R;
  try {
    Q = JSON.parse(matrixQ.value);
    R = JSON.parse(matrixR.value);
  } catch (e) {
    console.error("Invalid JSON in one of the textareas", e);
    return;
  }
  emit("operationMatrix", { Q, R });
}
</script>

<template>
  <div class="loading" v-if="isLoadingOperationsMatrix">
    <p>Loading...</p>
  </div>
  <form @submit.prevent="onSubmit" class="">
    <div v-if="resultFactorizeMatrix">
      <div class="form-operations-matrix">
        <div class="matrix-input-Q">
          <div>
            <h3>Matriz Q</h3>
            <textarea
              v-model="matrixQ"
              rows="20"
              cols="30"
              placeholder="Ej: [[1,2],[3,4]]"
            ></textarea>
          </div>
        </div>
        <div class="matrix-input-R">
          <div>
            <h3>Matriz R</h3>
            <textarea
              v-model="matrixR"
              rows="20"
              cols="30"
              placeholder="Ej: [[1,2],[3,4]]"
            ></textarea>
          </div>
        </div>
      </div>

      <button type="submit" :disabled="isLoadingOperationsMatrix">
        Operar
      </button>
      <p v-if="errorOperationsMatrix">{{ errorOperationsMatrix }}</p>
      <div class="loading" v-if="isLoadingOperationsMatrix">
        <p>Loading...</p>
      </div>
      <div v-else-if="resultOperationsMatrix">
        <h3>Resultado de la operación:</h3>
        <pre>{{ resultOperationsMatrix }}</pre>
      </div>
    </div>
  </form>
</template>

<style scoped>
.form-operations-matrix {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
</style>
