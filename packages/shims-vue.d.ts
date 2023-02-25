declare module "*.vue" {
  import { ComponentOptions } from "vue";
  const componentOptions: ComponentOptions;
  export default componentOptions;
}

declare module "*.svg";

// declare module '*.vue' {
//   import Vue from 'vue'
//   export default Vue
// }
