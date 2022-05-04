import http from "../http-common";
class TaskDataService {
  getAll() {
    return http.get("http://localhost:9090/api/task");
  }
  get(id) {
    return http.get(`http://localhost:9090/api/task${id}`);
  }
  create(data) {
    return http.post("http://localhost:9090/api/task", data);
  }
  update(id, data) {
    return http.put(`http://localhost:9090/api/task${id}`, data);
  }
  delete(id) {
    return http.delete(`http://localhost:9090/api/task${id}`);
  }

}
export default new TaskDataService();