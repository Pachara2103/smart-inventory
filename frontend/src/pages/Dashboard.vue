<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import axios from 'axios'
import { Pie , Bar} from 'vue-chartjs'

import {
  Chart,
  Title,
  Tooltip,
  Legend,
  ArcElement,

  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
Chart.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale)

const AllProduct = ref([])

const ProductByCategory = ref([])
const category = ref('Fruit')

const sale = ref([])

const saleChart = computed(() => ({
  labels: sale.value.map(s => s.name),
  datasets: [
    {
      label: 'Quantity Sold',
      backgroundColor: '#42b983',
      data: sale.value.map(s => s.quantity)
    }
  ]
}))

const saleChartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: {
      display: true,
      text: 'Sales Column Chart'
    }
  }
}


const sortdate = ref(true);

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
      label: 'Quantity',
      data: ProductByCategory.value.map(p => parseFloat(p.quantity)),
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#2ecc71',
        '#9b59b6',
        '#f39c12',
      ],
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
        padding: 20,  // ระยะห่างระหว่างแต่ละอัน
        color: '#333', // สีข้อความ legend
        font: {
          size: 14, // ขนาด font
          family: "'Segoe UI', sans-serif"
        }
      }
    },
    tooltip: {
      enabled: true,
      backgroundColor: '#333',
      titleColor: '#fff',
      bodyColor: '#fff',
      padding: 10
    },
    title: {
      display: false
    }
  }
})


const sortbydate = async () => {
  sortdate.value = !sortdate.value;
  console.log('press sort button= ', sortdate.value)
  const response = await axios.get('http://localhost:3000/product/sortproduct', {
    params: { sortdate: sortdate.value }
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

watch(() => category.value, () => {
  SelectCategory()
  console.log('call select category')
})



</script>

<template>
  <div class="container">
    Dashboasrd
    <div class="col1">
      <div>

      </div>


    </div>

    <div class="col2">
      <div class="added">
        <label> Recently Added Product</label>


        <table class="product-table">
          <thead>
            <tr>
              <th>No</th>
              <th>SKU</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
        </table>

        <div
          style=" height: 30vh; overflow-y: auto; ::-webkit-scrollbar{display: none;}   scrollbar-width: none; -ms-overflow-style: none; ">
          <table class="product-table">
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


        <div style="position: absolute; top:0; right: 0;">
          <button @click="sortbydate()"> sortbydate</button>
          <label v-if="sortdate"> true</label>
          <label v-else> false</label>

        </div>




      </div>

      <div class="circle-graph">
        <div style="width: 90%; height: 90%; position: relative;">
          <label>Product detail</label>
          <!-- ✅ แสดง Pie เมื่อข้อมูลมีจริง -->
          <Pie v-if="chartData.labels.length > 0 && chartData.datasets[0].data.length > 0" :data="chartData"
            :options="chartOptions" />
          <p v-else>Loading chart...</p>
        </div>

        <select v-model="category">
          <option disabled value="">category</option>
          <option value="Fruit">Fruit</option>
          <option value="Mobile">Mobile</option>
        </select>


      </div>

      <div class="sale">

        <div style="width: 90%; height: 90%; position: relative;">
          <label>detail</label>
          <Bar :data="saleChart" :options="saleChartOptions" />
        </div>

      </div>



    </div>
    <div class="col3">

    </div>

  </div>

</template>

<style scoped>
.container {

  display: flex;

  flex-direction: column;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: rgb(220, 251, 251);

  align-items: center;
  margin-left: 0;
}

.col1 {
  background-color: burlywood;
  width: 100%;
  height: 20vh;
}

.col2 {
  background-color: rgb(218, 100, 162);
  width: 100%;
  height: auto;

  flex-direction: row;
  display: flex;
}

.col3 {
  background-color: rgb(109, 212, 80);
  width: 100%;
  height: 20vh;
}

.added {
  position: relative;
  background-color: white;
  width: 30%;
  height: 40vh;
}

.circle-graph {
  position: relative;
  background-color: rgb(250, 220, 220);
  width: 30%;
  height: 40vh;

  padding: 20px;
  /* กันไม่ให้ chart ชิดขอบ */
  box-sizing: border-box;
  /* overflow-y: auto; */
  /* margin: auto; */
}

.sale {
  position: relative;

  background-color: rgb(255, 255, 255);
  width: 30%;
  height: 40vh;
  padding: 20px;

}

.product-table {
  width: 100%;
  border-collapse: collapse;
  /* margin-top: 20px; */
  /* table-layout: fixed;  */
}

.product-table::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari */
}

.product-table th {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.product-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.product-table th {
  background-color: #f2f2f2;
}

.product-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.product-table tr:hover {
  background-color: #e6f7ff;
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