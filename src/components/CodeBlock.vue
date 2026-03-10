<template>
  <div class="rounded-lg overflow-hidden border border-vp-border dark:border-vp-dark-border">
    <div class="flex border-b border-vp-border dark:border-vp-dark-border bg-vp-bg-mute dark:bg-vp-dark-bg-soft">
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="activeTab = tab"
        :class="[
          'px-4 py-2 text-xs font-medium transition-colors',
          activeTab === tab
            ? 'text-accent-light bg-vp-bg-soft dark:bg-vp-dark-bg-mute border-b-2 border-accent'
            : 'text-vp-text-3 dark:text-vp-dark-text-2 hover:text-vp-text dark:hover:text-vp-dark-text'
        ]"
      >
        {{ tab }}
      </button>
    </div>
    <div class="relative">
      <button
        @click="copy"
        class="absolute top-2 right-2 p-1.5 rounded text-gray-400 hover:text-white hover:bg-vp-dark-bg-mute transition-colors"
        :title="copied ? 'Copied!' : 'Copy'"
      >
        <svg v-if="!copied" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
        <svg v-else class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
      </button>
      <pre class="p-4 overflow-x-auto text-sm leading-relaxed" style="background: #0f172a"><code ref="codeEl" :class="langClass" v-html="highlightedCode"></code></pre>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import hljs from 'highlight.js/lib/core'
import bash from 'highlight.js/lib/languages/bash'
import javascript from 'highlight.js/lib/languages/javascript'

hljs.registerLanguage('bash', bash)
hljs.registerLanguage('javascript', javascript)

const props = defineProps({
  tabs: { type: Array, default: () => ['cURL', 'Axios'] },
  code: { type: Object, default: () => ({}) },
})

const activeTab = ref(props.tabs[0])
const copied = ref(false)
const codeEl = ref(null)

const currentCode = computed(() => {
  return activeTab.value === 'cURL' ? props.code.curl : props.code.js
})

const langClass = computed(() => {
  return activeTab.value === 'cURL' ? 'language-bash' : 'language-javascript'
})

const highlightedCode = computed(() => {
  const lang = activeTab.value === 'cURL' ? 'bash' : 'javascript'
  if (!currentCode.value) return ''
  return hljs.highlight(currentCode.value, { language: lang }).value
})

function copy() {
  navigator.clipboard.writeText(currentCode.value || '')
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>
