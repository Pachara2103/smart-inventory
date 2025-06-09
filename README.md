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

<div> โครงสร้าง 
   <div> smart-inventory</div>

   <div>
  📦 smart-inventory-system/
├── frontend/          # Vue.js
├── backend/       # NestJS
├── helm-chart/        # if needed
├── terraform/         # if needed
├── docker-compose.yml 
└── README.md
  </div>

   <div> Frontend
   <div>   
├── views/
│   ├── LoginView.vue
│   ├── DashboardView.vue
│   ├── ProductsView.vue
│   └── TransactionsView.vue
├── components/
│   └── ProductForm.vue
├── router/
│   └── index.ts
├── stores/
│   └── userStore.ts
└── services/
    └── api.ts (axios instance)
    
    </div> 
    Backend
   <div> 

├── auth/          # ระบบ auth, JWT
├── users/         # ผู้ใช้งาน
├── products/      # สินค้า
├── transactions/  # ประวัติการเบิก/เพิ่ม
├── common/        # Guard, Interceptor, DTO แชร์
├── app.module.ts

   </div>
   </div>



</div>