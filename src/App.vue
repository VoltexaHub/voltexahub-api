<template>
  <div class="min-h-screen">
    <div class="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <!-- Top Navbar -->
      <header class="fixed top-0 left-0 right-0 z-50 h-14 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 flex items-center px-4 lg:px-6">
        <button @click="sidebarOpen = !sidebarOpen" class="lg:hidden mr-3 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
        <div class="flex items-center gap-2 mr-6 shrink-0">
          <div class="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
            <span class="text-white font-bold text-sm">V</span>
          </div>
          <span class="font-bold text-lg tracking-tight">VoltexaHub <span class="text-accent-light">API</span></span>
        </div>
        <div class="flex-1 max-w-md">
          <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input
              v-model="search"
              type="text"
              placeholder="Search endpoints..."
              class="w-full pl-10 pr-4 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
            />
          </div>
        </div>
        <button @click="isDark = !isDark" class="ml-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <svg v-if="isDark" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" /></svg>
          <svg v-else class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
        </button>
      </header>

      <!-- Sidebar Overlay (mobile) -->
      <div v-if="sidebarOpen" @click="sidebarOpen = false" class="fixed inset-0 z-40 bg-black/50 lg:hidden" />

      <!-- Sidebar -->
      <aside :class="[
        'fixed top-14 bottom-0 z-40 w-72 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 overflow-y-auto transition-transform lg:translate-x-0 p-4',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]">
        <SidebarNav :groups="filteredGroups" @navigate="sidebarOpen = false" />
      </aside>

      <!-- Main Content -->
      <main class="lg:pl-72 pt-14">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
          <!-- Base URL Section -->
          <section class="border border-gray-700/50 rounded-xl bg-gray-900/50 p-6 space-y-3">
            <h1 class="text-2xl font-bold">VoltexaHub API Reference</h1>
            <p class="text-gray-400 text-sm">Complete reference for the VoltexaHub community platform API.</p>
            <div>
              <span class="text-xs font-semibold uppercase tracking-wider text-gray-500">Base URL</span>
              <div class="mt-1 flex items-center gap-2">
                <code class="px-3 py-1.5 rounded-lg text-sm font-mono bg-gray-800 text-accent-light border border-gray-700/50">https://community.voltexahub.com/api</code>
              </div>
              <p class="mt-2 text-xs text-gray-500">Replace with your own instance URL if self-hosting.</p>
            </div>
          </section>

          <!-- Authentication Explanation -->
          <section class="border border-gray-700/50 rounded-xl bg-gray-900/50 p-6 space-y-3">
            <h2 class="text-lg font-bold">Authentication</h2>
            <p class="text-gray-400 text-sm">
              Authenticated endpoints require a Bearer token in the <code class="text-accent-light bg-gray-800 px-1.5 py-0.5 rounded text-xs">Authorization</code> header.
            </p>
            <div class="rounded-lg overflow-hidden border border-gray-700/50">
              <pre class="p-4 text-sm font-mono" style="background: #0f172a"><span class="text-gray-400">Authorization:</span> <span class="text-emerald-400">Bearer {token}</span></pre>
            </div>
            <p class="text-gray-400 text-sm">
              Tokens are obtained via <a href="#auth-login" class="text-accent-light hover:underline">POST /api/auth/login</a> and expire after <strong class="text-gray-200">30 days</strong>.
            </p>
          </section>

          <!-- Endpoint Groups -->
          <template v-for="group in filteredGroups" :key="group.id">
            <section v-if="group.endpoints.length" class="space-y-6">
              <h2 :id="group.id" class="text-xl font-bold scroll-mt-20 border-b border-gray-800 pb-2">{{ group.name }}</h2>
              <EndpointCard v-for="ep in group.endpoints" :key="ep.id" :endpoint="ep" />
            </section>
          </template>

          <!-- Footer -->
          <footer class="text-center text-xs text-gray-600 dark:text-gray-500 py-8 border-t border-gray-200 dark:border-gray-800">
            VoltexaHub API Reference &mdash; Built with Vue 3 + Tailwind CSS
          </footer>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { endpointGroups } from './data/endpoints.js'
import SidebarNav from './components/SidebarNav.vue'
import EndpointCard from './components/EndpointCard.vue'

const isDark = ref(true)
const search = ref('')

// Apply dark class to <html> so Tailwind dark mode works
onMounted(() => document.documentElement.classList.toggle('dark', isDark.value))
watch(isDark, val => document.documentElement.classList.toggle('dark', val))
const sidebarOpen = ref(false)

const filteredGroups = computed(() => {
  const q = search.value.toLowerCase().trim()
  if (!q) return endpointGroups
  return endpointGroups
    .map(group => ({
      ...group,
      endpoints: group.endpoints.filter(ep =>
        ep.path.toLowerCase().includes(q) ||
        ep.description.toLowerCase().includes(q) ||
        ep.method.toLowerCase().includes(q) ||
        group.name.toLowerCase().includes(q)
      ),
    }))
    .filter(g => g.endpoints.length > 0)
})
</script>
