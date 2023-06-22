<template>
  <div>
    <div class="text-lg mb-2">
      <router-link :to="{ name: 'home' }">Home</router-link>
    </div>
    <div class="mockup-code p-5">
      <div class="mb-10 grid gap-3">
        <input
          type="number"
          name="base"
          id=""
          class="input input-bordered input-primary w-full max-w-xs"
          placeholder="0"
          v-model="base"
        />
        <input
          type="number"
          name="exponent"
          id=""
          class="input input-bordered input-primary w-full max-w-xs"
          placeholder="0"
          v-model="exponent"
        />
      </div>
      <button class="btn btn-primary w-full max-w-xs" @click="calculator()">
        Cal
      </button>
    </div>

    <div
      v-if="exponentResult"
      class="mockup-code bg-primary text-primary-content mt-3"
    >
      <pre><code>{{exponentResult}}</code></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import api from "@services/api";
// import playgroundModel from "../models/playground";

const base = ref(0);
const exponent = ref(0);
const exponentResult = ref("");

const powerOfMath_url = `https://boza7gp0r1.execute-api.us-east-1.amazonaws.com/dev`;

// const { calPowerOfMath } = playgroundModel();

// callAPI function that takes the base and exponent numbers as parameters
var calculator = async () => {
  // instantiate a headers object
  var myHeaders = new Headers();
  // add content type header to object
  myHeaders.append("Content-Type", "application/json");
  // using built in JSON utility package turn object to string and store in a variable
  var raw = JSON.stringify({ base: base.value, exponent: exponent.value });
  // create a JSON object with parameters for API call and store in a variable
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  // make API call with parameters and use promises to get response
  await fetch(powerOfMath_url, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      exponentResult.value = JSON.parse(result).body;
    })
    .catch((error) => console.log("error", error));
};
</script>

<style scoped></style>
