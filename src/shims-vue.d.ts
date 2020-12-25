// ts 无法识别以.vue结尾的文件，这个模块的作用就是导出.vue 结尾的文件让 ts 识别
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
