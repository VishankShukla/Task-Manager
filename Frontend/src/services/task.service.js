import api from "./api";

export const taskService = {
    create: (data) => api.post("/task/createTask",data),
    gpt: () => api.get("/task/gpt"),
    gct: (id) => api.get(`/task/gct/${id}`),
    update: (id,data) => api.patch(`/task/updateTask/${id}`,data),
    delete: (id) => api.delete(`/task/deleteTask/${id}`)
}