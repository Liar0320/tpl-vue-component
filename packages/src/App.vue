<template>
  <div aria-label="visual-editor-item" class="ve-item" :class="{ 've-item--focus': state.isActive }" v-bind="bindings">
    <slot></slot>
    <div class="ve-item__tools--wraper">
      <div class="ve-item__tools">
        <EditIcon class="ve-item__action"></EditIcon>
        <DeleteIcon class="ve-item__action"></DeleteIcon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import EditIcon from "./assets/icons/edit.svg";
import DeleteIcon from "./assets/icons/delete.svg";
const state = reactive({
  isActive: false,
  show: false,
});

const props = withDefaults(defineProps<{ eventName?: "click" | "dbclick" | "mouseover" }>(), {
  eventName: "mouseover",
});

function callback(event: Event) {
  state.show = true;
}

const bindings = computed(() => {
  return {
    ["on" + props.eventName.replace(/^\w/, (a) => a.toLocaleUpperCase())]: callback,
  };
});
</script>
