<script setup>
import { useRouter } from "vue-router";
import { useAuth } from "@/composables/useAuth.js";
import LoginForm from "@/components/LoginForm.vue";

const router = useRouter();

const { login } = useAuth();

const handleLogin = async ({ email, password }) => {
  try {
    await login(email, password);
    router.push("/dashboard");
  } catch (err) {
    alert("Error de login: " + err.message);
  }
};
</script>

<template>
  <div class="login-container">
    <h1 class="title-login">Autenticación de usuarios</h1>
    <LoginForm @login="handleLogin" />
  </div>
</template>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Roboto", sans-serif;
}
</style>
