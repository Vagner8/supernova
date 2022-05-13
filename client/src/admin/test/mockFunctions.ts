export function mockFetch(data: any) {
  window.fetch = jest.fn(() => {
    return Promise.resolve({
      json: () => Promise.resolve(data),
    });
  }) as jest.Mock;
}
