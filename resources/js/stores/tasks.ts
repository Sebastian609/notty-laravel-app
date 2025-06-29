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

export type PaginationData = {
    current_page: number;
    data: Task[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
};

export const useTasksStore = defineStore("tasks", () => {
    const tasks = ref<Task[]>([]);
    const pagination = ref<PaginationData | null>(null);
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

    const getTasks = async (page: number = 1, perPage: number = 10) => {
        loading.value = true;
        try {
            const response: AxiosResponse<PaginationData> = await axios.get(`http://localhost:8000/api/tasks?page=${page}&perPage=${perPage}`);
            tasks.value = response.data.data;
            pagination.value = response.data;
        } catch (err) {
            message.value = "Error fetching tasks";
        } finally {
            loading.value = false;
        }
    };

    const goToPage = async (page: number) => {
        if (pagination.value && page >= 1 && page <= pagination.value.last_page) {
            await getTasks(page, pagination.value.per_page);
        }
    };

    const changePerPage = async (perPage: number) => {
        await getTasks(1, perPage);
    };

    return {
        tasks,
        pagination,
        loading,
        message,
        getTasks,
        saveTask,
        update,
        goToPage,
        changePerPage
    };
});
