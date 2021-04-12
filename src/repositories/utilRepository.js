import Repository from "./Repository";

export default {
  loginConfirm(payload) {
    return Repository.post("/loginConfirm", payload);
  },

  registerConfirm(payload) {
    return Repository.post("/userRegisterConfirm", payload);
  },

  login(payload) {
    return Repository.post("/login", payload);
  },

  logout() {
    return Repository.post("/logout");
  },

  sendLoginMail(payload) {
    return Repository.post("/sendLoginMail", payload);
  },

  sendRegisterMail(payload) {
    return Repository.post("/sendRegisterMail", payload);
  },

  sendPasswordResetMail(payload) {
    return Repository.post("/forgot-password", payload);
  }
};
