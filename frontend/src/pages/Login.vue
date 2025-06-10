<script setup>
function loginWithGoogle() {
  window.location.href = 'http://localhost:3000/auth/google/signin';
}
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="header">Login Page</h2>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <div class="button-wrapper">
        <button @click="loginWithGoogle">Login by Google</button>
      </div>
    </div>
  </div>
</template>

<style>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #f0f0f0;
}

.login-box {
  width: 300px;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: white;
}

/* ข้อความหัว */
.header {
  text-align: center;
  margin-bottom: 1rem;
}

/* ช่องป้อนข้อมูล */
input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* ปุ่มให้อยู่ขวา */
.button-wrapper {
  display: flex;
  justify-content: flex-end;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #357ae8;
}
</style>
