import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Platform } from "react-native";

const api = axios.create({
  baseURL: Platform.OS === "web"
    ? "http://localhost:8080"
    : "http://192.168.0.107:8080",
});


api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
