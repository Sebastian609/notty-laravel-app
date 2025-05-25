<template>
  <nav class="bg-white shadow-lg border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <a href="#" class="text-2xl font-bold text-gray-800 hover:text-gray-600 transition-colors">
            Logo
          </a>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <a 
              v-for="item in navigation" 
              :key="item.name"
              :href="item.href"
              :class="[
                item.current 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
                'px-3 py-2 rounded-md text-sm font-medium transition-colors'
              ]"
            >
              {{ item.name }}
            </a>
          </div>
        </div>

        <!-- Desktop CTA Button -->
        <div class="hidden md:block">
          <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
            Get Started
          </button>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="toggleMobileMenu"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <!-- Hamburger icon -->
            <svg 
              :class="{ 'hidden': isOpen, 'block': !isOpen }"
              class="h-6 w-6" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <!-- Close icon -->
            <svg 
              :class="{ 'block': isOpen, 'hidden': !isOpen }"
              class="h-6 w-6" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div :class="{ 'block': isOpen, 'hidden': !isOpen }" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 border-t border-gray-200">
        <a 
          v-for="item in navigation" 
          :key="item.name"
          :href="item.href"
          :class="[
            item.current 
              ? 'bg-gray-900 text-white' 
              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
            'block px-3 py-2 rounded-md text-base font-medium transition-colors'
          ]"
          @click="closeMobileMenu"
        >
          {{ item.name }}
        </a>
        <div class="pt-4 pb-3 border-t border-gray-200">
          <button class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

const navigation = ref([
  { name: 'Home', href: '#', current: true },
  { name: 'About', href: '#', current: false },
  { name: 'Services', href: '#', current: false },
  { name: 'Portfolio', href: '#', current: false },
  { name: 'Contact', href: '#', current: false },
])

const toggleMobileMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMobileMenu = () => {
  isOpen.value = false
}
</script>

<style scoped>
/* Additional custom styles can be added here if needed */
.transition-colors {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>