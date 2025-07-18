import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/", // <-- Point to your NestJS backend port
  withCredentials: false, // or true if needed
});

export default instance;
