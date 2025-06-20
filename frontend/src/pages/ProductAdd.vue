<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import axios from 'axios'
import upload from '@/images/icons/upload.png'

const User = ref({});
const product = ref({
    sku: '',
    name: '',
    category: '',
    quantity: '',
    unit: '',
    price: '',
    addedBy: ''
})


const canSubmit = computed(() => {
    return Object.values(product.value).every(value => value !== '')
})

onMounted(async () => {
    try {
        const getUser = await axios.get('http://localhost:3000/user/profile', {
            withCredentials: true // send cookies
        })
        User.value = getUser.data
        console.log('User.name = ', User.value)
        if (User.value.userType === "admin") {
            product.value.addedBy = "admin"
        }
        else {
            product.value.addedBy = `user: ${User.value.name}`;
        }

    } catch (error) {
        console.error('Error fetching products:', error)
    }
});

watch(() => product.value.category, (newCategory) => {
    console.log('category', newCategory);

    if (newCategory === 'Fruit') {
        product.value.unit = 'kg'
    }
    console.log('unit', product.value.unit);
})


const uploadImage = ref(null)
const fileInput = ref(null)
const ImagetoStore = ref(null)


function triggerFileInput() {
    fileInput.value.click()
}

function onFileChange(e) {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
        uploadImage.value = URL.createObjectURL(file)
        ImagetoStore.value = file
    } else {
        uploadImage.value = null
    }
}


function DeleteImage() {
    uploadImage.value = null;
    fileInput.value.value = null
}


async function sendData(canSubmit) {
    if (canSubmit) {
        try {
            const formData = new FormData()
            formData.append('sku', product.value.sku)
            formData.append('name', product.value.name)
            formData.append('category', product.value.category)
            formData.append('quantity', product.value.quantity)
            formData.append('unit', product.value.unit)
            formData.append('price', product.value.price)
            formData.append('addedBy', product.value.addedBy)

            if (uploadImage.value) {
                formData.append('image', ImagetoStore.value) // 'image' ต้องตรงกับ NestJS FileInterceptor
            }

            const res = await axios.post('http://localhost:3000/product/creat', formData)
            console.log('Upload success', res.data)
            console.log('formData= ', formData)
            alert('Product added successfully!!!')

            // product.value = {
            //     sku: '',
            //     name: '',
            //     category: '',
            //     quantity: '',
            //     unit: '',
            //     price: '',
            //     addedBy: ''
            // }
            // DeleteImage()

        } catch (error) {
            console.error('Upload failed:', error)
            alert('Upload failed!')
        }
    }
    else {
        alert('Please fill information!!!')
    }
}

</script>

<template>
    <div class="container">
        <label
            style="position: absolute; top:80px; font-weight: bold; font-size: 30px;text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); ">
            ADD NEW PRODUCT</label>


        <div class="add-container">
            <div class="add-box">
                <label>Product Name</label>
                <input type="text" v-model="product.name" style="width: 95%;" />
            </div>

            <div class="add-box" style="position: absolute; right:70px;">
                <label>SKU</label>
                <input type="text" v-model="product.sku" style="width: 95%;" />
            </div>

            <div class="add-box" style="position: absolute; right:70px; top: 100px;">
                <label>Category</label>
                <select v-model="product.category">
                    <option disabled value="">select category</option>
                    <option value="Fruit">Fruit</option>
                    <option value="Phone">Phone</option>
                </select>
            </div>

            <div class="add-box" style="position: absolute; top:100px;">
                <label>Quantity</label>
                <input type="number" v-model="product.quantity" style="width: 95%;" />
            </div>

            <div
                style=" display: flex;flex-direction: row;justify-content: flex-start;width: 370px; position: absolute;top: 200px;">
                <div style="flex-direction: column; display: flex; height: 100%; width: 50%;">
                    <label>Price</label>
                    <input type="number" step="0.01" v-model="product.price" style="width: 75%;" />
                </div>

                <div style="flex-direction: column; display: flex; height: 100%; width: 50%;">
                    <label>Unit</label>
                    <select v-model="product.unit" style="width: 80%;">
                        <option disabled value="">select unit</option>
                        <option value="kg">kg</option>
                        <option value="pc">pc</option>
                    </select>
                </div>

            </div>

            <div class="add-box" style="position: absolute;top: 300px;">
                <label>Added By</label>
                <input type="text" v-model="product.addedBy" style="width: 95%;" />
            </div>

            <div class="add-box" style="position: absolute;top: 200px; right: 75px;">
                <label>Product Image</label>
                <div v-if="uploadImage" class="area-img">
                    <img :src="uploadImage">
                </div>

                <div v-else="uploadImage" class="area-img" @click="triggerFileInput">
                    <img :src="upload">
                </div>

                <input type="file" ref="fileInput" accept="image/*" @change="onFileChange" hidden />



            </div>

            <div>
                <button v-if="uploadImage" @click="DeleteImage"
                    style="position: absolute; bottom: 130px; right: 80px; background-color: red;"> Delete Img</button>
            </div>

            <div>
                <button @click="sendData(canSubmit)" class="add-button">Submit Product</button>
            </div>

        </div>
    </div>
</template>

<style scoped>
.add-box {
    /* background-color: aquamarine; */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 370px;
    position: relative;
}

.container {
    position: relative;
    align-items: center;
    justify-content: center;
    display: flex;

    /* background-color: rgb(255, 163, 43); */
    /* width: 100%; */
    height: 100vh;
    margin-left: 0%;
}

.topic {
    text-align: center;
    background-color: aqua;
    font-size: large;
}

.add-container {
    position: relative;
    width: 110vh;
    height: 55vh;
    /* background-color: rgb(255, 4, 4); */
    padding: 20px;
    gap: 15px;
    border-radius: 10px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    /* border: 2px solid #c6c6c6; */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);

}

.add-container select {
    width: 50vh;
    padding: 8px 12px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #fff;
    color: #333;
    outline: none;
    transition: border-color 0.3s ease;
    margin-top: 10px;
}


.add-container label {
    width: 120px;
    font-weight: bold;
}

.add-container input {
  font-size: 17px;
  width: 40vh;
  margin-top: 10px;
  height: 35px; /* สูงขึ้นหน่อย */
  padding: 0 12px; /* เว้นขอบด้านใน */
  border-radius: 8px; /* มุมโค้งนุ่มกว่า */
  border: 1px solid #ccc; /* สีขอบเทาอ่อน */
  outline: none;
  transition: all 0.2s ease; 
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* เงาเบาๆ */
}

.add-container input:focus {
  border-color: #000000; /* สีฟ้าตอนโฟกัส */
  box-shadow: 0 0 0 3px rgba(71, 149, 217, 0.2); /* เงาสีฟ้าอ่อน */
}


.area-img {
    position: absolute;
    left: 25%;
    width: 150px;
    height: 150px;
    border: 2px dashed #aaa;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    cursor: pointer;
    overflow: hidden;
    transition: border-color 0.3s ease;
    background-color: #f2f2f2df;
}

.area-img:hover {
    border-color: #007BFF;
    color: #007BFF;
}

.area-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;

}

.add-button {
    position: absolute;
    bottom: 5px;
    right: 45%;
    background-color: rgb(29, 179, 66);
    margin-left: 60px;
    margin-top: 5px;
}
</style>