<script setup>
import { ref, onMounted, reactive, computed } from 'vue'
import axios from 'axios'
import searchIcon from '@/images/icons/search.png'


const AllProduct = ref([])
const searchValue = ref('')
const searchType = ref('name')

const User = ref({});

const currentIndex = ref(null)
const isAdd = ref(null)
const actionData = reactive({
  amount: 0,
  description: '',
})



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
    const response = await axios.get('http://localhost:3000/product/getallproduct')
    AllProduct.value = response.data
    console.log('All product = ', AllProduct._rawValue)

  } catch (error) {
    console.error('Error fetching products:', error)
  }
});

const handleSearch = async () => {
  currentPage.value = 1;
  console.log('search= ', searchValue.value);
  if (!searchValue.value) {
    const response = await axios.get('http://localhost:3000/product/getallproduct')
    AllProduct.value = response.data
    console.log('noData!!!!')
  }
  else {
    try {
      const res = await axios.get('http://localhost:3000/product/getproduct', {
        params: {
          value: searchValue.value,
          type: searchType.value

        }
      })
      AllProduct.value = res.data
      console.log('All product = ', AllProduct._rawValue)
    } catch (err) {
      console.error('Search failed:', err)
    }

  }

}

const openAction = (index, value) => {
  console.log('press', value)
  currentIndex.value = index
  isAdd.value = value === 'add' ? true : false
  actionData.amount = 0
  actionData.description = ''
}

const closeAction = () => {
  isAdd.value = null
  currentIndex.value = null
}

const submitAdd = async (product) => {
  try {
    const response = await axios.post('http://localhost:3000/product/add', {
      sku: product.sku,
      amount: actionData.amount,
      description: actionData.description,
      user: User.value.name
    })
    console.log('Add success:', response.data)
    alert("Add success!");
    window.location.reload();

    closeAction()
  } catch (err) {
    console.error('Error adding:', err)
  }
}

const submitReq = async (product) => {
  try {
    const response = await axios.post('http://localhost:3000/product/req', {
      sku: product.sku,
      amount: actionData.amount,
      description: actionData.description,
      user: User.value.name
    })
    console.log('Req success:', response.data)
    alert("Req success!");
    window.location.reload();

    closeAction()
  } catch (err) {
    console.error('Error adding:', err)
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
    <label style="font-size: 30px; padding-bottom: 20px; font-weight: bold;">ALL PRODUCTS</label>

    <RouterLink to="/Product/Add" class="tab-box">
      <div style="cursor: pointer; position: relative; width: 100%; height: 100%;">
        <label style="cursor: pointer; font-size:30px; position: absolute; left: 0; bottom: 2px;">+</label>
        <label style="cursor: pointer; font-size:16px; position: absolute; left: 22px; top: 6px;">Add New
          Product</label>

      </div>

    </RouterLink>

    <div class="search">
      <img :src="searchIcon" width=40 height=40 style="margin-right: 5px;">
      <select v-model="searchType" style="  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
">
        <option value="name">Name</option>
        <option value="sku">Sku</option>
        <option value="category">Category</option>
      </select>
      <input type="search" v-model="searchValue" placeholder="Search..." style="width: 340px; border-radius: 5px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); border: none; outline: none;" @keyup.enter="handleSearch" />
      <button @click="handleSearch" style="box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); width: auto;">Enter</button>
    </div>

    <table class="product-table" >
      <thead>
        <tr>
          <th>Product</th>
          <th>SKU</th>
          <th>Category</th>
          <th>Quantity</th>
          <th>Unit</th>
          <th>Price</th>
          <th>Added By</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in pageProduct" :key="index">
          <td style="width: 180px;">
            <div style="flex-direction: row; display: flex; justify-content: flex-start; align-items: center; gap: 10px;">

              <div style="width: 50px; height: 50px;">
                <img :src="`http://localhost:3000/images/${product.sku}.png`" style="width: 100%; height: 100%;">
              </div>

              {{ product.name }}

            </div>

          </td>
          <td style="width: 100px;">{{ product.sku }}</td>
          <td style="width: 100px;">{{ product.category }}</td>
          <td style="width: 100px;">{{ product.quantity }}</td>
          <td style="width: 100px;">{{ product.unit }}</td>
          <td style="width: 100px;">{{ product.price }}</td>
          <td style="width: 100px;">{{ product.addedBy }}</td>
          <td style="width: 180px;">
            <button @click="openAction(index, 'add')"
              :style="{ background: currentIndex === index && isAdd === true ? '#02be1c' : '', width:'auto' }">ADD</button>
            <button @click="openAction(index, 'req')"
              :style="{ background: currentIndex === index && isAdd === false ? '#02be1c' : '', marginLeft: '10px' , width:'auto' }">REQ</button>


            <div v-if="isAdd === true && currentIndex === index" class="popover">
              <div style="position: relative; flex-direction: row;">
                <label style="margin-bottom: 10px;"> Add </label>
                <label style="margin-bottom: 10px; color: #28b463">{{ product.name }}</label>
              </div>
              <label>Amount:</label>
              <input type="number" v-model="actionData.amount" />

              <label>Description:</label>
              <input type="text" v-model="actionData.description" />

              <div style="padding-top: 10px;">
                <button @click="submitAdd(product)" style="width: auto;">Submit</button>
                <button @click="closeAction()" style="margin-left: 5px; width: auto;">Cancel</button>
              </div>

            </div>

            <div v-if="isAdd === false && currentIndex === index" class="popover">
              <div style="position: relative; flex-direction: row;">
                <label style="margin-bottom: 10px;"> Req </label>
                <label style="margin-bottom: 10px; color: #28b463">{{ product.name }}</label>
              </div>
              <label>Amount:</label>
              <input type="number" v-model="actionData.amount" />

              <label>Description:</label>
              <input type="text" v-model="actionData.description" />


              <div style="padding-top: 10px;">
                <button @click="submitReq(product)" style="width: auto;">Submit</button>
                <button @click="closeAction()" style="margin-left: 5px; width: auto;">Cancel</button>
              </div>

            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div style="margin-top: 20px; position: absolute; bottom: 0px; width: auto; justify-content: center; display: flex; align-items: center;">
      <button v-for="page in totalPages" :key="page" @click="goToPage(page)"
        :style="{ marginRight: '5px', background: page === currentPage ? '#FF6F3C' : '#999999'}" style="width: 35px; justify-content: center; align-items: center; display: flex;">
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
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  /* background-color: #ccc; */
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
  /* border-bottom: 1px solid #ddd; */
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
  top: 70px;
  left: 0;
  width: 180px;
  border: 2px solid #dedede;
  padding: 15px;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  flex-direction: column;
  align-items: center;
  display: flex;

  background-color: rgb(255, 255, 255);
}

.popover input {
  display: block;
  margin: 5px 0;
  width: 150px;
  height: 30px;
  border-radius: 5px;
  outline: none;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  font-size: 15px;

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
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

  color: rgb(255, 255, 255);
  text-decoration: none;
  cursor: pointer;
}

.tab-box:hover {
  background-color: #d18100;
}
</style>