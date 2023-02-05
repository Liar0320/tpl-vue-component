<template>
  <div>{{ data.test }}</div>
  <Test></Test>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Test from "./Test.vue";
export interface Source {
  src: string;
}
defineProps<Source>();
const data = reactive({
  test: "你好",
});
</script>
