<script setup>
import { ref } from "vue";
import { useAuth } from "@/composables/useAuth.js";

const emit = defineEmits(["login"]);

const email = ref("");
const password = ref("");

const { isLoading, error } = useAuth();

const onSubmit = () => {
  emit("login", { email: email.value, password: password.value });
};
</script>

<template>
  <form @submit.prevent="onSubmit" class="login-form">
    <input
      v-model="email"
      type="email"
      placeholder="Correo electrónico"
      required
    />
    <input
      v-model="password"
      type="password"
      placeholder="Contraseña"
      required
    />
    <button type="submit" :disabled="isLoading">Iniciar sesión</button>
    <p v-if="error">{{ error }}</p>
  </form>
</template>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 10px;
}
</style>
