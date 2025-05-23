<template>
  <div class="max-w-4xl mx-auto p-4 sm:p-6">
    <!-- Header section -->
    <div class="mb-8 border-b pb-4">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-800">Lista de tareas</h1>
      <p class="text-gray-600 mt-2">Gestiona tus tareas de forma eficiente</p>
<TaskCreator />
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
      <p class="font-medium">Error al cargar las tareas</p>
      <p class="text-sm mt-1">{{ error }}</p>
      <button
        @click="fetchTasks"
        class="mt-3 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-md text-red-700 text-sm transition-colors"
      >
        Intentar de nuevo
      </button>
    </div>

    <!-- Empty state -->
    <div v-else-if="tasks.length === 0" class="text-center py-12 bg-gray-50 rounded-lg">
      <div class="text-gray-400 text-5xl mb-4">📋</div>
      <h3 class="text-lg font-medium text-gray-700">No hay tareas disponibles</h3>
      <p class="text-gray-500 mt-2">Las tareas que agregues aparecerán aquí</p>
    </div>

    <!-- Tasks list -->
    <ul v-else class="grid gap-4 sm:grid-cols-1">
      <li
        v-for="task in tasks"
        :key="task.id"
        class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
      >
        <div class="p-5">
          <div class="flex justify-between items-start mb-3">
            <h2 class="text-lg font-semibold text-gray-800 line-clamp-1">{{ task.title }}</h2>
            <span
              class="px-2 py-1 text-xs rounded-full font-medium"
              :class="{
                'bg-green-100 text-green-800': task.status === 'completada',
                'bg-yellow-100 text-yellow-800': task.status === 'en progreso',
                'bg-blue-100 text-blue-800': task.status === 'pendiente',
                'bg-gray-100 text-gray-800': !['completada', 'en progreso', 'pendiente'].includes(task.status)
              }"
            >
              {{ task.status }}
            </span>
          </div>
          <p class="text-gray-600 mb-4 line-clamp-2">{{ task.description }}</p>
          <div class="flex justify-between items-center pt-3 border-t border-gray-100">
            <button class="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
              Ver detalles
            </button>
            <div class="flex space-x-2">
              <button class="p-1 text-gray-400 hover:text-emerald-500 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              <button class="p-1 text-gray-400 hover:text-red-500 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>

import TaskCreator from '../../components/tasks/TaskCreator.vue'

import { ref, onMounted } from 'vue'
import axios from 'axios'

const tasks = ref([])
const loading = ref(true)
const error = ref(null)

const fetchTasks = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await axios.get('http://localhost:8000/api/tasks') // pon aquí tu URL real
    tasks.value = response.data
  } catch (err) {
    console.error('Error al cargar tareas:', err)
    error.value = err.message || 'Ha ocurrido un error al cargar las tareas'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchTasks()
})
</script>
