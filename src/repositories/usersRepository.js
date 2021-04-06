import Repository from "./Repository";

const resource = "/users";
export default {
  createUser(payload) {
    return Repository.post(`${resource}`, payload);
  },

  updateUser(id, payload) {
    return Repository.put(`${resource}/${id}`, payload);
  },
  
  deleteUser(id) {
    return Repository.delete(`${resource}/${id}`);
  },
  
};
