<template>
    <Navbar />

    <div class="grid grid-cols-3 gap-4">
        <TasksList />
    </div>
</template>
<script setup lang="ts">
import Navbar from './../components/navbar/Navbar.vue'
import TasksList from './../components/tasks/TasksList.vue'

</script>
