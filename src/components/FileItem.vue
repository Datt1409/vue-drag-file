<template>
  <div class="file-item">
    <div class="file-info">
      <template v-if="type === 'docx' || type === 'doc'">
        <IconWord />
      </template>
      <template v-if="type === 'xls' || type === 'xlsx'">
        <IconExcel />
      </template>
      <template v-if="type === 'pdf'">
        <IconPdf />
      </template>
      <div class="file-text">
        <p class="file-name">{{ fileName }}</p>
        <p class="file-size">{{ fileSize }}</p>
      </div>
    </div>

    <div @click="handleRemoveItem(file)" class="icon-remove">
      <IconRemove />
    </div>
  </div>
</template>

<script>
import IconExcel from "@/components/icons/IconExcel.vue";
import IconRemove from "@/components/icons/IconRemove.vue";
import IconWord from "@/components/icons/IconWord.vue";
import IconPdf from "@/components/icons/IconPdf.vue";

export default {
  components: { IconExcel, IconRemove, IconWord, IconPdf },
  props: {
    file: {
      type: File || Object,
      default: () => {},
    },
    fileName: {
      type: String,
      default: () => "Sample",
    },

    fileSize: {
      type: String,
      default: () => 696,
    },
    type: {
      type: String,
      default: () => "",
    },
    hidden: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    handleRemoveItem() {
      console.log("handleRemove");
      this.$emit("handleRemoveItem");
    },
  },
};
</script>

<style lang="scss" scoped>
.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  min-width: 244px;
  height: 48px;
  border-radius: 3px;
  border: 1px solid #dcdcdc;
  gap: 10px;

  .file-info {
    display: flex;
    align-items: center;
    gap: 10px;

    .file-name {
      font-size: 12px;
      line-height: 16px;
      font-weight: 700;
      color: $text-color;
    }

    .file-size {
      font-size: 10px;
      line-height: 14px;
      font-weight: 400;
      color: $sizeText-color;
    }
  }

  .icon-remove {
    cursor: pointer;
  }
}
</style>
