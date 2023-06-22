<template>
  <div>
    {{ ren() }}
    <router-link :to="{ name: 'home' }">{{ "Home" }}</router-link>
  </div>
</template>

<script setup lang="ts">
const ren = (): string => {
  return "About";
};
</script>

<style scoped></style>
