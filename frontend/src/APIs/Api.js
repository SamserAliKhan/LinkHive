import instance from "./AxiosConfig";

// --- Auth APIs ---
export const signup = (data) => instance.post("/auth/signup", data);
export const login = (data) => instance.post("/auth/login", data);
export const logout = () => instance.post("/auth/logout");

// --- User APIs ---
export const getProfile = () => instance.get("/user/me");

// --- Post APIs ---
export const addLink = (data) => instance.post("/link/addLink", data);
export const getAllLinks = () => instance.get("/link");
export const getLinkById = (id) => instance.get(`/link/${id}`);
export const updateLink = (id, data) => instance.put(`/link/update/${id}`, data);
export const deleteLink = (id) => instance.delete(`/link/delete/${id}`);
