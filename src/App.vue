<template>
  <div class="nav">
    <router-link to="/todo" class="nav-item">Todos</router-link>
    <router-link to="/user" class="nav-item">Users</router-link>
    <router-link to="/" class="nav-item">Home</router-link>
  </div>
  <router-view></router-view>
</template>

<script setup>

</script>

<style>
.nav {
  display: flex;
  width: 200px;
  flex-direction: row;
}
.nav-item {
  margin: 0 auto;
}
</style>
