<template>
  <div class="w-full mt-2 flex justify-between items-center shadow-sm bg-gradient-to-r from-slate-50 to-zinc-50 p-2 rounded-xl border border-slate-200">
    <button
      @click="openModal = true"
      class="group relative overflow-hidden text-sm bg-gradient-to-r from-slate-800 to-zinc-800 hover:from-slate-700 hover:to-zinc-700 text-white p-2 rounded-lg flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
    >
      <div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
      <PlusIcon class="h-5 w-5 relative z-10" />
      <span class="relative z-10">Crear Tarea</span>
    </button>
  </div>

  <!-- Modal Backdrop -->
  <Teleport to="body">
    <div
      v-if="openModal"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50  transition-all duration-300"
      :class="openModal ? 'opacity-100' : 'opacity-0'"
      @click="closeModal"
    >
      <!-- Modal Content -->
      <div
        class="bg-white rounded-2xl shadow-2xl w-full max-w-md relative transform transition-all duration-300"
        :class="openModal ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'"
        @click.stop
      >
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-zinc-50 rounded-t-2xl">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-r from-slate-800 to-zinc-800 rounded-lg flex items-center justify-center">
              <PlusIcon class="h-5 w-5 text-white" />
            </div>
            <h2 class="text-xl font-semibold text-slate-800">Nueva Tarea</h2>
          </div>
          <button
            @click="closeModal"
            class="p-2 hover:bg-slate-200 rounded-full transition-colors duration-200 group"
          >
            <XMarkIcon class="h-5 w-5 text-slate-500 group-hover:text-slate-700" />
          </button>
        </div>

        <!-- Modal Body -->
        <form @submit.prevent="createTask" class="p-6 space-y-6">
          <!-- Title Input -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-slate-700 flex items-center gap-2">
              <span class="w-2 h-2 bg-slate-800 rounded-full"></span>
              Título
            </label>
            <input
              v-model="title"
              type="text"
              placeholder="Ingresa el título de la tarea"
              class="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 placeholder-slate-400 bg-slate-50 focus:bg-white"
              required
            />
          </div>

          <!-- Description Input -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-slate-700 flex items-center gap-2">
              <span class="w-2 h-2 bg-slate-800 rounded-full"></span>
              Descripción
            </label>
            <textarea
              v-model="description"
              placeholder="Describe los detalles de la tarea"
              rows="4"
              class="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 placeholder-slate-400 resize-none bg-slate-50 focus:bg-white"
              required
            ></textarea>
          </div>

          <!-- Status Select -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-slate-700 flex items-center gap-2">
              <span class="w-2 h-2 bg-slate-800 rounded-full"></span>
              Estado
            </label>
            <div class="relative">
              <select
                v-model="status"
                class="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white appearance-none cursor-pointer"
                required
              >
                <option value="pending" class="py-2">📋 Pendiente</option>
                <option value="in_progress" class="py-2">⚡ En Progreso</option>
                <option value="completed" class="py-2">✅ Completada</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="flex justify-end gap-3 pt-6 border-t border-slate-200">
            <button
              type="button"
              @click="closeModal"
              class="px-6 py-3 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all duration-200 font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              :disabled="isLoading || !title.trim() || !description.trim()"
              class="px-8 py-3 bg-gradient-to-r from-slate-800 to-zinc-800 hover:from-slate-700 hover:to-zinc-700 disabled:from-slate-400 disabled:to-slate-400 text-white rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:cursor-not-allowed flex items-center gap-2 min-w-[140px] justify-center"
            >
              <span v-if="!isLoading">Crear Tarea</span>
              <span v-else class="flex items-center gap-2">
                <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creando...
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>

  <!-- Success Notification -->
  <Teleport to="body">
    <div
      v-if="showSuccess"
      class="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-xl shadow-lg z-50 transform transition-all duration-300 flex items-center gap-3"
      :class="showSuccess ? 'translate-x-0' : 'translate-x-full'"
    >
      <div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <span class="font-medium">Tarea creada exitosamente</span>
    </div>
  </Teleport>

  <!-- Error Notification -->
  <Teleport to="body">
    <div
      v-if="showError"
      class="fixed top-4 right-4 bg-red-500 text-white px-6 py-4 rounded-xl shadow-lg z-50 transform transition-all duration-300 flex items-center gap-3"
      :class="showError ? 'translate-x-0' : 'translate-x-full'"
    >
      <div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </div>
      <span class="font-medium">Error al crear la tarea</span>
    </div>
  </Teleport>
</template>

<script setup>
import { useTasksStore } from '@/stores/tasks'
import { ref } from 'vue'
import { PlusIcon, XMarkIcon } from '@heroicons/vue/24/outline'

const openModal = ref(false)
const title = ref('')
const description = ref('')
const status = ref('pending')
const isLoading = ref(false)
const showSuccess = ref(false)
const showError = ref(false)

function closeModal() {
  openModal.value = false
  // Reset form when closing
  setTimeout(() => {
    title.value = ''
    description.value = ''
    status.value = 'pending'
  }, 300)
}

// Función para enviar POST
async function createTask() {
  if (!title.value.trim() || !description.value.trim()) return

  isLoading.value = true

  const task = {
    title: title.value.trim(),
    description: description.value.trim(),
    status: status.value
  }

  try {
    await useTasksStore().saveTask(task)

    // Show success notification
    showSuccess.value = true
    setTimeout(() => {
      showSuccess.value = false
    }, 3000)

    closeModal()
  } catch (error) {
    console.error('Error creating task:', error)

    // Show error notification
    showError.value = true
    setTimeout(() => {
      showError.value = false
    }, 3000)
  } finally {
    isLoading.value = false
  }
}
</script>
