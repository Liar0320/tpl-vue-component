<template>
  <div aria-label="vue-visual-editor-item vvei" class="vue-visual-editor-item vvei" v-bind="bindings">
    <slot></slot>
    <div class="vvei_tools">
      <EditIcon></EditIcon>
      <DeleteIcon></DeleteIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import EditIcon from "./assets/icons/edit.svg";
import DeleteIcon from "./assets/icons/delete.svg";

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
