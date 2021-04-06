import Repository from "./Repository";

export default {
  loginValidate(payload) {
    return Repository.post("/validateLogin", payload);
  },

  formValidate(payload) {
    return Repository.post("/validateRegister", payload);
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
};