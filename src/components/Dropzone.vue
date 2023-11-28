<template>
  <div class="container">
    <div
      :class="['drop-zone', { dragging: isDragging, error: isError }]"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
      @drop="onDrop"
    >
      <IconUpload />
      <div class="drop-text-box">
        <h4 class="drop-heading">Drag and drop files</h4>
        <h4 class="drop-text" @click="onChooseFile">Browse files</h4>
        <input
          type="file"
          ref="fileInputRef"
          style="display: none"
          accept=".pdf, .doc, .docx, .xls, .xlsx"
          maxlength="10485760"
          @change="onChange"
        />
      </div>
    </div>

    <template v-if="isError">
      <p class="error-message">{{ errorMessage }}</p>
    </template>

    <template v-else>
      <div class="file-zone">
        <Filezone
          :files="files"
          :currentIdx="currentIdx"
          @handleRemoveItem="handleRemoveItem"
        />
        <template v-if="files.length >= 4">
          <div class="left-icon" @click="buttonLeft">
            <IconLeftArrow />
          </div>
          <div class="right-icon" @click="buttonRight">
            <IconRightArrow />
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
import Filezone from "@/components/Filezone.vue";

import IconExcel from "@/components/icons/IconExcel.vue";
import IconPdf from "@/components/icons/IconPdf.vue";
import IconWord from "@/components/icons/IconWord.vue";
import IconUpload from "@/components/icons/IconUpload.vue";
import IconRightArrow from "@/components/icons/IconRightArrow.vue";
import IconLeftArrow from "@/components/icons/IconLeftArrow.vue";

import {
  isValidFileType,
  isExceedMaxTotalSize,
  isValidFileSize,
} from "@/utils";

export default {
  components: {
    IconExcel,
    IconPdf,
    IconUpload,
    IconWord,
    Filezone,
    IconRightArrow,
    IconLeftArrow,
  },

  props: {
    minLength: {
      type: Number,
      required: false,
    },
    maxlength: {
      type: Number,
      required: false,
    },
    maxTotalSize: {
      type: Number,
      required: false,
    },
    maxItemSize: {
      type: Number,
      default: () => 10000000,
    },
    errorMessage: {
      type: String,
      default: () => "The max file size is 10MB",
    },
  },

  data() {
    return {
      isDragging: false,
      isError: false,
      isMoving: false,
      files: [],
      fileName: "",
      fileType: "",
      currentIdx: 0,
    };
  },

  methods: {
    isValidFileType,
    isValidFileSize,
    isExceedMaxTotalSize,
    onChooseFile() {
      this.$refs.fileInputRef.click();
    },
    onChange(e) {
      const file = e.target.files[0];

      const fileAlreadyExist = this.files.some(
        (existingFile) =>
          existingFile.name === file.name && existingFile.size === file.size
      );

      if (!fileAlreadyExist) {
        this.files.push(file);
      }
    },
    onDragOver(e) {
      e.preventDefault();
      this.isDragging = true;
    },
    onDragLeave() {
      this.isDragging = false;
    },
    onDrop(e) {
      e.preventDefault();

      const droppedFiles = e.dataTransfer.files;

      const newFiles = Array.from(droppedFiles).filter(
        (file) =>
          !this.files.some(
            (existingFile) =>
              existingFile.name === file.name && existingFile.size === file.size
          )
      );

      if (
        this.isValidFileType(newFiles) &&
        (this.isValidFileSize(newFiles, this.maxItemSize) ||
          this.isExceedMaxTotalSize(newFiles, this.maxTotalSize))
      ) {
        this.files.push(...newFiles);
        this.isDragging = false;
        this.isError = false;
      } else {
        this.isError = true;

        // If
        if (!this.isValidFileSize(newFiles, this.maxItemSize)) {
          this.errorMessage = "The maximum file size is 10MB";
        }

        if (!this.isValidFileType(newFiles)) {
          this.errorMessage = "Invalid file type";
        }
      }
    },
    handleRemoveItem(item) {
      this.files = this.files.filter(
        (file) =>
          file.name !== item.name &&
          file.size !== item.size &&
          file.lastModified !== item.lastModified &&
          file.lastModifiedDate !== item.lastModifiedDate
      );

      this.$refs.fileInputRef.value = "";
    },
    buttonRight() {
      if (this.currentIdx < this.files.length - 3) {
        this.currentIdx++;
      }
    },
    buttonLeft() {
      if (this.currentIdx > 0) {
        this.currentIdx--;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 32px;

  .drop-zone {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 52.625rem;
    height: 14.5rem;
    border: 1px solid $primary-color;
    border-radius: 7px;
    background: $secondary-color;
    gap: 20px;

    &.dragging {
      border: 3px dashed $primary-color;
    }

    &.error {
      border: 1px solid red;
    }
    .drop-text-box {
      color: $text-color;
      line-height: 1.375rem;
      font-size: 18px;
      font-style: normal;
      text-align: center;
      gap: 15px;

      .drop-heading {
        font-weight: 700;
      }

      .drop-text {
        font-weight: 400;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }

  .error-message {
    color: #ed5d5d;
    font-size: 14px;
  }
  .file-zone {
    display: flex;
    align-items: center;
    gap: 30px;
    .right-icon,
    .left-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      background: $ellipse-color;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      cursor: pointer;
    }
  }
}
</style>
