import Repository from "./Repository";

const resource = "/todoLists/done";
export default {
  getTodo(userId) {
    return Repository.get(`${resource}/${userId}`);
  },
  
  returnTodo(Id) {
    return Repository.put(`${resource}/${Id}`);
  },

  deleteTodo(Id) {
    return Repository.delete(`${resource}/${Id}`);
  },
  
};