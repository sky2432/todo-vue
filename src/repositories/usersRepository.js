import Repository from "./Repository";

const resource = "/users";
export default {
  getUser() {
    return Repository.get(`${resource}`);
  },

  showUser(id) {
    return Repository.get(`${resource}/${id}`);
  },

  createUser(payload) {
    return Repository.post(`${resource}`, payload);
  },

  updateUser(id, payload) {
    return Repository.put(`${resource}/${id}`, payload);
  },

  deleteUser(payload) {
    return Repository.post(`${resource}/delete`, payload);
  },

  updatePassword(payload) {
    return Repository.post(`${resource}/update/password`, payload);
  },

  registerConfirm(payload) {
    return Repository.post(`${resource}/confirm`, payload);
  },

};
