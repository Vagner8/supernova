import { Method } from './apiType';

export async function fetchRequest<T>(method: Method, url: string, body: T) {
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  console.log(await res.json());
}
