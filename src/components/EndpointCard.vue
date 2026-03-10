<template>
  <div :id="endpoint.id" class="scroll-mt-20 border border-vp-border dark:border-vp-dark-border rounded-xl bg-vp-bg dark:bg-vp-dark-bg-mute overflow-hidden shadow-sm dark:shadow-none">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-vp-border dark:border-vp-dark-border flex flex-wrap items-center gap-3 bg-vp-bg-soft dark:bg-vp-dark-bg-soft">
      <MethodBadge :method="endpoint.method" />
      <code class="text-sm font-mono text-vp-text-2 dark:text-vp-dark-text">{{ endpoint.path }}</code>
      <AuthBadge :required="endpoint.auth" />
    </div>

    <!-- Body -->
    <div class="px-6 py-5 space-y-5">
      <p class="text-vp-text-2 dark:text-vp-dark-text-2 text-sm">{{ endpoint.description }}</p>

      <!-- Params Table -->
      <div v-if="endpoint.params && endpoint.params.length > 0">
        <h4 class="text-xs font-semibold uppercase tracking-wider text-vp-text-3 dark:text-vp-dark-text-3 mb-2">Parameters</h4>
        <div class="overflow-x-auto rounded-lg border border-vp-border dark:border-vp-dark-border">
          <table class="w-full text-sm">
            <thead>
              <tr class="text-left text-xs uppercase tracking-wider text-vp-text-3 dark:text-vp-dark-text-3 border-b border-vp-border dark:border-vp-dark-border bg-vp-bg-mute dark:bg-vp-dark-bg-soft">
                <th class="pb-2 pt-2 px-3 font-medium">Name</th>
                <th class="pb-2 pt-2 px-3 font-medium">Location</th>
                <th class="pb-2 pt-2 px-3 font-medium">Type</th>
                <th class="pb-2 pt-2 px-3 font-medium">Required</th>
                <th class="pb-2 pt-2 px-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="param in endpoint.params" :key="param.name" class="border-b border-vp-border/50 dark:border-vp-dark-border/50 last:border-0">
                <td class="py-2 px-3"><code class="text-purple-600 dark:text-purple-400 text-xs bg-purple-50 dark:bg-purple-900/20 px-1.5 py-0.5 rounded">{{ param.name }}</code></td>
                <td class="py-2 px-3 text-vp-text-3 dark:text-vp-dark-text-2 text-xs">{{ param.location }}</td>
                <td class="py-2 px-3 text-vp-text-3 dark:text-vp-dark-text-2 text-xs font-mono">{{ param.type }}</td>
                <td class="py-2 px-3">
                  <span v-if="param.required" class="text-amber-600 dark:text-amber-400 text-xs font-medium">required</span>
                  <span v-else class="text-vp-text-3 dark:text-vp-dark-text-3 text-xs">optional</span>
                </td>
                <td class="py-2 px-3 text-vp-text-3 dark:text-vp-dark-text-2 text-xs">{{ param.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Request Example -->
      <div>
        <h4 class="text-xs font-semibold uppercase tracking-wider text-vp-text-3 dark:text-vp-dark-text-3 mb-2">Example Request</h4>
        <CodeBlock :code="endpoint.exampleRequest" />
      </div>

      <!-- Response Example -->
      <div>
        <h4 class="text-xs font-semibold uppercase tracking-wider text-vp-text-3 dark:text-vp-dark-text-3 mb-2">Example Response</h4>
        <div class="relative rounded-lg overflow-hidden border border-vp-border dark:border-vp-dark-border">
          <button
            @click="copyResponse"
            class="absolute top-2 right-2 p-1.5 rounded text-gray-400 hover:text-vp-text dark:hover:text-white hover:bg-vp-bg-mute dark:hover:bg-vp-dark-bg-mute transition-colors"
            :title="copiedRes ? 'Copied!' : 'Copy'"
          >
            <svg v-if="!copiedRes" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            <svg v-else class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
          </button>
          <pre class="p-4 overflow-x-auto text-sm leading-relaxed" style="background: #0f172a"><code class="language-json" v-html="highlightedResponse"></code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import hljs from 'highlight.js/lib/core'
import json from 'highlight.js/lib/languages/json'
import MethodBadge from './MethodBadge.vue'
import AuthBadge from './AuthBadge.vue'
import CodeBlock from './CodeBlock.vue'

hljs.registerLanguage('json', json)

const props = defineProps({ endpoint: Object })
const copiedRes = ref(false)

const highlightedResponse = computed(() => {
  if (!props.endpoint.exampleResponse) return ''
  return hljs.highlight(props.endpoint.exampleResponse, { language: 'json' }).value
})

function copyResponse() {
  navigator.clipboard.writeText(props.endpoint.exampleResponse || '')
  copiedRes.value = true
  setTimeout(() => { copiedRes.value = false }, 2000)
}
</script>
