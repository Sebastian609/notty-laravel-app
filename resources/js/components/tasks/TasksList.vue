<template>
  <div class="max-w-4xl mx-auto h-full">
    <!-- Header minimalista -->
    <div class="mb-2">

      <TaskCreator />
    </div>

    <!-- Loading state minimalista -->
    <div v-if="tasksStore.loading" class="flex justify-center items-center py-16">
      <div class="w-6 h-6 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
    </div>

    <!-- Error state minimalista -->
    <div v-else-if="tasksStore.message" class="border border-red-200 rounded-lg p-6 bg-red-50">
      <p class="text-red-800 font-medium mb-2">Error al cargar las tareas</p>
      <p class="text-red-600 text-sm mb-4">{{ tasksStore.message }}</p>
      <button @click="fetchTasks"
              class="text-red-700 text-sm underline hover:no-underline">
        Intentar de nuevo
      </button>
    </div>

    <!-- Empty state minimalista -->
    <div v-else-if="tasksStore.tasks.length === 0" class="text-center py-16">
      <div class="text-gray-300 text-6xl mb-4">○</div>
      <h3 class="text-lg font-medium text-gray-700 mb-2">Sin tareas</h3>
      <p class="text-gray-500 text-sm">Agrega tu primera tarea para comenzar</p>
    </div>

    <!-- Tasks list minimalista -->
    <div v-else class="space-y-2">
      <div v-for="task in tasksStore.tasks" :key="task.id"
           class="group border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors bg-white">

        <div class="flex justify-between items-start mb-1">
          <h2 class="s text-gray-900 line-clamp-1">
            <span class="text-xs px-2 py-1 rounded-full  flex-shrink-0" :class="{
              'bg-green-100 text-green-700': task.status === 'completed',
              'bg-yellow-100 text-yellow-700': task.status === 'in_progress',
              'bg-blue-100 text-blue-700': task.status === 'pending',
              'bg-gray-100 text-gray-700': !['completed', 'in_progress', 'pending'].includes(task.status)
            }">
            {{ task.status }}

          </span>
            {{ task.title }}
          </h2>

            <div class="flex space-x-1">
            <button class="p-2 text-gray-400 hover:text-gray-600 rounded">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
              </svg>
            </button>

            <button class="p-2 text-gray-400 hover:text-red-500 rounded">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>
        </div>




      </div>
    </div>
  </div>
</template>

<script setup>
import TaskCreator from '../../components/tasks/TaskCreator.vue'
import { useTasksStore } from '../../stores/tasks'
import { onMounted } from 'vue'

const tasksStore = useTasksStore()

const fetchTasks = async () => {
  await tasksStore.getTasks()
}

onMounted(() => {
  fetchTasks()
})
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
