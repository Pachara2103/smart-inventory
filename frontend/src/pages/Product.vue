<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import searchIcon from '@/images/icons/search.png'


const AllProduct = ref([])
const searchQuery = ref('')


onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/product/getallproduct')
    AllProduct.value = response.data
    console.log('All product = ', AllProduct._rawValue)

  } catch (error) {
    console.error('Error fetching products:', error)
  }
});

// watch(searchQuery, async (newQuery) => {
//    console.log('aaaaaaaaaaaaaaaaa');
//   try {
//     const res = await axios.get('http://localhost:3000/product/getproduct', {
//       params: {
//         q: newQuery // ส่งเป็น ?q=value
//       }
//     })
//     AllProduct.value = res.data
//   } catch (err) {
//     console.error(err)
//   }
// });
const handleSearch = async () => {
  console.log('search= ', searchQuery.value);
  if (!searchQuery.value) {
    const response = await axios.get('http://localhost:3000/product/getallproduct')
    AllProduct.value = response.data
    console.log('noData!!!!')
  }
  else {
    try {
      const res = await axios.get('http://localhost:3000/product/getproduct', {
        params: {
          q: searchQuery.value  // ส่งค่า q ไปกับ query string
        }
      })
      AllProduct.value = res.data
      console.log('All product = ', AllProduct._rawValue)
    } catch (err) {
      console.error('Search failed:', err)
    }

  }

}

</script>

<template>
  <div class="product-container">
    <h2>All Products</h2>
    <div class="search">
      <img :src="searchIcon" width=35 height=35 style="margin-right: 5px;">
      <input type="search" v-model="searchQuery" placeholder="search ex. sku:PROD000, name: anything"
        style="width: 340px;" />
      <button @click="handleSearch">Search</button>
    </div>

    <table class="product-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>SKU</th>
          <th>Category</th>
          <th>Qty</th>
          <th>Unit</th>
          <th>Price</th>
          <th>Add By</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in AllProduct" :key="product.sku">
          <td class="product-name">
            <!-- <img src="@/assets/a.png" alt="product icon" /> -->
            {{ product.name }}
          </td>
          <td>{{ product.sku }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.quantity }}</td>
          <td>{{ product.unit }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.addBy }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.product-container {
  max-width: 900px;
  margin: 2rem auto;
  flex-direction: column;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: aqua;
  justify-content: center;
  align-items: center;
}

.search {
  display: flex;
  justify-content: center;
  background-color: aquamarine;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 1rem;
}

.product-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.1);
  background-color: #fff;
  border: 1px solid #ccc;

  margin-top: 20px;
  /* ขอบตาราง */

}

.product-table thead {
  background-color: #4a90e2;
  color: white;
}

.product-table th,
.product-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  border: 1px solid #ccc;
  /* ขอบทุกเซลล์ */

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
</style>