<script setup>
import { ref, onMounted, reactive } from 'vue'
import axios from 'axios'
import searchIcon from '@/images/icons/search.png'


const AllProduct = ref([])
const searchQuery = ref('')

const activeRow = ref(null) // บอกว่า row ไหนเปิด popover อยู่
const popoverData = reactive({
  amount: 0,
  description: '',
})



onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/product/getallproduct')
    AllProduct.value = response.data
    console.log('All product = ', AllProduct._rawValue)

  } catch (error) {
    console.error('Error fetching products:', error)
  }
});

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

const openPopover = (index) => {
  console.log('Add press')
  activeRow.value = index
  popoverData.amount = 0
  popoverData.description = ''
}

const closePopover = () => {
  activeRow.value = null
}

const submitAdd = async (product) => {
  try {
    const response = await axios.post('http://localhost:3000/product/add', {
      sku: product.sku,
      amount: popoverData.amount,
      description: popoverData.description,
    })
    console.log('Add success:', response.data)
     console.log('response', response.data)

    // อัปเดตใน frontend ทันที
    // product.quantity = response.data.quantity

    closePopover()
  } catch (err) {
    console.error('Error adding:', err)
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
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in AllProduct" :key="index">
          <td>{{ product.name }}</td>
          <td>{{ product.sku }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.quantity }}</td>
          <td>{{ product.unit }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.addBy }}</td>
          <td>
            <button @click="openPopover(index)">ADD</button>
            <button style="margin-left: 10px;">REQ</button>

            <div v-if="activeRow === index" class="popover">
              <label>Amount:</label>
              <input type="number" v-model="popoverData.amount" />

              <label>Description:</label>
              <input type="text" v-model="popoverData.description" />

              <button @click="submitAdd(product)">Submit</button>
              <button @click="closePopover()" style="margin-left: 5px;">Cancel</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.product-container {
  max-width: 900px;
  /* margin: 2rem auto; */
  display: flex;
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
  position: relative;
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

.popover {
  position: absolute;
  top: 100%;
  /* ใต้ปุ่ม */
  left: 1;
  background: #fff;
  border: 1px solid #ddd;
  padding: 10px;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  margin-top: 5px;
}

.popover input {
  display: block;
  margin: 5px 0;
  width: 120px;
}
</style>