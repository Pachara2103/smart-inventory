<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import dashboardIcon from '@/images/icons/dashboard.png'
import productIcon from '@/images/icons/product.png'


const route = useRoute()

// onMounted(() => {

// })
const activeTab = ref('')

function handleClick(tabName) {
  activeTab.value = tabName
}
</script>

<template>
  <div class="container">
    <nav class="tab" v-if="route.path !== '/'">
      <RouterLink to="/Dashboard" class="tab-box" :class="{ active: activeTab === 'dashboard' }"
        @click="handleClick('dashboard')">

        <img :src="dashboardIcon" width="24" height="24" />
        <label> Dashboard</label>
      </RouterLink>

      <RouterLink to="/Product" class="tab-box" :class="{ active: activeTab === 'product' }"
        @click="handleClick('product')">
        <img :src="productIcon" width="24" height="24" />
        <label> Product</label>
      </RouterLink>
    </nav>

    <RouterView />

  </div>
</template>

<style>
.container {
  display: flex;
  flex-direction: row;
  /* height: 100vh; */
  background-color: aqua;
}

.tab {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 200px;
  /* ความกว้างของแถบ nav */
  background-color: pink;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  /* box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); */
  /* z-index: 1000; */

}

.tab-box {
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;

  height: 35px;
  border-radius: 5px;
  background-color: white;
}

.tab-box.active {
  background-color: blueviolet;
  color: white;
}

.icon {
  width: 30px;
  height: 30px;
}
</style>
