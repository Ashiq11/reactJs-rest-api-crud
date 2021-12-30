import axios from "axios";

export default axios.create({
//   baseURL: "http://localhost:8080/api",
  baseURL : "https://www.bistrainer.com/v1/index.cfm?action=testapi.users",
  headers: {
    "Content-type": "application/json"
  }
});