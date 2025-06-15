<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import axios from 'axios'
import { Pie, Bar } from 'vue-chartjs'
import group from '@/images/icons/group.png'
import categoryIcon from '@/images/icons/grid.png'
import saleIcon from '@/images/icons/sales.png'
import productIcon from '@/images/icons/box.png'
import { Chart, Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale, Colors } from 'chart.js'
Chart.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale)

const AllProduct = ref([])
const ProductByCategory = ref([])
const category = ref('Fruit')
const sale = ref([])

const sortby = ref("date")
const asc = ref(true)

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/product/getallproduct')
    // ProductByCategory.value = response.data
    SelectCategory()
    AllProduct.value = response.data

  } catch (error) {
    console.error('Error fetching products:', error)
  }

  try {
    const response = await axios.get('http://localhost:3000/product/sale')
    // ProductByCategory.value = response.data
    sale.value = response.data
    console.error('sale:', sale.value)

  } catch (error) {
    console.error('Error fetching sale:', error)
  }
});
const chartData = computed(() => ({
  labels: ProductByCategory.value.map(p => p.name),
  datasets: [
    {
      data: ProductByCategory.value.map(p => parseFloat(p.quantity)),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#2ecc71', '#9b59b6', '#f39c12'],
    },
  ],
}));

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right', // ✅ legend ไปขวา
      labels: {
        boxWidth: 20, // กล่องสีเล็กลง
        padding: 10,  // ระยะห่างระหว่างแต่ละอัน
        color: '#333', // สีข้อความ side box
        font: {
          size: 14, // ขนาด font
        }
      }
    },
  }
})

const saleChart = computed(() => ({
  labels: sale.value.map(s => s.name),
  datasets: [
    {
      label: 'Quantity Sold',
      backgroundColor: '#42b983',
      data: sale.value.map(s => s.quantity),
      font: { size: 100 },
    }
  ]
}))

const saleChartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'right', labels: { font: { size: 14 } }, },
    title: { display: false }
  },
  layout: {
    padding: {
      top: 50,
      bottom: 10,
    },
  }
}

const sortType = async () => {
  const response = await axios.get('http://localhost:3000/product/sortproduct', {
    params: {
      sortType: sortby.value,
      asc: asc.value===true?  "true":"false"
    }
  })
  AllProduct.value = response.data
}

const SelectCategory = async () => {
  console.log('select category= ', category.value)
  const response = await axios.get('http://localhost:3000/product/selectcategory', {
    params: {
      category: category.value
    }
  })
  ProductByCategory.value = response.data
  console.log('ProductByCategory.value= ', ProductByCategory.value)
}

const pressUp = (value) => {
  asc.value = value
  // console.log('press up')
}

watch(() => category.value, () => {
  SelectCategory()
  console.log('call select category')
})

watch([sortby, asc], () => {
  sortType()
  console.log('call sortType', 'asc= ', asc._rawValue, sortby._rawValue)
})



</script>

