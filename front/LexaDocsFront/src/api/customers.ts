import { axiosInstance } from "./apiBase";

export async function loginCustomer(formData: FormData) {
  const r = await axiosInstance.post("authentication/customers", formData);
  return r.data;
}
