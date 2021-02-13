<template>
  <div id="app">
    <div class="header">
      <h2>
        Header
      </h2>
    </div>
    <div class="body">
      <div class="container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/styles/main.scss";

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  padding: 15px 30px;
}

.body {
  margin: 40px 0;
}
</style>
