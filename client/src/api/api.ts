import { Method } from './apiType';

export async function fetchData<T>(
  method: Method,
  url: string,
  body?: any,
): Promise<{ error: boolean; message: string, field: string } | T | undefined> {
  console.log('fetchData');
  
  try {
    const response = await fetch(url, {
      method,
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json',
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
