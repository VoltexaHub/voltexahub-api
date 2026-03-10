<template>
  <span :class="badgeClass" class="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider">
    {{ method }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ method: String })

const badgeClass = computed(() => {
  const map = {
    GET: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    POST: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    PUT: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    PATCH: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    DELETE: 'bg-red-500/20 text-red-400 border border-red-500/30',
  }
  return map[props.method] || 'bg-gray-500/20 text-gray-400'
})
</script>
