<template>
  <span v-if="required" class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-accent/20 text-accent-light border border-accent/30">
    <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" /></svg>
    Auth Required
  </span>
  <span v-else class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-vp-bg-mute dark:bg-vp-dark-bg-mute text-vp-text-3 dark:text-vp-dark-text-3 border border-vp-border dark:border-vp-dark-border">
    Public
  </span>
</template>

<script setup>
defineProps({ required: Boolean })
</script>
