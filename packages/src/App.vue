<template>
  <div
    aria-label="vue-visual-editor-item"
    class="vve-item__hightlight"
    v-bind="bindings"
  >
    <p>wqeqweqw</p>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{ eventName?: "click" | "dbclick" | "mouseover" }>(),
  {
    eventName: "click",
  }
);

function callback(value: any) {
  console.log("🚀 -> file: App.vue:18 -> callback -> value", value);
}

const bindings = computed(() => {
  return {
    ["on" + props.eventName.replace(/^\w/, (a) => a.toLocaleUpperCase())]:
      callback,
  };
});
</script>
