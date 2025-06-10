<template>
  <div class="scroll-container">
    <div class="content">
      <!-- ข้อมูลข้างในล้น ๆ เพื่อให้เลื่อนดูได้ -->
      <p v-for="i in 50" >รายการที่ {{ i }}</p>
    </div>
  </div>
</template>

<style>
.scroll-container {
  display:flex;
  /* flex:1; */
  /* width: 100vh;
  height: 90vh; */
  border: 1px solid #ccc;
  padding: 1rem;
  margin-left: 220px;
  background-color: #f9f9f9;
}

.content {
  /* ความสูงที่มากพอให้เกิดการล้น */
  height: max-content;
}
</style>
