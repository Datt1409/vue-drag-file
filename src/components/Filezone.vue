<template>
  <div v-if="visibleFiles.length" class="file-zone" ref="slider">

      <FileItem
      v-for="file,index in visibleFiles" :key="index"
        :file="file"
        :fileName="file.name"
        :fileSize="formatFileSize(file.size)"
        :type="getFileType(file.name)"
        :hidden="!visibleFiles.includes(file)"
        @handleRemoveItem="handleRemoveItem(file)"
      />

  </div>
</template>

<script>
import FileItem from "@/components/FileItem.vue";

import { getFileType, formatFileSize } from "@/utils";

export default {
  components: { FileItem },
  props: {
    files: {
      type: Array,
      default: () => [],
    },
    currentIdx: {
      type: Number,
      required: false,
    },
  },
  computed: {
    visibleFiles() {
      const startIndex = this.currentIdx * 1;
      const endIndex = this.currentIdx + 3;
      return this.files.slice(startIndex, endIndex);
    },
  },

  methods: {
    getFileType,
    formatFileSize,

    handleRemoveItem(item) {
      this.$emit("handleRemoveItem", item);
    },
    adjustPos() {
      this.$refs.slider.style.transition = "transform 0.3s ease";
      this.$refs.slider.style.transform = `translateX(-${
        this.currentIdx * 274
      }px)`;
    },
  },
};
</script>

<style lang="scss" scoped>
.file-zone {
  display: flex;
  width: 792px;
  gap: 20px;
  flex-wrap: nowrap;
}
</style>
