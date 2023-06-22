<template>
  <div>
    <router-link to="about">about</router-link>
    {{ ren() }}</div>
</template>

<script setup lang="ts">
const ren = (): string => {
  return "Home";
};
</script>

<style scoped></style>
