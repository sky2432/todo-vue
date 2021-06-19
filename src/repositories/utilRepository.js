import Repository from "./Repository";

export default {
  loginConfirm(payload) {
    return Repository.post("/login/confirm", payload);
  },

  login(payload) {
    return Repository.post("/login", payload);
  },

  logout() {
    return Repository.post("/logout");
  },

  sendLoginMail(payload) {
    return Repository.post("/sendMail/login", payload);
  },

  sendRegisterMail(payload) {
    return Repository.post("/sendMail/register", payload);
  },
};
