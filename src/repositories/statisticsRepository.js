import Repository from "./Repository";

const resource = "/statistics";
export default {
  getDayGraph(payload) {
    return Repository.post(`${resource}/day`, payload);
  },

  getBackDayGraph(payload) {
    return Repository.post(`${resource}/day/back`, payload);
  },

  getForwardDayGraph(payload) {
    return Repository.post(`${resource}/day/forward`, payload);
  },

  getWeekGraph(payload) {
    return Repository.post(`${resource}/week`, payload);
  },

  getBackWeekGraph(payload) {
    return Repository.post(`${resource}/week/back`, payload);
  },

  getForwardWeekGraph(payload) {
    return Repository.post(`${resource}/week/forward`, payload);
  },

  getMonthGraph(payload) {
    return Repository.post(`${resource}/month`, payload);
  },

  getBackMonthGraph(payload) {
    return Repository.post(`${resource}/month/back`, payload);
  },

  getForwardMonthGraph(payload) {
    return Repository.post(`${resource}/month/forward`, payload);
  },

  getDayCount(payload) {
    return Repository.post(`${resource}/count/day`, payload);
  },

  getAllCount(payload) {
    return Repository.post(`${resource}/count/all`, payload);
  },

  getMonthCount(payload) {
    return Repository.post(`${resource}/count/month`, payload);
  },

  getDayAvg(payload) {
    return Repository.post(`${resource}/avarage/day`, payload);
  }

  
};
