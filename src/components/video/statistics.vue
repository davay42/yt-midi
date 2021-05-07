<template lang="pug">
.flex.flex-wrap.py-1
  .icon
    la-user
    span {{ liveViewers }}
  .icon
    la-eye 
    span {{ stat?.viewCount }}
  .icon
    la-thumbs-up
    span {{ stat?.likeCount }}
  .icon
    la-thumbs-down
    span {{ stat?.dislikeCount }}
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  stat: Object,
  liveViewers: String,
});
</script>

<style scoped>
.icon {
  @apply flex items-center mx-1;
}

.icon svg {
  @apply mx-1;
}
</style>