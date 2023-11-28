<template>
  <div id="app">
    <Dropzone />
  </div>
</template>

<script>
import Dropzone from "./components/Dropzone.vue";

export default { components: { Dropzone } };
</script>

<style lang="scss" scoped>
#app {
  min-height: 100vh;
  max-width: 1920px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
}
</style>
