import Repository from "./Repository";

const resource = "/files";
export default {
  getImage(id) {
    return Repository.get(`${resource}/${id}`);
  },
  
  uploadImage(id, payload) {
    return Repository.post(`${resource}/${id}`, payload, {
      headers: {
        "X-HTTP-Method-Override": "PUT",
      },
    });
  },
};
