<script setup lang="ts">
import VisualEditor from "vue-visual-editor";
import "vue-visual-editor/dist/styles/index.css";
</script>

<template>
  <div class="hero bg-base-200 min-h-screen">
    <div class="hero-content text-center">
      <div class="max-w-screen-lg">
        <h1 class="mb-5 text-5xl font-bold">Visual Editor</h1>
        <div class="flex w-[600px] flex-col space-y-4 border-opacity-50">
          <VisualEditor v-for="i in 4" :key="i">
            <div class="card bg-base-300 rounded-box grid h-20 place-items-center">content</div>
          </VisualEditor>
        </div>
      </div>
    </div>
  </div>
</template>
