<template>
  <div>
    <ul>
      <li><router-link to="about">About</router-link></li>
      <li>
        <router-link :to="{ name: 'playground' }">Playground</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const ren = (): string => {
  return "Home";
};
</script>

<style scoped></style>
