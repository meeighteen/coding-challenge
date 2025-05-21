<script setup>
import factorizeMatrixForm from "@/components/FactorizeMatrixForm.vue";
import OperateMatrixForm from "@/components/OperateMatrixForm.vue";
import { useMatrix } from "@/composables/useMatrix.js";
import { useOperationsMatrix } from "@/composables/useOperationsMatrix.js";

const apiGoBaseURL = import.meta.env.VITE_API_GO_URL;
const apiNodeBaseURL = import.meta.env.VITE_API_NODE_URL;

const { factorizeMatrix } = useMatrix();
const { operateMatrixFn } = useOperationsMatrix();

const handleFactorizeMatrix = async (matrix) => {
  try {
    await factorizeMatrix(matrix);
  } catch (error) {
    alert("Error al factorizar la matriz:", error.message);
  }
};

const handleOperationMatrix = async (operation) => {
  try {
    const { Q, R } = operation;
    await operateMatrixFn(Q, R);
  } catch (error) {
    alert("Error al operar con las matrices:", error.message);
  }
};
</script>

<template>
  <div class="dashboard-container">
    <div>
      <h1>Reto Técnico Interseguro</h1>
      <h4>API RESTFUL GOLANG</h4>
      <p>
        Documentación:<a :href="`${apiGoBaseURL}/swagger`" target="_blank"
          >Swagger</a
        >
      </p>
    </div>
    <div>
      <h4>API RESTFUL NODE</h4>
      <p>
        Documentación:<a :href="`${apiNodeBaseURL}/api-docs`" target="_blank"
          >Swagger</a
        >
      </p>
    </div>
    <h2>Ingreso de Matriz</h2>
    <factorizeMatrixForm @factorizeMatrix="handleFactorizeMatrix" />
    <OperateMatrixForm @operationMatrix="handleOperationMatrix" />
  </div>
</template>

<style scoped>
.dashboard-container {
  max-width: 800px;
  margin: auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
}
.matrix-inputs {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
textarea {
  width: 100%;
  resize: none;
}
button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
}
.results {
  margin-top: 2rem;
}
</style>
