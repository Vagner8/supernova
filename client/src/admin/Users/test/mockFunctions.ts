export function mockFetch(data: unknown) {
  global.fetch = jest.fn(() => {
    return Promise.resolve({
      json: () => Promise.resolve(data),
    });
  }) as jest.Mock;
}
