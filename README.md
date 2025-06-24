<p align="center">
 My Plan
</p>
<li>ศึกษาวิธีการใช้ Nestjs and Vue </li>
<li>ออกเเบบโครงสร้างต่างๆของ project </li>
<li>สร้าง frontend, backend</li>
<li>ศึกษา + ทำ Dockerize ทั้งระบบ & Deploy บน K8s * </li>
<li>เขียน Helm + Terraform *</li>
<li>*= ถ้าไหว</li>

#ศึกษาวิธีทำ Login register with Nestjs & using mongo  from Youtube Channel  testing API by using postman
#ศึกษาการใช้ vue frontend

โครงสร้างระบบ (Vue + NestJS + MongoDB)
Frontend (Vue.js)
 -Login Page	    เข้าสู่ระบบด้วย username/password
 -Dashboard	        สรุปจำนวนสินค้า, กราฟสต็อก
 -Product List	    ดูรายการสินค้า, กดดูรายละเอียด
 -Add/Edit Product	เพิ่มหรือแก้ไขข้อมูลสินค้า
 -Stock Movement	บันทึกการเติม/เบิกสินค้า
 -Movement History	ดูประวัติการเคลื่อนไหวของสินค้า
 -User Management 	จัดการบัญชีพนักงาน(เฉพาะ Admin)
 -Profile / Logout	ข้อมูลส่วนตัว

Backend (NestJS)
auth	    /auth/login	        เข้าสู่ระบบ
users	    /users	            จัดการผู้ใช้ (admin-only)
products    /products	        CRUD สินค้า
stock	    /stock/add,remove	เติม/เบิกสินค้า
history	    /history	        ดูประวัติ stock movement
dashboard	/dashboard/summary	แสดงจำนวนสินค้า, ยอดรวม

MongoDB
- users
  - _id
  - username
  - passwordHash
  - role: 'admin' | 'staff'

- products 
  - sku : unique ex.PT001
  - name + picture
  - category 
  - quantity
  - unit : kg, pieace
  - price
  - add by
  + edit, delete
  ///add time, expire

- stock_movements
  - _id
  - product_id
  - type: 'add' | 'remove'
  - amount
  - note
  - created_by
  - created_at


Frontend
src/
├── components/
├── pages/
│   ├── Login.vue
│   ├── Dashboard.vue
│   ├── Product.vue
│   ├── AddProduct.vue
│   ├── StockMovement.vue
│   ├── History.vue
│   └── UserManagement.vue
├── router/
├── store/
├── services/  # เรียก API
└── App.vue

Backend
src/
├── auth/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── jwt.strategy.ts
├── users/
├── products/
├── stock/
├── history/
├── dashboard/
├── common/  # guards, interceptors, decorators
├── app.module.ts
└── main.ts

## About The Project

This is my first pesonal project using Nest.js, Vue.js and terraform and this project is made for practicing in Nest.js, Vue.js and terraform.

This project เกี่ยวกับ



