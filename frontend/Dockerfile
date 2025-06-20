# ใช้ Node base image สำหรับ build และ serve
FROM node:20-alpine

# สร้าง working directory
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json ก่อน
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกโค้ดทั้งหมด
COPY . .

# สร้างไฟล์ production (static)
RUN npm run build

# ติดตั้ง serve สำหรับเสิร์ฟไฟล์ build
RUN npm install -g serve

# กำหนดพอร์ต
EXPOSE 80

# สั่ง serve ไฟล์ build
CMD ["serve", "-s", "dist", "-l", "80"]
