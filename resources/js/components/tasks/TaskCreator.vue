<template>
  <div class="w-full mt-4 flex justify-between items-center shadow-sm bg-zinc-50/50 p-4 rounded-md">
    <button
      @click="openModal = true"
      class="text-white bg-zinc-700 px-2 py-2 rounded-md flex flex-row items-center gap-1"
    >
      <PlusIcon class="h-4 w-4" />
      <span> Crear Tarea</span>
    </button>
  </div>

  <!-- Modal -->
  <div
    v-if="openModal"
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
  >
    <div class="bg-white rounded-lg p-6 w-96 relative">
      <form @submit.prevent="createTask">
        <input
          v-model="title"
          type="text"
          placeholder="Título de la tarea"
          class="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />
        <textarea
          v-model="description"
          placeholder="Descripción de la tarea"
          class="w-full p-2 border border-gray-300 rounded mb-4"
          required
        ></textarea>
        <select
          v-model="status"
          class="w-full p-2 border border-gray-300 rounded mb-4"
          required
        >
          <option value="pending">Pendiente</option>
          <option value="in_progress">En Progreso</option>
          <option value="completed">Completada</option>
        </select>
        <div class="flex justify-end">
          <button
            type="button"
            @click="closeModal"
            class="text-gray-500 hover:text-gray-700 px-4 py-2 rounded-md"
          >
            <XMarkIcon class="h-4 w-4" />
          </button>
          <button
            type="submit"
            class="bg-zinc-700 text-white px-4 py-2 rounded-md ml-2"
          >
            Crear Tarea
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { PlusIcon, XMarkIcon } from '@heroicons/vue/24/outline'

const openModal = ref(false)
const title = ref('')
const description = ref('')
const status = ref('pendiente')

function closeModal() {
  openModal.value = false
}

// Función para enviar POST
async function createTask() {
  const task = {
    title: title.value,
    description: description.value,
    status: status.value === 'completada' ? 'completed' : status.value
  }

  try {
    const res = await fetch('http://localhost:8000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    if (!res.ok) {
      throw new Error('Error al crear la tarea')
    }

    // Opcional: obtener respuesta
    const data = await res.json()
    console.log('Tarea creada:', data)

    // Resetear formulario
    title.value = ''
    description.value = ''
    status.value = 'pendiente'

    closeModal()
  } catch (error) {
    console.error(error)
    alert('No se pudo crear la tarea. Intenta nuevamente.')
  }
}
</script>
