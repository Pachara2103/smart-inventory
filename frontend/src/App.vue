<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import productIcon from '@/images/icons/product.png'



const route = useRoute()
const isProductOpen = ref(false)
const activeTab = ref('dashboard')


onMounted(() => {
  //  activeTab === 'dashboard';

})


function handleClick(tabName) {
  activeTab.value = tabName
  if (tabName === 'product') {
    isProductOpen.value = !isProductOpen.value
  } else {
    isProductOpen.value = false
  }

}
</script>

<template>
  <div class="container">
    <nav class="tab" v-if="route.path !== '/'">
      <label style="text-align: center; margin-bottom: 20px;"> INVENTORY</label>
      <RouterLink to="/Dashboard" class="tab-box" :class="{ active: activeTab === 'dashboard' }"
        @click="handleClick('dashboard')">

        <svg class="icon" :class="{ active: activeTab === 'dashboard' }" viewBox="-5 -5 35 35">
          <path
            d="M 23.9 11.437 A 12 12 0 0 0 0 13 a 11.878 11.878 0 0 0 3.759 8.712 A 4.84 4.84 0 0 0 7.113 23 H 16.88 a 4.994 4.994 0 0 0 3.509 -1.429 A 11.944 11.944 0 0 0 23.9 11.437 Z m -4.909 8.7 A 3 3 0 0 1 16.88 21 H 7.113 a 2.862 2.862 0 0 1 -1.981 -0.741 A 9.9 9.9 0 0 1 2 13 A 10.014 10.014 0 0 1 5.338 5.543 A 9.881 9.881 0 0 1 11.986 3 a 10.553 10.553 0 0 1 1.174 0.066 a 9.994 9.994 0 0 1 5.831 17.076 Z M 7.807 17.285 a 1 1 0 0 1 -1.4 1.43 A 8 8 0 0 1 12 5 a 8.072 8.072 0 0 1 1.143 0.081 a 1 1 0 0 1 0.847 1.133 a 0.989 0.989 0 0 1 -1.133 0.848 a 6 6 0 0 0 -5.05 10.223 Z m 12.112 -5.428 A 8.072 8.072 0 0 1 20 13 a 7.931 7.931 0 0 1 -2.408 5.716 a 1 1 0 0 1 -1.4 -1.432 a 5.98 5.98 0 0 0 1.744 -5.141 a 1 1 0 0 1 1.981 -0.286 Z m -5.993 0.631 a 2.033 2.033 0 1 1 -1.414 -1.414 l 3.781 -3.781 a 1 1 0 1 1 1.414 1.414 Z" />
        </svg>
        <label> Dashboard</label>
      </RouterLink>

      <RouterLink to="/Product" class="tab-box" :class="{ active: activeTab === 'product' }"
        @click="handleClick('product')">
        <img :src="productIcon" width="24" height="24" />
        <label> Product</label>
        <span>{{ isProductOpen ? '▼' : '>' }}</span>
      </RouterLink>

      <div v-if="isProductOpen" class="sub-menu">
        <RouterLink to="/Product/Add" class="sub-tab">- Add Product</RouterLink>
      </div>

      <RouterLink to="/History" class="tab-box" :class="{ active: activeTab === 'history' }"
        @click="handleClick('history')">
        <svg class="icon" :class="{ active: activeTab === 'history' }" viewBox="-5 -5 35 35">
          <path
            d="M 12 0 A 11.972 11.972 0 0 0 4 3.073 V 1 A 1 1 0 0 0 2 1 V 4 A 3 3 0 0 0 5 7 H 8 A 1 1 0 0 0 8 5 H 5 a 0.854 0.854 0 0 1 -0.1 -0.021 A 9.987 9.987 0 1 1 2 12 a 1 1 0 0 0 -2 0 A 12 12 0 1 0 12 0 Z" />
          <path 
            d="M12,6a1,1,0,0,0-1,1v5a1,1,0,0,0,.293.707l3,3a1,1,0,0,0,1.414-1.414L13,11.586V7A1,1,0,0,0,12,6Z" />
        </svg> <label> History</label>

      </RouterLink>

    </nav>

    <RouterView />

  </div>
</template>

<style>
.sub-menu {
  margin-left: 40px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 5px;
}

.sub-tab {
  color: black;
  text-decoration: none;
  font-size: 0.9rem;
}

.sub-tab:hover {
  color: blue;
}

.container {
  /* flex: 1; */
  flex-direction: row;
  /* display: flex; */
  /* height: 100vh; */
  margin-left: 225px;
  background-color: rgb(255, 241, 234);
}

.tab {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 200px;

  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 0.1px solid black;
  border-radius: 10px;
  /* text-decoration: none; */
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
  color: black;
  text-decoration: none;
}

.tab-box.active {
  background-color: #27548A;
  color: white;
}

.icon {
  width: 30px;
  height: 30px;
}

.icon.active {
  fill: white;
}
</style>
