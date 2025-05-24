<template>
  <Navbar />
  <div class="grid grid-cols-3 gap-2 p-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <div class="col-span-1">
      <TasksList />
    </div>
    <div class="col-span-2">
      <Kanban />
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from '../components/navbar/Navbar.vue'
import Kanban from '../components/tasks/Kanban.vue'
import TasksList from '../components/tasks/TasksList.vue'
</script>
