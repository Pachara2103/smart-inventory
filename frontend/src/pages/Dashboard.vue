<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import axios from 'axios'
import { Pie, Bar } from 'vue-chartjs'
import group from '@/images/icons/group.png'
import categoryIcon from '@/images/icons/grid.png'
import saleIcon from '@/images/icons/sales.png'
import productIcon from '@/images/icons/box.png'
import { Chart, Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale, Colors } from 'chart.js'
// import ChartDataLabels from 'chartjs-plugin-datalabels'

Chart.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale)

const AllProduct = ref([])
const AllHProduct = ref([])
const ProductByCategory = ref([])
const category = ref('Fruit')
const sale = ref([])

const sortby = ref("date")
const asc = ref(true)
const allProduct = ref(0)
const allUser = ref(0)
const allCategory = ref(0)
const allSale = ref(0)


onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/product/getallrecenlyaddedproduct')
    const totalCategory = await axios.get('http://localhost:3000/product/getallcategory')
    const totalUser = await axios.get('http://localhost:3000/user/getalluser')
    // ProductByCategory.value = response.data
    SelectCategory()
    AllProduct.value = response.data
    console.log(' AllProduct.value= ', AllProduct.value)

    allProduct.value = AllProduct.value.length
    allUser.value = totalUser.data
    allCategory.value = totalCategory.data


  } catch (error) {
    console.error('Error fetching products:', error)
  }

  try {
    const response = await axios.get('http://localhost:3000/product/sale')
    const AllSale = await axios.get('http://localhost:3000/product/allsale')
    // ProductByCategory.value = response.data
    sale.value = response.data
    allSale.value = AllSale.data

  } catch (error) {
    console.error('Error fetching sale:', error)
  }

  try {
    const response = await axios.get('http://localhost:3000/product/getallhistory')
    AllHProduct.value = response.data
    console.log('All product in history = ', AllHProduct._rawValue)

  } catch (error) {
    console.error('Error fetching products:', error)
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
    }

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
      asc: asc.value === true ? "true" : "false"
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
const SaleSelectCategory = async () => {
  const response = await axios.get('http://localhost:3000/product/sale/selectcategory', {
    params: {
      category: saleCategory.value
    }
  })
  sale.value = response.data
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
const saleCategory = ref('All')
watch(() => saleCategory.value, () => {
  SaleSelectCategory()
})



watch([sortby, asc], () => {
  sortType()
  console.log('call sortType', 'asc= ', asc._rawValue, sortby._rawValue)
})

const HProduct = computed(() => {
  return AllHProduct.value.slice(0, 10);
});

const Product = computed(() => {
  return AllProduct.value.slice(0, 10);
});



</script>

<template>
  <div class="container">
    <div class="col1">
      <div>
        <div style="width: 250px;height:80px; background-color:white; border-radius: 10px; position: relative;   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
">
          <img :src="group" width="50" height="50" style="position: absolute; right: 25px;">

          <div
            style="flex-direction: column; background-color: white; width: 100px; height: 40px; position: absolute; left: 40px;">
            <label style="text-align: left;"> {{ allUser }}</label>
            <label> Total User</label>
          </div>
        </div>
      </div>

      <div>
        <div style="width: 250px;height:80px; background-color:white; border-radius: 10px; position: relative;   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
">
          <img :src="categoryIcon" width="50" height="50" style="position: absolute; right: 25px;">

          <div
            style="flex-direction: column; background-color: white; width: 110px; height: 40px; position: absolute; left: 40px;">
            <label style="text-align: left;"> {{ allCategory }} </label>
            <label> Total Category</label>
          </div>
        </div>
      </div>

      <div>
        <div style="width: 250px;height:80px; background-color:white; border-radius: 10px; position: relative;   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
">
          <img :src="saleIcon" width="50" height="50" style="position: absolute; right: 25px;">
          <div
            style="flex-direction: column; background-color: white; width: 110px; height: 40px; position: absolute; left: 40px;">
            <label style="text-align: left;">{{ allSale }}</label>
            <label> Total Sales</label>
          </div>
        </div>
      </div>

      <div>
        <div style="width: 250px;height:80px; background-color:white; border-radius: 10px; position: relative;  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
">
          <img :src="productIcon" width="50" height="50" style="position: absolute; right: 25px;">

          <div
            style="flex-direction: column; background-color: white; width: 110px; height: 40px; position: absolute; left: 40px;">
            <label style="text-align: left;"> {{ allProduct }} </label>
            <label> Total Product</label>
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

        <select v-model="saleCategory" class="select">
          <option value="All">All Category</option>
          <option value="Fruit">Fruit</option>
          <option value="Phone">Phone</option>
        </select>

      </div>

      <div class="circle-graph">
        <label style="position: absolute; top: 10px; font-weight: bold;"> Remaining Products</label>
        <div style="width: 80%; height: 80%; padding-top: 20px;">
          <Pie :data="chartData" :options="chartOptions"  />
        </div>

        <select v-model="category" class="select">
          <option disabled value="">category</option>
          <option value="Fruit">Fruit</option>
          <option value="Phone">Phone</option>
        </select>


      </div>


    </div>
    <div class="col3">
      <div class="added">
        <label style=" font-weight: bold; margin-bottom: 8px;">Recently Added Product</label>
        <div class="table-header">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Product</th>
                <th>Sku</th>
                <th>Price</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(product, index) in Product" :key="product._id">
                <td>{{ index + 1 }}</td>
                <td>
                  <div
                    style="flex-direction: row; display: flex; justify-content: center; align-items: center; gap: 10px;">

                    <div style="width: 30px; height: 30px;">
                      <img :src="`http://localhost:3000/images/${product.sku}.png`" style="width: 100%; height: 100%;">
                    </div>

                    {{ product.name }}

                  </div>

                </td>
                <td>{{ product.sku }}</td>
                <td>{{ product.price }}</td>
              </tr>
            </tbody>

          </table>
        </div>
      </div>

      <div class="action">
        <label style=" font-weight: bold; margin-bottom: 8px;">Recently Action</label>
        <div class="table-header">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Action</th>
                <th>User</th>
                <th>Description</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(product, index) in HProduct" :key="product._id">
                <td style="width: 30px;">{{ index + 1 }}</td>
                <td style="width: 150px;">
                  <div
                    style="flex-direction: row; display: flex; justify-content: flex-start; align-items: center; gap: 10px;">

                    <div style="width: 30px; height: 30px;">
                      <img :src="`http://localhost:3000/images/${product.sku}.png`" style="width: 100%; height: 100%;">
                    </div>

                    {{ product.name }}

                  </div>

                </td>

                <td style="width: 80px;">{{ product.quantity }}</td>
                <td style="width: 80px;">{{ product.unit }}</td>

                <td style="width: 80px;">{{ product.action }}</td>
                <td style="width: 150px;">admin</td>
                <td style="width: 250px;">{{ product.description }}</td>
              </tr>
            </tbody>

          </table>
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
  /* background-color: rgb(220, 251, 251); */
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
  width: 100%;
  height: auto;
  justify-content: center;
  display: flex;
  gap: 30px;

}

.added {
  position: relative;
  background: white;
  width: 30%;
  height: 50vh;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.action {
  position: relative;
  background: white;
  width: 60%;
  height: 50vh;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
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
  background: #4297ff;
  color: #ffffff;
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
  /* border: 2px solid #d8d7d7; */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

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
  /* border: 2px solid #d8d7d7; */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);


}

.select {
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