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
  
  checkTodo(id) {
    return Repository.delete(`${resource}/${id}`);
  },

  getTodayTodo(id) {
    return Repository.get(`${resource}/today/${id}`);
  },

  getUserTodo(userId) {
    return Repository.get(`${resource}/user/${userId}`);
  },
  
};