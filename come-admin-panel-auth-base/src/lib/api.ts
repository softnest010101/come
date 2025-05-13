// 📁 src/lib/api.ts
import axios from "axios";
import { useAuthStore } from "./useAuthStore";

// ✅ Axios setup with auth token
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

//
// 🔁 Duplicate Functions (per module)
//

export async function duplicateProject(id: number) {
  const res = await api.post(`/projects/${id}/duplicate`);
  return res.data;
}

export async function duplicatePage(id: number) {
  const res = await api.post(`/pages/${id}/duplicate`);
  return res.data;
}

export async function duplicateComponent(id: number) {
  const res = await api.post(`/components/${id}/duplicate`);
  return res.data;
}

export async function duplicateWidget(id: number) {
  const res = await api.post(`/widgets/${id}/duplicate`);
  return res.data;
}

export async function duplicateTemplate(id: number) {
  const res = await api.post(`/templates/${id}/duplicate`);
  return res.data;
}

export async function duplicateWidgetInstance(id: number) {
  const res = await api.post(`/widget-instances/${id}/duplicate`);
  return res.data;
}

export async function duplicateComponentInstance(id: number) {
  const res = await api.post(`/component-instances/${id}/duplicate`);
  return res.data;
}

//
// 🔗 Universal Link Functions
//

export async function linkModelToModel(
  sourceModel: string,
  sourceId: number,
  targetModel: string,
  targetId: number
) {
  const res = await api.post(
    `/${sourceModel}s/${sourceId}/link/${targetModel}/${targetId}`
  );
  return res.data;
}

export async function bulkLinkToModel(
  sourceModel: string,
  sourceId: number,
  targetModel: string,
  targetIds: number[]
) {
  const res = await api.post(`/${sourceModel}s/${sourceId}/bulk-link`, {
    targetModel,
    targetIds,
  });
  return res.data;
}

//
// ✅ Component Module API
//

export interface CreateComponentInput {
  name: string;
  description?: string;
  pageId?: number;
  config?: object;
  notes?: string;
  tags?: string[];
  visible?: boolean;
}

export async function createComponent(data: CreateComponentInput) {
  const res = await api.post("/components", data);
  return res.data;
}

export async function getMyComponents() {
  const res = await api.get("/components/my");
  return res.data;
}

export async function getComponentById(id: number) {
  const res = await api.get(`/components/${id}`);
  return res.data;
}

export async function updateComponent(
  id: number,
  data: Partial<CreateComponentInput>
) {
  const res = await api.patch(`/components/${id}`, data);
  return res.data;
}

export async function deleteComponent(id: number) {
  const res = await api.delete(`/components/${id}`);
  return res.data;
}

//
// ✅ Widget Module API
//

export interface CreateWidgetInput {
  name: string;
  description?: string;
  pageId?: number;
  config?: object;
  notes?: string;
  tags?: string[];
  visible?: boolean;
}

export async function createWidget(data: CreateWidgetInput) {
  const res = await api.post("/widgets", data);
  return res.data;
}

export async function getMyWidgets() {
  const res = await api.get("/widgets/my");
  return res.data;
}

export async function getWidgetById(id: number) {
  const res = await api.get(`/widgets/${id}`);
  return res.data;
}

export async function updateWidget(
  id: number,
  data: Partial<CreateWidgetInput>
) {
  const res = await api.patch(`/widgets/${id}`, data);
  return res.data;
}

export async function deleteWidget(id: number) {
  const res = await api.delete(`/widgets/${id}`);
  return res.data;
}

//
// ✅ ComponentInstance Module API
//

export interface CreateComponentInstanceInput {
  name: string;
  description?: string;
  config?: object;
  notes?: string;
  tags?: string[];
  visible?: boolean;
  pageId?: number;
  componentId?: number;
}

export async function createComponentInstance(data: CreateComponentInstanceInput) {
  const res = await api.post("/component-instances", data);
  return res.data;
}

export async function getMyComponentInstances() {
  const res = await api.get("/component-instances/my");
  return res.data;
}

export async function getComponentInstanceById(id: number) {
  const res = await api.get(`/component-instances/${id}`);
  return res.data;
}

export async function updateComponentInstance(
  id: number,
  data: Partial<CreateComponentInstanceInput>
) {
  const res = await api.patch(`/component-instances/${id}`, data);
  return res.data;
}

export async function deleteComponentInstance(id: number) {
  const res = await api.delete(`/component-instances/${id}`);
  return res.data;
}

//
// ✅ WidgetInstance Module API
//

export interface CreateWidgetInstanceInput {
  name: string;
  description?: string;
  config?: object;
  notes?: string;
  tags?: string[];
  visible?: boolean;
  pageId?: number;
  widgetId?: number;
}

export async function createWidgetInstance(data: CreateWidgetInstanceInput) {
  const res = await api.post("/widget-instances", data);
  return res.data;
}

export async function getMyWidgetInstances() {
  const res = await api.get("/widget-instances/my");
  return res.data;
}

export async function getWidgetInstanceById(id: number) {
  const res = await api.get(`/widget-instances/${id}`);
  return res.data;
}

export async function updateWidgetInstance(
  id: number,
  data: Partial<CreateWidgetInstanceInput>
) {
  const res = await api.patch(`/widget-instances/${id}`, data);
  return res.data;
}

export async function deleteWidgetInstance(id: number) {
  const res = await api.delete(`/widget-instances/${id}`);
  return res.data;
}
