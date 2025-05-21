<script setup>
import { ref } from "vue";
import { useMatrix } from "@/composables/useMatrix.js";

const emit = defineEmits(["factorizeMatrix"]);

const matrix = ref("");
const { error, isLoading } = useMatrix();

const onSubmit = () => {
  emit("factorizeMatrix", { matrix: matrix.value });
};
</script>

<template>
  <form @submit.prevent="onSubmit" class="">
    <div class="matrix-inputs">
      <div>
        <h3>Matriz rectangular</h3>
        <textarea
          v-model="matrix"
          rows="10"
          cols="50"
          placeholder="Ej: [[1,2],[3,4]]"
        ></textarea>
      </div>
    </div>
    <button type="submit" :disabled="isLoading">Factorizar</button>
    <p v-if="error">{{ error }}</p>
  </form>
</template>

<style scoped></style>
