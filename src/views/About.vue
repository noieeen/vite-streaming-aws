<template>
  <div>
    {{ ren() }}
    <router-link :to="{ name: 'home' }">{{ "home" }}</router-link>
  </div>
</template>

<script setup lang="ts">
const ren = (): string => {
  return "About";
};
</script>

<style scoped></style>