<template>
  <div class="container">
    <div class="col1">
      <div>
        <div style="width: 250px;height:80px; background-color:white; border-radius: 10px; position: relative;">
          <img :src="group" width="50" height="50" style="position: absolute; right: 25px;">

          <div
            style="flex-direction: column; background-color: white; width: 100px; height: 40px; position: absolute; left: 40px;">
            <label style="text-align: left;"> 100 </label>
            <label> Total User</label>
          </div>
        </div>
      </div>

      <div>
        <div style="width: 250px;height:80px; background-color:white; border-radius: 10px; position: relative;">
          <img :src="categoryIcon" width="50" height="50" style="position: absolute; right: 25px;">

          <div
            style="flex-direction: column; background-color: white; width: 110px; height: 40px; position: absolute; left: 40px;">
            <label style="text-align: left;"> 100 </label>
            <label> Total Category</label>
          </div>
        </div>
      </div>

      <div>
        <div style="width: 250px;height:80px; background-color:white; border-radius: 10px; position: relative;">
          <img :src="saleIcon" width="50" height="50" style="position: absolute; right: 25px;">
          <div
            style="flex-direction: column; background-color: white; width: 110px; height: 40px; position: absolute; left: 40px;">
            <label style="text-align: left;"> 100 </label>
            <label> Total Category</label>
          </div>
        </div>
      </div>

      <div>
        <div style="width: 250px;height:80px; background-color:white; border-radius: 10px; position: relative;">
          <img :src="productIcon" width="50" height="50" style="position: absolute; right: 25px;">

          <div
            style="flex-direction: column; background-color: white; width: 110px; height: 40px; position: absolute; left: 40px;">
            <label style="text-align: left;"> 100 </label>
            <label> Total Category</label>
          </div>
        </div>
      </div>


    </div>

    <div class="col2">

      <div class="sale">
        <label style="position: absolute; top: 10px; font-weight: bold;"> Sales Report</label>

        <div style="width: 100%; height: 100%;  display: flex;justify-content: center; align-items: center;">
          <Bar :data="saleChart" :options="saleChartOptions" />
        </div>

      </div>

      <div class="circle-graph">
        <label style="position: absolute; top: 10px; font-weight: bold;"> Detail</label>
        <div style="width: 80%; height: 80%; padding-top: 20px;">
          <Pie :data="chartData" :options="chartOptions" />
        </div>

        <select v-model="category">
          <option disabled value="">category</option>
          <option value="Fruit">Fruit</option>
          <option value="Mobile">Mobile</option>
        </select>


      </div>


    </div>
    <div class="col3">
      <div class="added">
        <label>Recently Added Product</label>
        <div class="table-header">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>SKU</th>
                <th>Name</th>
                <th>Price</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(product, index) in AllProduct" :key="product._id">
                <td>{{ index + 1 }}</td>
                <td>{{ product.sku }}</td>
                <td>{{ product.name }}</td>
                <td>{{ product.price }}</td>
              </tr>
            </tbody>

          </table>
        </div>

        <div
          style="position: absolute;top: 10px;right: 10px; width: 150px; height: 20px; flex-direction: row; display: flex;">
          <!-- <label style="margin-right: 50px;"> Sort By</label> -->
          <svg @click="pressUp(true)" :style="{ fill: asc === true ? 'green' : 'black', cursor: 'pointer' }"
            viewBox="0 0 25 25">
            <path xmlns="http://www.w3.org/2000/svg"
              d="M10,24c-1.66,0-3-1.34-3-3V13h-1.92c-1.17,0-2.29-.62-2.8-1.67-.57-1.18-.34-2.51,.57-3.43L9.17,1.18c1.57-1.57,4.09-1.57,5.64-.02,0,0,6.37,6.77,6.37,6.77,.85,.84,1.1,2.09,.63,3.22-.47,1.13-1.52,1.84-2.74,1.85h-2.06v8c0,1.66-1.34,3-3,3h-4Z" />
          </svg>
          <svg @click="pressUp(false)" :style="{ fill: asc === true ? 'black' : 'green', cursor: 'pointer' }"
            viewBox="0 0 25 25">
            <path xmlns="http://www.w3.org/2000/svg"
              d="M12,24c-1.02,0-2.03-.39-2.81-1.16l-6.37-6.77c-.85-.85-1.1-2.09-.63-3.22,.47-1.13,1.52-1.84,2.75-1.85h2.06V3c0-1.65,1.35-3,3-3h4c1.65,0,3,1.35,3,3V11h2.06c1.23,0,2.28,.71,2.75,1.85,.47,1.13,.22,2.38-.65,3.24,0,0-6.34,6.74-6.35,6.75-.77,.77-1.79,1.16-2.81,1.16Z" />
          </svg>

          <select v-model="sortby" style="text-align: center; margin-left: 20px;">
            <option disabled value="">sort type</option>
            <option value="date">Date</option>
            <option value="name">Name</option>
            <option value="sku">Sku</option>
            <option value="price">Price</option>

          </select>
        </div>
      </div>
    </div>


  </div>

</template>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgb(220, 251, 251);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin-left: 0;
}

.col1 {
  width: 100%;
  height: 15vh;
  flex-direction: row;
  display: flex;
  justify-content: center;
}

.col1 div {
  display: flex;
  width: 25%;
  justify-content: center;
  align-items: center;

}

.col2 {
  width: 100%;
  height: auto;
  flex-direction: row;
  display: flex;
  justify-content: center;

  gap: 40px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.col3 {
  background-color: rgb(109, 212, 80);
  width: 100%;
  height: auto;

  justify-content: center;
  display: flex;

}

.added {
  position: relative;
  background: white;
  width: 30%;
  height: 35vh;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.added label {
  font-weight: bold;
  margin-bottom: 8px;
}

.table-header {
  flex: 1 1 auto;
  overflow-y: auto;
}

.table-header table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
}

.table-header th,
.table-header td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

/* ทำหัวตาราง sticky */
.table-header thead th {
  position: sticky;
  top: 0;
  background: #f0f0f0;
  z-index: 1;
}

/* ซ่อน scrollbar ถ้าต้องการ */
.table-header::-webkit-scrollbar {
  display: none;
}

.table-header {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.circle-graph {
  position: relative;
  background-color: white;
  width: 30%;
  height: 40vh;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  border: 2px solid #d8d7d7;
}

.sale {
  position: relative;
  background-color: white;
  width: 60%;
  height: 40vh;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  border: 2px solid #d8d7d7;

}

.circle-graph select {
  width: auto;
  padding: 5px 5px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  position: absolute;
  top: 10px;
  right: 10px;

  /* margin-top: 10px; */
}
</style>