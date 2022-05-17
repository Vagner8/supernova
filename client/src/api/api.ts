import { Method } from './apiType';

interface Error {
  errorMessage: string | null;
  errorField: string | null
}

export async function postData<ReturnData>(
  method: Method,
  url: string,
  body?: any,
): Promise<
  | Error
  | ReturnData
  | undefined
> {
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
