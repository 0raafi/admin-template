import { request } from '@umijs/max';

export default async function token(body: API.TokenParams, options?: { [key: string]: any }) {
  body.client_id = CLIENT_ID;
  body.client_secret = CLIENT_SECRET;

  console.log('API_URL', API_URL);

  return request<API.TokenResult>(`${API_URL}/oauth2/connect/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
