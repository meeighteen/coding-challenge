<script setup>
import { ref } from "vue";
const emit = defineEmits(["factorizeMatrix"]);

const matrix = ref("");

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
          rows="6"
          placeholder="Ej: 1,2;3,4"
        ></textarea>
      </div>
    </div>
    <button type="submit">Enviar</button>
  </form>
</template>

<style scoped></style>
