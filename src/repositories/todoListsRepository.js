import Repository from "./Repository";

const resource = "/todoLists";
export default {
  getTodo(userId) {
    return Repository.get(`${resource}/${userId}`);
  },

  createTodo(payload) {
    return Repository.post(`${resource}`, payload);
  },

  updateTodo(id, payload) {
    return Repository.put(`${resource}/${id}`, payload);
  },
  
  deleteTodo(id) {
    return Repository.delete(`${resource}/${id}`);
  },
  
};