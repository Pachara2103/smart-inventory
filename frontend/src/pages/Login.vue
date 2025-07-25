<script setup>
function loginWithGoogle() {
  window.location.href = 'http://localhost:3000/auth/google/signin';
}

</script>

<template>
  <div style="position:absolute; width: 100%; height: 100%;">
    <img src="@/images/icons/login.jpg" style="width: 100%; height: 100%;">
  </div >

  <div class="login-box">

    <div style="width: 30%;">
      <img src="@/images/icons/google.png" style="width: 100%; height: 100%;">

    </div>

    <div style="width: 70%;justify-content: center; display: flex;">
      <button @click="loginWithGoogle">Login with Google</button>

    </div>


  </div>

</template>

<style>
.login-box {
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  position: absolute;
  left: 20vw;
  top: 35vh;
  background-color: rgba(255, 255, 255, 0.2);
  width: 20vw;
  height: 6vw;
  padding: 10px;

  flex-direction: row;
  display: flex;
  align-items: center;
}
button{
  padding: 10px;
  font-size: 18px;
  color: #fff;
  background-color: #4285f4;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}
button:hover{
    transform: scale(1.05);
}

html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
