// src/services/apiServices.ts
import axios from "axios";

// Axios instance with Authorization interceptor
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Authentication APIs
export const login = (credentials: { email: string; password: string }) =>
  API.post("/auth/login", credentials);

export const signup = (data: { 
  name: string;
  selection: string;
  location: string;
  email: string;
  password: string;
}) => API.post("/auth/signup", data);

// Team Management APIs
export const createTeam = (teamName: string) =>
  API.post("/teams", { teamName });

export const joinTeam = (teamId: string) =>
  API.post(`/teams/join/${teamId}`);

// MCQ APIs
export const fetchMCQs = () => 
  API.get("/mcqs");

export const submitMCQAnswers = (answers: any) =>
  API.post("/mcqs/submit", answers);

// Solution Submission API
export const submitSolution = (data: { submissionLink: string }) =>
  API.post("/submits", data);

// Location Check API
export const checkLocation = (location: string) =>
  API.post("/location-check", { location })
    .then((res) => res.data.result);

// Image Upload API (Aligned with Backend)
export const uploadImage = (image: File) => {
  const formData = new FormData();
  formData.append("file", image);

  return API.post("/images/upload", formData)
    .then((res) => res.data.percentage);
};

// History Data Retrieval API
export const fetchHistoryData = () =>
  API.get("/history")
    .then((res) => res.data.history);