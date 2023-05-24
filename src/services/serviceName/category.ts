import { request } from '@umijs/max';
import normalizeTableParams from '@/helpers/normalizeTableParams';

export async function addCategory(body: API.CategoryParams, options?: { [key: string]: any }) {
  return request<API.CategoryItem>(`${API_URL}/admin/category/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function updateCategory(body: API.CategoryParams, options?: { [key: string]: any }) {
  return request<API.CategoryItem>(`${API_URL}/admin/category/${body._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });

}
export async function deleteCategory(body: API.CategoryParams, options?: { [key: string]: any }) {
  return request<API.CategoryItem>(`${API_URL}/admin/category/${body._id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


export async function category(
  params: {
    pageSize?: number;
    current?: number;
    keyword?: string;
  },
  options?: { [key: string]: any },
) {
  const tableParams = normalizeTableParams(params);

  return request<API.CategoryList>(`${API_URL}/admin/category/list`, {
    method: 'GET',
    params: tableParams,
    ...(options || {}),
  });
}
