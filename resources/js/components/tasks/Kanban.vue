<template>
  <div class="flex justify-around ">
    <KanbanColumn
      v-for="column in columnStatuses"
      :key="column.key"
      :status="column.key"
      :tasks="taskStore.tasks.filter(task => task.status == column.key)"
      @moveCard="moveCard"
    ></KanbanColumn>

  </div>
</template>

<script setup lang="ts">

export type Column = {
    key: "pending" | "in_progress" | "completed";
    name: string;
}


import KanbanColumn from './KanbanColumn.vue';
import { useTasksStore }from '../../stores/tasks';

const taskStore = useTasksStore();
const columnStatuses:Column[] = [{
    key: 'pending',
    name: 'Pendiente',
    }, {
    key: 'in_progress',
    name: 'En Progreso',
    }, {
    key: 'completed',
    name: 'Completado',
}];

const moveCard = (taskId, newStatus) => {
  const task = useTasksStore().tasks.find(task => task.id === taskId);
  if (task) {

    task.status = newStatus;
     useTasksStore().update(task)
  }

};
</script>
