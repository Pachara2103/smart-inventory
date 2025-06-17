<script setup>
import { ref, onMounted, reactive, computed } from 'vue'
import axios from 'axios'
import searchIcon from '@/images/icons/search.png'


const AllProduct = ref([])
const searchValue = ref('')
const searchType = ref('name')
const User = ref({});

onMounted(async () => {
  try {
    const getUser = await axios.get('http://localhost:3000/user/profile', {
      withCredentials: true // send cookies
    })
    User.value = getUser.data
    console.log('User.value = ', User.value)

  } catch (error) {
    console.error('Error fetching products:', error)
  }

  try {
    const response = await axios.get('http://localhost:3000/product/getallhistory')
    AllProduct.value = response.data
    console.log('All product in history = ', AllProduct._rawValue)

  } catch (error) {
    console.error('Error fetching products:', error)
  }
});

const handleSearch = async () => {
  currentPage.value = 1;
  console.log('search= ', searchValue.value);
  if (!searchValue.value) {
    const response = await axios.get('http://localhost:3000/product/getallhistory')
    AllProduct.value = response.data;
  }
  else {
    try {
      const res = await axios.get('http://localhost:3000/product/gethistoryproduct', {
        params: {
          value: searchValue.value,
          type: searchType.value
        }
      })
      AllProduct.value = res.data
    } catch (err) {
      console.error('Search failed:', err)
    }

  }

}

const currentPage = ref(1);
const pageSize = 7;

const pageProduct = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return AllProduct.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(AllProduct.value.length / pageSize);
});

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

</script>

<template>
  <div class="product-container">
    <label style="font-size: 30px; padding-bottom: 20px; font-weight: bold;">HISTORY</label>

    <div class="search">
      <img :src="searchIcon" width=40 height=40 style="margin-right: 5px;">
      <select v-model="searchType">
        <option value="name">Name</option>
        <option value="sku">Sku</option>
        <option value="category">Category</option>
        <option value="action">Action</option>
        <option value="user">User</option>

      </select>
      <input type="search" v-model="searchValue" placeholder="Search..." style="width: 340px;"
        @keyup.enter="handleSearch" />
      <button @click="handleSearch">Enter</button>
    </div>

    <table class="product-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>SKU</th>
          <th>Category</th>
          <th>Quantity</th>
          <th>Unit</th>
          <th>Action</th>
          <th>User</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in pageProduct" :key="index">
          <td style="width: 210px;">
            <div style="flex-direction: row; display: flex; justify-content: center; align-items: center; gap: 10px;">

              <div style="width: 50px; height: 50px;">
                <img :src="`http://localhost:3000/images/${product.sku}.png`" style="width: 100%; height: 100%;">
              </div>

              {{ product.name }}

            </div>

          </td>
          <td style="width: 80px;">{{ product.sku }}</td>
          <td style="width: 80px;">{{ product.category }}</td>
          <td style="width: 80px;">{{ product.quantity }}</td>
          <td style="width: 80px;">{{ product.unit }}</td>

          <td style="width: 80px;">{{ product.action }}</td>
          <td style="width: 150px;">{{ product.user }}</td>
          <td style="width: 250px;">{{ product.description }}</td>
        </tr>
      </tbody>
    </table>

    <div style="margin-top: 20px; position: absolute; bottom: 0;">
      <button v-for="page in totalPages" :key="page" @click="goToPage(page)"
        :style="{ marginRight: '5px', background: page === currentPage ? '#FF6F3C' : '#999999' }">
        {{ page }}
      </button>
    </div>


  </div>
</template>

<style scoped>
.product-container {
  width: auto;
  height: 98vh;
  position: relative;
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f8f9f9;
  align-items: center;
  border-radius: 10px;
}

.search {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-bottom: 15px;
}

.product-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border: 1px solid #ccc;

}

.product-table thead {
  background-color: #4a90e2;
  color: white;
}

.product-table th {
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
  border: 1px solid #ccc;
  text-align: center;

}

.product-table td {
  position: relative;
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
  border: 1px solid #ccc;
  text-align: center;
}

.product-table tbody tr:hover {
  background-color: #f5faff;
  cursor: pointer;
}

.product-name {
  display: flex;
  align-items: center;
  gap: 10px;
}

.product-name img {
  width: 24px;
  height: 24px;
  object-fit: contain;
  border-radius: 4px;
}

.popover {
  position: absolute;
  top: 15px;
  left: 160px;
  width: 170px;
  border: 2px solid #dedede;
  padding: 15px;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  margin-top: 5px;

  flex-direction: column;

  justify-content: center;
  align-items: center;
  display: flex;

  background-color: rgb(255, 255, 255);
}

.popover input {
  display: block;
  margin: 5px 0;
  width: 120px;
}

.search select {
  width: auto;
  padding: 5px 5px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
}

.tab-box {
  position: absolute;
  top: 10px;
  right: 0;
  width: 160px;
  height: 35px;
  border-radius: 5px;
  justify-content: center;

  flex-direction: row;
  display: flex;

  background-color: rgb(250, 134, 26);
  color: rgb(255, 255, 255);
  text-decoration: none;
  cursor: pointer;
}

.tab-box:hover {
  background-color: #d18100;
}
</style>