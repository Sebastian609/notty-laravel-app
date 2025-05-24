import { ref } from "vue";
import axios, { AxiosResponse } from "axios";
import { defineStore } from "pinia";

export type Task = {
    id: number;
    title: string;
    description: string;
    status: "pending" | "in_progress" | "completed";
    created_at: string;
    updated_at: string;
};

export type CreateTaskDTO = {
    title: string;
    description: string;
    status: "pending" | "in_progress" | "completed";
};

export const useTasksStore = defineStore("tasks", () => {
    const tasks = ref<Task[]>([]);
    const loading = ref(false);
    const message = ref("");
    const saving = ref(false);

    const saveTask = async (task: CreateTaskDTO) => {
        saving.value = true;
        try {
            await axios.post("http://localhost:8000/api/tasks", task);

            await getTasks();

        } catch (err) {
            message.value = "Error saving task";
        } finally {
            saving.value = false;

        }
    }

    const update = async (task: Task) => {
        saving.value = true;
        try {
            await axios.put(`http://localhost:8000/api/tasks/${task.id}`, task);


        } catch (err) {
            message.value = "Error updating task";
        } finally {
            saving.value = false;

        }
    }

    const getTasks = async () => {
        loading.value = true;
        try {
            const response:AxiosResponse = await axios.get("http://localhost:8000/api/tasks");
            tasks.value =  response.data;
        } catch (err) {
            message.value = "Error fetching tasks";
        } finally {
            loading.value = false;
        }
    };

    return {
        tasks,
        loading,
        message,
        getTasks,
        saveTask,
        update
    };
});
