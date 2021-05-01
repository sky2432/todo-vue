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

  checkTodo(id, payload) {
    return Repository.put(`${resource}/done/${id}`, payload);
  },

  getTodayTodo(id) {
    return Repository.get(`${resource}/today/${id}`);
  },

  getUserTodo(userId) {
    return Repository.get(`${resource}/user/${userId}`);
  },

  getTodoForCalender(userId) {
    return Repository.get(`${resource}/calender/${userId}`);
  },

};
