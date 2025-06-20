<script setup>
function loginWithGoogle() {
  window.location.href = 'http://localhost:3000/auth/google/signin';
}

</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="header">Login</h2>

      <div style="flex-direction: row; display: flex; justify-content: flex-end; gap: 20px;">

        <div class="button-wrapper">
          <button @click="loginWithGoogle">Login by Google</button>
        </div>


      </div>
  


    </div>
  </div>
</template>

<style>
.login-container {
  position: absolute;
  top:200px;
  right: 550px;
  
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box {
  width: 300px;
  padding-bottom:  20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
}

/* ข้อความหัว */
.header {
  text-align: center;
  margin-bottom: 1rem;
}


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
  width: 200px;
}

button:hover {
  background-color: #165ac7;
}
</style>
