<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import { Pie } from 'vue-chartjs'
import {
  Chart,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'
Chart.register(Title, Tooltip, Legend, ArcElement)

const AllProduct = ref([])
const sortdate = ref(true);
const chartData = ref({
  labels: [],
  datasets: [
    {
      label: 'Quantity',
      data: [],
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
})


onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/product/getallproduct')
    AllProduct.value = response.data
    console.log('All product = ', AllProduct._rawValue)

    chartData.value.labels = AllProduct.value.map(p => p.name)
    chartData.value.datasets[0].data = AllProduct.value.map(p => parseFloat(p.quantity))

    console.log('chartData = ', chartData)


  } catch (error) {
    console.error('Error fetching products:', error)
  }
});
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
  const response = await axios.get('http://localhost:3000/product/sortproduct', {
    params: { sortdate: sortdate.value }
  })
  AllProduct.value = response.data
}



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

      <div class="circle-graph">
        <div style="width: 90%; height: 90%; position: relative;">
          <label>Product detail</label>
          <!-- ✅ แสดง Pie เมื่อข้อมูลมีจริง -->
          <Pie v-if="chartData.labels.length > 0 && chartData.datasets[0].data.length > 0" :data="chartData"
            :options="chartOptions" />
          <p v-else>Loading chart...</p>
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
  background-color: white;
  width: 30%;
  height: 40vh;
  overflow-y: auto;
}

.circle-graph {
  background-color: rgb(250, 220, 220);
  width: 30%;
  height: 40vh;

  padding: 20px;
  /* กันไม่ให้ chart ชิดขอบ */
  box-sizing: border-box;
  /* overflow-y: auto; */
  /* margin: auto; */
}

.product-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.product-table th,
.product-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
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
</style>