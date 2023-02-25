<template>
  <div aria-label="vue-visual-editor-item" class="vve-item__hightlight" v-bind="bindings">
    <slot></slot>
    <EditIcon></EditIcon>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import EditIcon from "./assets/icons/edit.svg";

const props = withDefaults(defineProps<{ eventName?: "click" | "dbclick" | "mouseover" }>(), {
  eventName: "mouseover",
});

function callback(event: Event) {
  console.log("🚀 -> file: App.vue:18 -> callback -> value", event);
}

const bindings = computed(() => {
  return {
    ["on" + props.eventName.replace(/^\w/, (a) => a.toLocaleUpperCase())]: callback,
  };
});
</script>
