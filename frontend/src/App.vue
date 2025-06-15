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

        <svg :style="{ fill: activeTab === 'dashboard' ? 'white' : '', width: '30px', height: '30px' }"
          viewBox="-5 -5 35 35">
          <path
            d="M 23.9 11.437 A 12 12 0 0 0 0 13 a 11.878 11.878 0 0 0 3.759 8.712 A 4.84 4.84 0 0 0 7.113 23 H 16.88 a 4.994 4.994 0 0 0 3.509 -1.429 A 11.944 11.944 0 0 0 23.9 11.437 Z m -4.909 8.7 A 3 3 0 0 1 16.88 21 H 7.113 a 2.862 2.862 0 0 1 -1.981 -0.741 A 9.9 9.9 0 0 1 2 13 A 10.014 10.014 0 0 1 5.338 5.543 A 9.881 9.881 0 0 1 11.986 3 a 10.553 10.553 0 0 1 1.174 0.066 a 9.994 9.994 0 0 1 5.831 17.076 Z M 7.807 17.285 a 1 1 0 0 1 -1.4 1.43 A 8 8 0 0 1 12 5 a 8.072 8.072 0 0 1 1.143 0.081 a 1 1 0 0 1 0.847 1.133 a 0.989 0.989 0 0 1 -1.133 0.848 a 6 6 0 0 0 -5.05 10.223 Z m 12.112 -5.428 A 8.072 8.072 0 0 1 20 13 a 7.931 7.931 0 0 1 -2.408 5.716 a 1 1 0 0 1 -1.4 -1.432 a 5.98 5.98 0 0 0 1.744 -5.141 a 1 1 0 0 1 1.981 -0.286 Z m -5.993 0.631 a 2.033 2.033 0 1 1 -1.414 -1.414 l 3.781 -3.781 a 1 1 0 1 1 1.414 1.414 Z" />
        </svg>
        <label> Dashboard</label>
      </RouterLink>

      <RouterLink to="/Product" class="tab-box" :class="{ active: activeTab === 'product' }"
        @click="handleClick('product')">
        <svg :style="{ fill: activeTab === 'product' ? 'white' : '', width: '30px', height: '30px' }"
          viewBox="-5 -5 35 35">
          <path xmlns="http://www.w3.org/2000/svg"
            d="M23.621,6.836l-1.352-2.826c-.349-.73-.99-1.296-1.758-1.552L14.214,.359c-1.428-.476-3-.476-4.428,0L3.49,2.458c-.769,.256-1.41,.823-1.759,1.554L.445,6.719c-.477,.792-.567,1.742-.247,2.609,.309,.84,.964,1.49,1.802,1.796l-.005,6.314c-.002,2.158,1.372,4.066,3.418,4.748l4.365,1.455c.714,.238,1.464,.357,2.214,.357s1.5-.119,2.214-.357l4.369-1.457c2.043-.681,3.417-2.585,3.419-4.739l.005-6.32c.846-.297,1.508-.946,1.819-1.79,.317-.858,.228-1.799-.198-2.499ZM10.419,2.257c1.02-.34,2.143-.34,3.162,0l4.248,1.416-5.822,1.95-5.834-1.95,4.246-1.415ZM2.204,7.666l1.327-2.782c.048,.025,7.057,2.373,7.057,2.373l-1.621,3.258c-.239,.398-.735,.582-1.173,.434l-5.081-1.693c-.297-.099-.53-.325-.639-.619-.109-.294-.078-.616,.129-.97Zm3.841,12.623c-1.228-.409-2.052-1.554-2.051-2.848l.005-5.648,3.162,1.054c1.344,.448,2.792-.087,3.559-1.371l.278-.557-.005,10.981c-.197-.04-.391-.091-.581-.155l-4.366-1.455Zm11.897-.001l-4.37,1.457c-.19,.063-.384,.115-.581,.155l.005-10.995,.319,.64c.556,.928,1.532,1.459,2.561,1.459,.319,0,.643-.051,.96-.157l3.161-1.053-.005,5.651c0,1.292-.826,2.435-2.052,2.844Zm4-11.644c-.105,.285-.331,.504-.619,.6l-5.118,1.706c-.438,.147-.934-.035-1.136-.365l-1.655-3.323s7.006-2.351,7.054-2.377l1.393,2.901c.157,.261,.186,.574,.081,.859Z" />
        </svg>
        <label> Product</label>

        <svg v-if="!isProductOpen" :style="{ width: '30px', height: '30px', position:'absolute', right:'10px'}" viewBox="-5 -5 35 35">
          <path xmlns="http://www.w3.org/2000/svg"
            d="M15.4,9.88,10.81,5.29a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L14,11.29a1,1,0,0,1,0,1.42L9.4,17.29a1,1,0,0,0,1.41,1.42l4.59-4.59A3,3,0,0,0,15.4,9.88Z" />
        </svg>
        <svg v-else="isProductOpen" :style="{ fill: 'white', width: '20px', height: '20px', position:'absolute', right:'10px'}"
          viewBox="-5 -5 35 35">
          <path xmlns="http://www.w3.org/2000/svg"
            d="M1.51,6.079a1.492,1.492,0,0,1,1.06.44l7.673,7.672a2.5,2.5,0,0,0,3.536,0L21.44,6.529A1.5,1.5,0,1,1,23.561,8.65L15.9,16.312a5.505,5.505,0,0,1-7.778,0L.449,8.64A1.5,1.5,0,0,1,1.51,6.079Z" />
        </svg>

      </RouterLink>

      <div v-if="isProductOpen" class="sub-menu">
        <RouterLink to="/Product/Add" class="sub-tab">- Add Product</RouterLink>
      </div>

      <RouterLink to="/History" class="tab-box" :class="{ active: activeTab === 'history' }"
        @click="handleClick('history')">
        <svg class="icon" :class="{ active: activeTab === 'history' }" viewBox="-5 -5 35 35">
          <path
            d="M 12 0 A 11.972 11.972 0 0 0 4 3.073 V 1 A 1 1 0 0 0 2 1 V 4 A 3 3 0 0 0 5 7 H 8 A 1 1 0 0 0 8 5 H 5 a 0.854 0.854 0 0 1 -0.1 -0.021 A 9.987 9.987 0 1 1 2 12 a 1 1 0 0 0 -2 0 A 12 12 0 1 0 12 0 Z" />
          <path d="M12,6a1,1,0,0,0-1,1v5a1,1,0,0,0,.293.707l3,3a1,1,0,0,0,1.414-1.414L13,11.586V7A1,1,0,0,0,12,6Z" />
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
  display: flex;
  /* height: 100vh; */
  margin-left: 225px;
  background-color: rgb(255, 158, 109);
  justify-content: center;
  align-items: center;
}

.tab {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 200px;

  background-color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 1rem;
  border: 2px solid #dcdcdc;
  border-radius: 10px;
  /* text-decoration: none; */
  /* z-index: 1000; */

}

.tab-box {
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  justify-content: flex-start;

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
