<template>
  <nav class="space-y-1">
    <div v-for="group in groups" :key="group.id">
      <button
        @click="toggle(group.id)"
        class="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-vp-text dark:text-vp-dark-text-2 hover:text-accent dark:hover:text-vp-dark-text hover:bg-vp-bg-mute dark:hover:bg-vp-dark-bg-mute rounded-md transition-colors"
      >
        <span>{{ group.name }}</span>
        <svg
          :class="['w-4 h-4 transition-transform', expanded[group.id] ? 'rotate-90' : '']"
          fill="currentColor" viewBox="0 0 20 20"
        >
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
      </button>
      <div v-show="expanded[group.id]" class="ml-2 mt-1 space-y-0.5">
        <a
          v-for="ep in group.endpoints"
          :key="ep.id"
          :href="'#' + ep.id"
          @click="$emit('navigate')"
          class="flex items-center gap-2 px-3 py-1.5 text-xs rounded-md hover:bg-vp-bg-mute dark:hover:bg-vp-dark-bg-mute transition-colors group"
        >
          <span :class="methodColor(ep.method)" class="font-mono font-bold text-[10px] uppercase w-10 shrink-0">{{ ep.method }}</span>
          <span class="text-vp-text-2 dark:text-vp-dark-text-2 group-hover:text-vp-text dark:group-hover:text-vp-dark-text truncate">{{ ep.path }}</span>
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { reactive } from 'vue'

const props = defineProps({ groups: Array })
defineEmits(['navigate'])

const expanded = reactive({})
props.groups.forEach(g => { expanded[g.id] = true })

function toggle(id) {
  expanded[id] = !expanded[id]
}

function methodColor(method) {
  const map = {
    GET: 'text-emerald-400',
    POST: 'text-blue-400',
    PUT: 'text-amber-400',
    PATCH: 'text-amber-400',
    DELETE: 'text-red-400',
  }
  return map[method] || 'text-vp-text-3'
}
</script>
