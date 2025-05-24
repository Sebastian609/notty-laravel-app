<template>
  <div
    class="kanban-column bg-gradient-to-b from-white to-gray-50 shadow-lg rounded-xl border border-gray-200 p-4 flex-1 mx-3 hover:shadow-xl transition-all duration-300"
    @dragover.prevent
    @drop="drop($event)"
  >
    <!-- Header elegante -->
    <div class="flex items-center justify-between mb-6 pb-3 border-b border-gray-100">
      <div class="flex items-center space-x-3">
        <!-- Indicador de estado con gradiente -->
        <div
          class="w-4 h-4 rounded-full shadow-sm"
          :class="getStatusGradient(status)"
        ></div>
        <h2 class="font-bold text-gray-800 text-lg tracking-tight">
          {{ status }}
        </h2>
      </div>

      <!-- Contador con estilo -->
      <div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-sm">
        {{ tasks.length }}
      </div>
    </div>

    <!-- Contenedor de tareas con scroll personalizado -->
    <div class="space-y-4 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
      <KanbanCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
      />

      <!-- Estado vacío elegante -->
      <div
        v-if="tasks.length === 0"
        class="flex flex-col items-center justify-center h-40 text-gray-400 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50/50 hover:bg-gray-100/50 transition-colors duration-200"
      >
        <div class="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mb-3 shadow-inner">
          <svg class="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
        </div>
        <p class="text-sm font-medium text-gray-500">Sin tareas</p>
        <p class="text-xs text-gray-400 mt-1">Arrastra tareas aquí</p>
      </div>
    </div>

    <!-- Botón agregar con gradiente -->
    <button
      class="w-full mt-6 py-3 px-4 text-sm font-medium text-gray-600 hover:text-white bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-500 hover:to-purple-600 rounded-xl border border-gray-300 hover:border-transparent transition-all duration-300 flex items-center justify-center space-x-2 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
    >
      <div class="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
      </div>
      <span>Agregar tarea</span>
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import KanbanCard from './KanbanCard.vue';

const props = defineProps({
  status: String,
  tasks: Array,
});

const emit = defineEmits(['moveCard']);

const drop = event => {
  const taskId = event.dataTransfer.getData('text/plain');
  emit('moveCard', parseInt(taskId, 10), props.status);
};

const getStatusGradient = (status) => {
  const gradients = {
    'pending': 'bg-gradient-to-br from-gray-400 to-gray-600',
    'en progreso': 'bg-gradient-to-br from-blue-400 to-blue-600',
    'en-progreso': 'bg-gradient-to-br from-blue-400 to-blue-600',
    'completado': 'bg-gradient-to-br from-green-400 to-green-600',
    'revisión': 'bg-gradient-to-br from-yellow-400 to-orange-500',
    'revision': 'bg-gradient-to-br from-yellow-400 to-orange-500',
    'bloqueado': 'bg-gradient-to-br from-red-400 to-red-600',
    'todo': 'bg-gradient-to-br from-gray-400 to-gray-600',
    'doing': 'bg-gradient-to-br from-blue-400 to-blue-600',
    'done': 'bg-gradient-to-br from-green-400 to-green-600'
  };

  return gradients[status?.toLowerCase()] || 'bg-gradient-to-br from-gray-400 to-gray-600';
};
</script>

<style scoped>
.kanban-column {
  min-width: 320px;
  max-width: 360px;
}

/* Scrollbar personalizado elegante */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: linear-gradient(to bottom, #f8fafc, #f1f5f9);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #cbd5e1, #94a3b8);
  border-radius: 10px;
  border: 2px solid #f8fafc;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #94a3b8, #64748b);
}

/* Efectos de hover suaves */
.kanban-column:hover {
  transform: translateY(-2px);
}

/* Animación sutil para el botón */
button:active {
  transform: translateY(-1px) scale(0.98);
}

/* Sombras más suaves */
.kanban-column {
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset;
}

.kanban-column:hover {
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset;
}
</style>
