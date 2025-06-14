<script setup>
import { ref, onMounted, watch } from 'vue'
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
    addBy: ''
})


onMounted(async () => {
    try {
        const getUser = await axios.get('http://localhost:3000/user/profile', {
            withCredentials: true // send cookies
        })
        User.value = getUser.data
        console.log('User.value = ',  User.value)

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

async function sendData() {
    try {
        const formData = new FormData()
        formData.append('sku', product.value.sku)
        formData.append('name', product.value.name)
        formData.append('category', product.value.category)
        formData.append('quantity', product.value.quantity)
        formData.append('unit', product.value.unit)
        formData.append('price', product.value.price)
        formData.append('addBy', product.value.addBy)

        if (uploadImage.value) {
            formData.append('image', ImagetoStore.value) // 'image' ต้องตรงกับ NestJS FileInterceptor
        }

        const res = await axios.post('http://localhost:3000/product/creat', formData)

        console.log('Upload success', res.data)
        console.log('formData= ', formData)
        alert('Product added successfully!')

        // เคลียร์ฟอร์ม
        // product.value = {
        //     sku: '',
        //     name: '',
        //     category: '',
        //     quantity: '',
        //     unit: '',
        //     price: '',
        //     addBy: ''
        // }
        // DeleteImage()

    } catch (error) {
        console.error('Upload failed:', error)
        alert('Upload failed!')
    }
}

</script>

<template>
    <div class="container">
        <div class="topic">
            ADD Product
            <div style="font-size: small;">Create new product</div>
        </div>

        <div class="add-container">
            <div>
                <label>Product Name</label>
                <div>
                    <input type="text" v-model="product.name" />
                </div>
            </div>

            <div>
                <label>SKU</label>
                <div> <input type="text" v-model="product.sku" /> </div>

            </div>

            <div>
                <label>Category</label>

                <div>
                    <select v-model="product.category">
                        <option disabled value="">select category</option>
                        <option value="Fruit">Fruit</option>
                        <option value="Mobile">Mobile</option>
                    </select>

                </div>
            </div>

            <div> <label>Quantity</label>
                <div>
                    <input type="number" v-model="product.quantity" />
                </div>

            </div>

            <div>
                <label>Unit</label>

                <div>
                    <select v-model="product.unit">
                        <option disabled value="">select unit</option>
                        <option value="kg">kg</option>
                        <option value="pc">pc</option>
                    </select>
                </div>
            </div>

            <div> <label>Price</label>
                <div> <input type="number" step="0.01" v-model="product.price" /> </div>
            </div>

            <div>
                <label>Added By</label>
                <div>
                    <input type="text" v-model="User.name" readonly />
                </div>

            </div>

            <div class="image-upload">
                <label style="margin-left: 50px;">Product Image</label>


                <div v-if="uploadImage" class="area-img">
                    <img :src="uploadImage">
                </div>

                <div v-else="uploadImage" class="area-img" @click="triggerFileInput">
                    <img :src="upload">
                </div>

                <input type="file" ref="fileInput" accept="image/*" @change="onFileChange" hidden />

                <div>
                    <button v-if="uploadImage" @click="DeleteImage"> Delete</button>
                </div>

            </div>

            <div>
                <button v-if="uploadImage" @click="sendData" class="add-button">Submit Product</button>
            </div>

        </div>
    </div>
</template>

<style scoped>
.container {
    /* display: flex; */
    align-items: center;
    justify-content: center;

    background-color: burlywood;
    width: 100%;
    height: 100vh;
    margin-left: 0%;
}

.topic {
    text-align: center;
    background-color: aqua;
    font-size: large;
}

.add-container {
    width: 50%;
    height: auto;
    background-color: white;
    margin: 70px auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    box-sizing: border-box;

    align-items: flex-start;
    /* margin-left: 60px; */
    /* justify-content:flex-start; */
}

.add-container select {
    width: 42vh;
    padding: 8px 12px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #fff;
    color: #333;
    /* appearance: none;  */
    /* ลบ UI default ของบาง browser */
    outline: none;
    transition: border-color 0.3s ease;

    margin-top: 10px;
}

.add-container select:focus {
    border-color: #5f6066;
    /* box-shadow: 0 0 5px rgba(76, 76, 77, 0.5); */
}

.add-container label {
    width: 120px;
    font-weight: bold;
}

.add-container input {
    /* flex: 1; */
    /* padding: 10px; */
    width: 40vh;
    margin-top: 10px;
}

.image-upload {
    position: absolute;
    top: 35vh;
    left: 130vh;

    width: 200px;
    height: 200px;
    align-items: center;
    justify-content: center;

    border-radius: 40px;

    margin-top: 1rem;
    /* background-color: #ebc5c5; */
}

.area-img {

    width: 200px;
    height: 200px;
    border: 2px dashed #aaa;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    /* color: #777; */

    cursor: pointer;
    overflow: hidden;
    position: relative;
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

.image-upload button {
    background-color: red;
    margin-left: 60px;
    margin-top: 5px;
}

.image-upload button:hover {
    color: #dfe23f;
}

.add-button {
    position: absolute;
    top: 80vh;
    left: 126vh;

    background-color: rgb(29, 179, 66);
    margin-left: 60px;
    margin-top: 5px;
}

.add-button:hover {
    border-color: #dfe23f;
    color: #f6ff00;
}
</style>