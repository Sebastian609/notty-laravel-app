<template>
  <div
    class="kanban-card bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-gray-300 group"
    draggable="true"
    @dragstart="dragStart($event, task)"
  >
    <!-- Header with title -->
    <div class="mb-3">
      <h3 class="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
        {{ task.title }}
      </h3>
    </div>

    <!-- Description -->
    <div class="mb-4" v-if="task.description">
      <p class="text-xs text-gray-600 line-clamp-3 leading-relaxed">
        {{ task.description }}
      </p>
    </div>

    <!-- Footer with date and drag indicator -->
    <div class="flex items-center justify-between">
      <div class="flex items-center text-xs text-gray-500">
        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        {{ formatDate(task.created_at) }}
      </div>

      <!-- Drag indicator -->
      <div class="opacity-0 group-hover:opacity-100 transition-opacity">
        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"></path>
        </svg>
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { Task } from '../../stores/tasks';


const props = defineProps<{
  task: Task
}>();


const dragStart = (event: DragEvent, task: Task) => {


  if (event.dataTransfer) {
    event.dataTransfer.setData('text/plain', task.id.toString());

  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return 'Ayer';
  } else if (diffDays < 7) {
    return `Hace ${diffDays} días`;
  } else {
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short'
    });
  }
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.kanban-card {
  position: relative;
}

.kanban-card:hover {
  transform: translateY(-1px);
}

.kanban-card:active {
  transform: translateY(0);
}
</style>
