<template>
  <div>{{ data.test }}</div>
  <tsc></tsc>
</template>

<script setup lang="ts">
import { reactive } from "vue";
// @ts-ignore
import tsc from "./tsc.vue";
export interface Source {
  src?: string;
}
defineProps<Source>();
const data = reactive({
  test: "你好",
});
</script>
